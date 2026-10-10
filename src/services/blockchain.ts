import { BlockEvent } from '../types';

/**
 * Native Web Crypto SHA-256 utility.
 * Returns a 64-character lowercase hex string.
 */
export async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Calculates deterministic block hash from event properties.
 */
export async function calculateBlockHash(block: Omit<BlockEvent, 'blockHash'>): Promise<string> {
  const content = JSON.stringify({
    index: block.index,
    previousHash: block.previousHash,
    eventType: block.eventType,
    timestamp: block.timestamp,
    actor: block.actor,
    location: block.location,
    batchId: block.batchId,
    payload: block.payload,
  });
  return await sha256(content);
}

/**
 * Verifies full chain integrity by re-computing every SHA-256 block hash
 * and validating that previousHash matches the prior block's hash.
 */
export async function verifyChainIntegrity(blocks: BlockEvent[]): Promise<{
  isValid: boolean;
  totalBlocks: number;
  validBlocks: number;
  compromisedBlockIndex: number | null;
  expectedHash?: string;
  receivedHash?: string;
  errorDetail?: string;
}> {
  if (!blocks || blocks.length === 0) {
    return { isValid: true, totalBlocks: 0, validBlocks: 0, compromisedBlockIndex: null };
  }

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Check genesis block previous hash
    if (i === 0) {
      if (block.previousHash !== '0000000000000000000000000000000000000000000000000000000000000000') {
        return {
          isValid: false,
          totalBlocks: blocks.length,
          validBlocks: 0,
          compromisedBlockIndex: 0,
          errorDetail: 'Genesis block must have 64-bit zero previous hash'
        };
      }
    } else {
      const prevBlock = blocks[i - 1];
      if (block.previousHash !== prevBlock.blockHash) {
        return {
          isValid: false,
          totalBlocks: blocks.length,
          validBlocks: i,
          compromisedBlockIndex: i,
          expectedHash: prevBlock.blockHash,
          receivedHash: block.previousHash,
          errorDetail: `Broken Link: Block #${i + 1} previousHash does not match Block #${i} current hash`
        };
      }
    }

    // Recompute actual SHA-256
    const expectedCurrentHash = await calculateBlockHash({
      index: block.index,
      previousHash: block.previousHash,
      eventType: block.eventType,
      title: block.title,
      timestamp: block.timestamp,
      actor: block.actor,
      actorRole: block.actorRole,
      location: block.location,
      gpsCoords: block.gpsCoords,
      batchId: block.batchId,
      payload: block.payload,
      signature: block.signature,
      verified: true
    });

    if (expectedCurrentHash !== block.blockHash) {
      return {
        isValid: false,
        totalBlocks: blocks.length,
        validBlocks: i,
        compromisedBlockIndex: i,
        expectedHash: expectedCurrentHash,
        receivedHash: block.blockHash,
        errorDetail: `Tampered Content: Block #${i + 1} (${block.title}) contents altered! Payload hash mismatch.`
      };
    }
  }

  return {
    isValid: true,
    totalBlocks: blocks.length,
    validBlocks: blocks.length,
    compromisedBlockIndex: null
  };
}

/**
 * Creates the initial authentic 7-block lifecycle ledger for batch HNY-TG-2026-0001
 */
export async function generateInitialLedger(batchId: string = 'HNY-TG-2026-0001'): Promise<BlockEvent[]> {
  const rawEvents = [
    {
      index: 1,
      eventType: 'HARVEST' as const,
      title: 'Comb Extraction & Hive Harvest',
      timestamp: '2026-09-10T07:45:00Z',
      actor: 'Ravi Kumar',
      actorRole: 'Certified Beekeeper (KVIC #TG-8821)',
      location: 'Warangal Apiary #4, Telangana',
      gpsCoords: '17.9689° N, 79.5941° E',
      batchId,
      payload: {
        hiveId: 'HIVE-TG-017',
        quantityHarvestedKg: 42.5,
        floralDominance: 'Multiflora & Wild Neem',
        extractionMethod: 'Centrifugal cold centrifuge (No Heat)',
        supersInspected: 4,
        moistureAtHarvest: '17.8%'
      },
      signature: 'SIG_ED25519_BEEKEEPER_9f82a1c0'
    },
    {
      index: 2,
      eventType: 'LAB_TEST' as const,
      title: 'Comprehensive Honey Fingerprint & Lab Screening',
      timestamp: '2026-09-11T11:20:00Z',
      actor: 'Dr. Sunita Rao',
      actorRole: 'Lead Chemist, NABL Accredited Honey Testing Lab #14',
      location: 'Hyderabad Quality Center, Telangana',
      gpsCoords: '17.3850° N, 78.4867° E',
      batchId,
      payload: {
        testId: 'LAB-QC-9941',
        moisturePercent: 17.2,
        hmfMgKg: 14.2,
        fructoseGlucoseRatio: 1.22,
        sucrosePercent: 1.8,
        pollenCountPerGram: 38500,
        electricalConductivity: '0.38 mS/cm',
        c4SugarAdulteration: 'Negative (< 1%)',
        decision: 'PASS'
      },
      signature: 'SIG_ED25519_NABL_LAB_77b3d4f1'
    },
    {
      index: 3,
      eventType: 'PROCESSING' as const,
      title: 'Micro-Filtration & Cold Settling',
      timestamp: '2026-09-12T14:15:00Z',
      actor: 'Telangana Honey FPO Cooperative',
      actorRole: 'FPO Processing Facility Manager',
      location: 'Hanamkonda Agri-Park, Telangana',
      gpsCoords: '18.0131° N, 79.5448° E',
      batchId,
      payload: {
        lotProcessingId: 'LOT-PROC-049',
        filterMeshSize: '80 Micron (Pollen Retaining)',
        maxProcessingTemp: '37.5°C (Raw Unpasteurized)',
        netYieldKg: 41.8,
        settlingDurationHours: 48
      },
      signature: 'SIG_ED25519_FPO_PROC_33a1e902'
    },
    {
      index: 4,
      eventType: 'QUALITY_APPROVAL' as const,
      title: 'KVIC Honey Mission Compliance Seal',
      timestamp: '2026-09-13T10:00:00Z',
      actor: 'K. Venkatesh',
      actorRole: 'KVIC Regional Nodal Officer',
      location: 'KVIC State Office, Hyderabad',
      gpsCoords: '17.4065° N, 78.4772° E',
      batchId,
      payload: {
        kvicBatchApprovalId: 'KVIC-HM-2026-TG-084',
        traceabilityConfidenceScore: '98.5%',
        fairPriceBeekeeperSettled: true,
        clusterSubsidizedBoxesVerified: 10
      },
      signature: 'SIG_ED25519_KVIC_INSPECT_e49120ba'
    },
    {
      index: 5,
      eventType: 'PACKAGING' as const,
      title: 'Automated Bottling & Tamper-Evident QR Assignment',
      timestamp: '2026-09-14T09:30:00Z',
      actor: 'GreenValley Eco Packagers',
      actorRole: 'Automated Packaging Unit #2',
      location: 'Cherlapally Industrial Area, Hyderabad',
      gpsCoords: '17.4641° N, 78.5992° E',
      batchId,
      payload: {
        packagingLots: ['PKG-TG-001 (100 jars x 250g)', 'PKG-TG-002 (30 jars x 500g)'],
        totalUnitsBottled: 130,
        sealType: 'Induction Cap Seal + Holographic NFC/QR Band',
        qrUniqueRange: 'HNY-TG-2026-0001-J001 to J130'
      },
      signature: 'SIG_ED25519_PACKAGING_58f62c31'
    },
    {
      index: 6,
      eventType: 'DISPATCH' as const,
      title: 'Cold-Chain Telemetry & Secure Logistics Dispatch',
      timestamp: '2026-09-15T08:15:00Z',
      actor: 'AgriLogix Express Fleet #12',
      actorRole: 'Cold Chain Logistics Courier',
      location: 'Hyderabad to Retail Hub Depot',
      gpsCoords: '17.4401° N, 78.3489° E',
      batchId,
      payload: {
        consignmentId: 'DISP-TG-88192',
        transitTempAvg: '24.1°C',
        transitVibrationThreshold: 'NORMAL',
        destinationHub: 'KVIC Gramodyog Bhavan, Banjara Hills'
      },
      signature: 'SIG_ED25519_LOGIX_11ab34fe'
    },
    {
      index: 7,
      eventType: 'RETAIL' as const,
      title: 'Store Shelf Placement & Consumer Scan Activation',
      timestamp: '2026-09-16T12:00:00Z',
      actor: 'KVIC Organic Store Banjara Hills',
      actorRole: 'Authorized Retail Partner',
      location: 'Road No. 12, Banjara Hills, Hyderabad',
      gpsCoords: '17.4156° N, 78.4350° E',
      batchId,
      payload: {
        retailShelfId: 'SHELF-ORGANIC-HONEY-03',
        mrpRupees: 420,
        beekeeperDirectShareRupees: 260,
        qrActiveStatus: 'LIVE_ACTIVE'
      },
      signature: 'SIG_ED25519_RETAIL_99cde110'
    }
  ];

  const blocks: BlockEvent[] = [];
  let previousHash = '0000000000000000000000000000000000000000000000000000000000000000';

  for (const item of rawEvents) {
    const blockContent = {
      index: item.index,
      previousHash,
      eventType: item.eventType,
      title: item.title,
      timestamp: item.timestamp,
      actor: item.actor,
      actorRole: item.actorRole,
      location: item.location,
      gpsCoords: item.gpsCoords,
      batchId: item.batchId,
      payload: item.payload,
      signature: item.signature,
      verified: true
    };
    const blockHash = await calculateBlockHash(blockContent);
    blocks.push({
      ...blockContent,
      blockHash
    });
    previousHash = blockHash;
  }

  return blocks;
}
