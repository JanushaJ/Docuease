import { Hive, Batch, ClusterData, Beekeeper, EarlyWarningAlert, LabQualityData } from '../types';

export const CLUSTERS: ClusterData[] = [
  {
    id: 'CLUST-WARANGAL',
    name: 'Warangal Rural Cluster',
    state: 'Telangana',
    coords: [17.9689, 79.5941],
    beekeeperCount: 84,
    hiveCount: 420,
    monthlyProductionKg: 3840,
    healthIndex: 92,
    status: 'Healthy',
    activeAlerts: 2,
    averageYieldKg: 21.4,
    verifiedBatches: 38,
    description: 'High biodiversity zone with dense neem, eucalyptus, and wild mustard foraging corridors.'
  },
  {
    id: 'CLUST-NIZAMABAD',
    name: 'Nizamabad Forest Border Cluster',
    state: 'Telangana',
    coords: [18.6725, 78.0944],
    beekeeperCount: 65,
    hiveCount: 310,
    monthlyProductionKg: 2750,
    healthIndex: 88,
    status: 'Healthy',
    activeAlerts: 1,
    averageYieldKg: 19.8,
    verifiedBatches: 29,
    description: 'Specialized in single-origin Jamun and seasonal turmeric flower nectar production.'
  },
  {
    id: 'CLUST-KARIMNAGAR',
    name: 'Karimnagar Agri-Corridor',
    state: 'Telangana',
    coords: [18.4386, 79.1288],
    beekeeperCount: 52,
    hiveCount: 260,
    monthlyProductionKg: 2100,
    healthIndex: 78,
    status: 'Moderate Risk',
    activeAlerts: 4,
    averageYieldKg: 17.2,
    verifiedBatches: 21,
    description: 'Agro-forestry corridor facing slight seasonal floral dearth; proactive feeding initiated.'
  },
  {
    id: 'CLUST-KHAMMAM',
    name: 'Khammam Eastern Ghats Apiaries',
    state: 'Telangana',
    coords: [17.2473, 80.1514],
    beekeeperCount: 71,
    hiveCount: 380,
    monthlyProductionKg: 3420,
    healthIndex: 94,
    status: 'Healthy',
    activeAlerts: 0,
    averageYieldKg: 22.8,
    verifiedBatches: 34,
    description: 'Pristine forest apiaries producing raw unheated medicinal honey with high antioxidant ratings.'
  },
  {
    id: 'CLUST-ADILABAD',
    name: 'Adilabad Tribal Honey Co-Op',
    state: 'Telangana',
    coords: [19.6641, 78.5320],
    beekeeperCount: 96,
    hiveCount: 480,
    monthlyProductionKg: 4200,
    healthIndex: 72,
    status: 'Moderate Risk',
    activeAlerts: 5,
    averageYieldKg: 16.9,
    verifiedBatches: 41,
    description: 'Large indigenous tribal cluster under KVIC Honey Mission with high organic certification rate.'
  },
  {
    id: 'CLUST-HYDERABAD',
    name: 'Hyderabad Peri-Urban & Research Hub',
    state: 'Telangana',
    coords: [17.3850, 78.4867],
    beekeeperCount: 38,
    hiveCount: 190,
    monthlyProductionKg: 1650,
    healthIndex: 85,
    status: 'Healthy',
    activeAlerts: 1,
    averageYieldKg: 18.2,
    verifiedBatches: 18,
    description: 'Academic and breeding test apiaries with IoT sensor telemetry research units.'
  }
];

export const INITIAL_BEEKEEPERS: Beekeeper[] = [
  {
    id: 'BK-TG-001',
    name: 'Ravi Kumar',
    village: 'Dharmasagar, Warangal',
    cluster: 'Warangal Rural Cluster',
    boxesCount: 25,
    kvicEnrollmentId: 'KVIC-HM-TG-8821',
    phone: '+91 98480 23145',
    joinedDate: '2023-04-12',
    totalHarvestKg: 840,
    totalEarningsRupees: 218400,
    rating: 4.9
  },
  {
    id: 'BK-TG-002',
    name: 'Lakshmi Devi',
    village: 'Armoor, Nizamabad',
    cluster: 'Nizamabad Forest Border Cluster',
    boxesCount: 20,
    kvicEnrollmentId: 'KVIC-HM-TG-8822',
    phone: '+91 98481 99281',
    joinedDate: '2023-06-20',
    totalHarvestKg: 620,
    totalEarningsRupees: 167400,
    rating: 4.8
  },
  {
    id: 'BK-TG-003',
    name: 'S. Mallesh Goud',
    village: 'Choppadandi, Karimnagar',
    cluster: 'Karimnagar Agri-Corridor',
    boxesCount: 30,
    kvicEnrollmentId: 'KVIC-HM-TG-8823',
    phone: '+91 94401 77312',
    joinedDate: '2022-11-15',
    totalHarvestKg: 1040,
    totalEarningsRupees: 270400,
    rating: 4.7
  },
  {
    id: 'BK-TG-004',
    name: 'Anjaiah G.',
    village: 'Kothagudem, Khammam',
    cluster: 'Khammam Eastern Ghats Apiaries',
    boxesCount: 35,
    kvicEnrollmentId: 'KVIC-HM-TG-8824',
    phone: '+91 97002 44901',
    joinedDate: '2022-08-01',
    totalHarvestKg: 1280,
    totalEarningsRupees: 345600,
    rating: 5.0
  },
  {
    id: 'BK-TG-005',
    name: 'Babu Rao Meshram',
    village: 'Utnoor, Adilabad',
    cluster: 'Adilabad Tribal Honey Co-Op',
    boxesCount: 40,
    kvicEnrollmentId: 'KVIC-HM-TG-8825',
    phone: '+91 93901 88402',
    joinedDate: '2021-10-10',
    totalHarvestKg: 1560,
    totalEarningsRupees: 405600,
    rating: 4.6
  },
  {
    id: 'BK-TG-006',
    name: 'K. Padma Reddy',
    village: 'Shamshabad, Hyderabad',
    cluster: 'Hyderabad Peri-Urban & Research Hub',
    boxesCount: 15,
    kvicEnrollmentId: 'KVIC-HM-TG-8826',
    phone: '+91 98490 11200',
    joinedDate: '2024-01-14',
    totalHarvestKg: 390,
    totalEarningsRupees: 105300,
    rating: 4.9
  }
];

// Helper to generate 50 hives across clusters and beekeepers
export function generateSeedHives(): Hive[] {
  const floraTypes = ['Multiflora Wildflower', 'Eucalyptus Blossom', 'Yellow Mustard', 'Wild Jamun', 'Forest Acacia'];
  const hives: Hive[] = [];

  for (let i = 1; i <= 52; i++) {
    const code = `HIVE-TG-${i.toString().padStart(3, '0')}`;
    const bkIndex = (i - 1) % INITIAL_BEEKEEPERS.length;
    const bk = INITIAL_BEEKEEPERS[bkIndex];
    const cluster = CLUSTERS[(i - 1) % CLUSTERS.length];
    const flora = floraTypes[(i - 1) % floraTypes.length];

    // Seed special values for HIVE-TG-017 as the hero demo hive
    const isHero = i === 17;
    const temp = isHero ? 34.2 : +(33.0 + (Math.sin(i) * 2.5)).toFixed(1);
    const hum = isHero ? 61.0 : +(58.0 + (Math.cos(i) * 8.0)).toFixed(1);
    const weight = isHero ? 42.7 : +(35.0 + ((i * 1.3) % 15)).toFixed(1);
    const health = isHero ? 86 : Math.max(68, Math.min(98, Math.round(82 + Math.sin(i * 1.7) * 14)));
    const risk = health > 80 ? 'Low' : health > 70 ? 'Moderate' : 'High';

    hives.push({
      id: `hive-${i}`,
      code,
      beekeeperId: bk.id,
      beekeeperName: bk.name,
      apiaryId: `APIARY-TG-${bkIndex + 1}`,
      apiaryName: `${cluster.name} - Site #${((i % 4) + 1)}`,
      cluster: cluster.name,
      state: 'Telangana',
      flora,
      healthScore: health,
      diseaseRisk: risk,
      activityStatus: isHero ? 'Normal' : health < 75 ? 'Stress Detected' : 'Normal',
      expectedYieldKg: +(16.0 + ((i * 2.1) % 10)).toFixed(1),
      currentWeightKg: weight,
      sensors: {
        temperature: temp,
        humidity: hum,
        weight,
        vibration: +(15 + (Math.sin(i) * 5)).toFixed(1),
        acousticIndex: isHero ? 72 : Math.round(65 + Math.cos(i) * 15),
        acousticFreqHz: isHero ? 220 : Math.round(210 + Math.sin(i) * 40),
        airQualityIndex: 410,
        timestamp: new Date().toISOString()
      },
      sensorHistory: [
        { time: '06:00', temp: temp - 1.5, hum: hum + 5, weight: weight - 0.4, acoustic: 55 },
        { time: '08:00', temp: temp - 0.8, hum: hum + 2, weight: weight - 0.2, acoustic: 64 },
        { time: '10:00', temp: temp, hum: hum, weight: weight, acoustic: isHero ? 72 : 68 },
        { time: '12:00', temp: temp + 1.2, hum: hum - 4, weight: weight + 0.3, acoustic: 75 },
        { time: '14:00', temp: temp + 0.9, hum: hum - 2, weight: weight + 0.5, acoustic: 71 }
      ],
      lastInspected: '2026-09-15'
    });
  }

  return hives;
}

export const INITIAL_ALERTS: EarlyWarningAlert[] = [
  {
    id: 'ALT-101',
    hiveId: 'hive-17',
    hiveCode: 'HIVE-TG-017',
    cluster: 'Warangal Rural Cluster',
    severity: 'Warning',
    title: 'Acoustic Frequency Elevation & Pre-Swarm Stress Signal',
    why: 'Internal sound frequency elevated to 420 Hz with sudden activity spike and 0.4kg weight plateau.',
    when: '14 minutes ago',
    recommendedAction: 'Inspect brood chamber for queen cups; consider providing extra super or swarm division.',
    status: 'Open'
  },
  {
    id: 'ALT-102',
    hiveId: 'hive-23',
    hiveCode: 'HIVE-TG-023',
    cluster: 'Karimnagar Agri-Corridor',
    severity: 'Warning',
    title: 'Abnormal High Humidity Inside Brood Chamber (76%)',
    why: 'Moisture level sustained above 75% for 8 consecutive hours during rainstorm.',
    when: '2 hours ago',
    recommendedAction: 'Verify bottom board mesh ventilation and tilt hive forward to prevent condensation stagnation.',
    status: 'Acknowledged',
    assignedTo: 'Field Officer Ramesh K.'
  },
  {
    id: 'ALT-103',
    hiveId: 'hive-31',
    hiveCode: 'HIVE-TG-031',
    cluster: 'Adilabad Tribal Honey Co-Op',
    severity: 'Critical',
    title: 'Sharp Weight Decline & Robbing Pattern Detected',
    why: 'Hive weight dropped 1.8 kg in 3 hours with erratic entrance vibration frequencies.',
    when: '3 hours ago',
    recommendedAction: 'Reduce hive entrance width immediately to allow guard bees to repel robber colonies.',
    status: 'Assigned',
    assignedTo: 'Nodal Officer Venkat P.'
  }
];

export const DEMO_LAB_DATA: LabQualityData = {
  testId: 'LAB-QC-9941',
  certificateId: 'CERT-HNY-2026-NABL-0182',
  labName: 'Regional Honey Analysis & Quality Assurance Center (NABL Accredited #TC-7182)',
  technicianName: 'Dr. Sunita Rao, M.Sc. Food Chemistry',
  timestamp: '2026-09-11T11:20:00Z',
  moisturePercent: 17.2,
  hmfMgKg: 14.2,
  fructoseGlucoseRatio: 1.22,
  sucrosePercent: 1.8,
  pollenCountPerGram: 38500,
  electricalConductivity: 0.38,
  pollenTypes: [
    { flora: 'Azadirachta indica (Neem)', percent: 42 },
    { flora: 'Eucalyptus tereticornis', percent: 28 },
    { flora: 'Brassica campestris (Mustard)', percent: 18 },
    { flora: 'Other wild secondary pollen', percent: 12 }
  ],
  decision: 'PASS',
  decisionNotes: 'Exceeds all FSSAI and BIS Grade A honey standards. Moisture safely below 20% limit. HMF low (14.2 mg/kg), confirming unheated, pristine raw honey.'
};
