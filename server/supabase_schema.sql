-- =========================================================================
-- Vaidyalens Drug & Laboratory Verification Database Schema
-- Production Migration for Supabase Postgres
-- =========================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;

-- 2. Normalized Medicines Table
CREATE TABLE IF NOT EXISTS medicines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_name TEXT NOT NULL,
    generic_name TEXT,
    strength TEXT,
    dosage_form TEXT,
    manufacturer TEXT,
    source TEXT NOT NULL,
    source_url TEXT,
    normalized_name TEXT NOT NULL,
    dmetaphone_code TEXT,
    dmetaphone_alt TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for Trigram Fuzzy Search (Brand Name & Generic Composition)
CREATE INDEX IF NOT EXISTS idx_medicines_normalized_name_trgm 
ON medicines USING gin (normalized_name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_medicines_generic_name_trgm 
ON medicines USING gin (generic_name gin_trgm_ops);

-- Indexing for Phonetic Matching
CREATE INDEX IF NOT EXISTS idx_medicines_dmetaphone 
ON medicines (dmetaphone_code);

CREATE INDEX IF NOT EXISTS idx_medicines_dmetaphone_alt 
ON medicines (dmetaphone_alt);

-- Indexing for Manufacturer & Source Lookups
CREATE INDEX IF NOT EXISTS idx_medicines_manufacturer 
ON medicines (manufacturer);

CREATE INDEX IF NOT EXISTS idx_medicines_source 
ON medicines (source);

-- 3. Separate Laboratory Tests Table (LOINC Standard)
CREATE TABLE IF NOT EXISTS lab_tests (
    loinc_num TEXT PRIMARY KEY,
    component TEXT NOT NULL,
    system TEXT,
    property TEXT,
    scale_type TEXT,
    class TEXT,
    long_common_name TEXT NOT NULL,
    short_name TEXT,
    reference_range TEXT,
    units TEXT,
    source TEXT DEFAULT 'LOINC (Regenstrief Institute)',
    source_url TEXT DEFAULT 'https://loinc.org',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for Lab Test Trigram Matching
CREATE INDEX IF NOT EXISTS idx_lab_tests_long_name_trgm 
ON lab_tests USING gin (long_common_name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_lab_tests_component_trgm 
ON lab_tests USING gin (component gin_trgm_ops);

-- 4. Multi-Source Deduplication Upsert Procedure
-- Merges duplicates across sources while retaining all contributing sources
CREATE OR REPLACE FUNCTION upsert_medicine_record(
    p_brand_name TEXT,
    p_generic_name TEXT,
    p_strength TEXT,
    p_dosage_form TEXT,
    p_manufacturer TEXT,
    p_source TEXT,
    p_source_url TEXT
) RETURNS VOID AS $$
DECLARE
    v_norm_name TEXT;
    v_dmeta TEXT;
    v_dmeta_alt TEXT;
    v_existing_id UUID;
    v_existing_source TEXT;
BEGIN
    v_norm_name := lower(trim(p_brand_name));
    v_dmeta := dmetaphone(v_norm_name);
    v_dmeta_alt := dmetaphone_alt(v_norm_name);

    -- Check if record exists for same normalized name, generic, and strength
    SELECT id, source INTO v_existing_id, v_existing_source
    FROM medicines
    WHERE normalized_name = v_norm_name
      AND COALESCE(generic_name, '') = COALESCE(p_generic_name, '')
      AND COALESCE(strength, '') = COALESCE(p_strength, '')
      AND COALESCE(dosage_form, '') = COALESCE(p_dosage_form, '')
    LIMIT 1;

    IF v_existing_id IS NOT NULL THEN
        -- Merge source if not already recorded
        IF position(p_source in v_existing_source) = 0 THEN
            UPDATE medicines
            SET source = v_existing_source || ' | ' || p_source,
                updated_at = NOW()
            WHERE id = v_existing_id;
        END IF;
    ELSE
        INSERT INTO medicines (
            brand_name, generic_name, strength, dosage_form, manufacturer,
            source, source_url, normalized_name, dmetaphone_code, dmetaphone_alt
        ) VALUES (
            p_brand_name, p_generic_name, p_strength, p_dosage_form, p_manufacturer,
            p_source, p_source_url, v_norm_name, v_dmeta, v_dmeta_alt
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 5. Verification Match Function (Top 3 Matches with Trigram, Levenshtein, and Phonetic Scoring)
CREATE OR REPLACE FUNCTION verify_medicine_candidate(
    p_candidate_name TEXT,
    p_candidate_strength TEXT DEFAULT NULL,
    p_threshold FLOAT DEFAULT 0.70
) RETURNS TABLE (
    brand_name TEXT,
    generic_name TEXT,
    strength TEXT,
    dosage_form TEXT,
    manufacturer TEXT,
    source TEXT,
    trigram_sim FLOAT,
    levenshtein_sim FLOAT,
    phonetic_match BOOLEAN,
    composite_score FLOAT,
    verdict TEXT
) AS $$
DECLARE
    v_norm_query TEXT := lower(trim(p_candidate_name));
    v_query_meta TEXT := dmetaphone(v_norm_query);
BEGIN
    RETURN QUERY
    WITH candidate_scores AS (
        SELECT 
            m.brand_name,
            m.generic_name,
            m.strength,
            m.dosage_form,
            m.manufacturer,
            m.source,
            similarity(m.normalized_name, v_norm_query)::FLOAT AS tri_sim,
            (1.0 - (levenshtein(m.normalized_name, v_norm_query)::FLOAT / GREATEST(length(m.normalized_name), length(v_norm_query), 1)))::FLOAT AS lev_sim,
            (m.dmetaphone_code = v_query_meta OR m.dmetaphone_alt = v_query_meta) AS phone_match
        FROM medicines m
        WHERE similarity(m.normalized_name, v_norm_query) > 0.3
           OR m.dmetaphone_code = v_query_meta
           OR m.dmetaphone_alt = v_query_meta
    ),
    scored_candidates AS (
        SELECT 
            c.*,
            (
                (0.40 * c.tri_sim) + 
                (0.35 * c.lev_sim) + 
                (0.25 * CASE WHEN c.phone_match THEN 1.0 ELSE 0.0 END)
            )::FLOAT AS comp_score
        FROM candidate_scores c
    )
    SELECT 
        s.brand_name,
        s.generic_name,
        s.strength,
        s.dosage_form,
        s.manufacturer,
        s.source,
        s.tri_sim,
        s.lev_sim,
        s.phone_match,
        s.comp_score,
        CASE 
            WHEN s.comp_score >= 0.85 THEN 'VERIFIED'
            WHEN s.comp_score >= 0.70 THEN 'LIKELY'
            ELSE 'UNCLEAR'
        END AS verdict
    FROM scored_candidates s
    WHERE s.comp_score >= p_threshold
    ORDER BY s.comp_score DESC
    LIMIT 3;
END;
$$ LANGUAGE plpgsql;
