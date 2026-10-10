export type Role = 'LANDING' | 'BEEKEEPER' | 'RURAL_BEEKEEPER' | 'LAB' | 'PROCESSOR' | 'BUYER' | 'KVIC_ADMIN' | 'CONSUMER' | 'ARCHITECTURE';

export type Language = 'en' | 'te' | 'hi';

export interface HiveSensorData {
  temperature: number; // in Celsius e.g. 34.2
  humidity: number; // in % e.g. 61
  weight: number; // in kg e.g. 42.7
  vibration: number; // in Hz e.g. 18.5
  acousticIndex: number; // 0-100 e.g. 72
  acousticFreqHz: number; // dominant frequency e.g. 220Hz (calm) vs 450Hz (swarming)
  airQualityIndex: number; // ppm e.g. 410
  timestamp: string;
}

export interface Hive {
  id: string;
  code: string; // e.g. 'HIVE-TG-017'
  beekeeperId: string;
  beekeeperName: string;
  apiaryId: string;
  apiaryName: string;
  cluster: string; // e.g. 'Warangal'
  state: string; // 'Telangana'
  flora: string; // 'Multiflora' | 'Eucalyptus' | 'Mustard' | 'Jamun'
  healthScore: number; // 0-100
  diseaseRisk: 'Low' | 'Moderate' | 'High';
  activityStatus: 'Normal' | 'Swarm Preparation' | 'Stress Detected' | 'High Foraging';
  expectedYieldKg: number;
  currentWeightKg: number;
  sensors: HiveSensorData;
  sensorHistory: { time: string; temp: number; hum: number; weight: number; acoustic: number }[];
  lastInspected: string;
}

export interface AIHealthFactor {
  name: string;
  impact: number; // e.g. +18, -6
  status: 'positive' | 'warning' | 'critical';
  detail: string;
}

export interface AIDiseasePrediction {
  id: string;
  issue: string; // 'Varroa Mite / Pest Infestation' | 'Wax Moth Larvae' | 'Chalkbrood Fungal Stress' | 'Healthy Comb'
  confidence: number; // e.g. 78%
  evidence: string[];
  recommendedAction: string;
  assignedOfficer?: string;
  status: 'Pending' | 'Officer Assigned' | 'Resolved';
  timestamp: string;
  imageUrl?: string;
}

export interface EarlyWarningAlert {
  id: string;
  hiveId: string;
  hiveCode: string;
  cluster: string;
  severity: 'Critical' | 'Warning' | 'Notice';
  title: string;
  why: string;
  when: string;
  recommendedAction: string;
  status: 'Open' | 'Acknowledged' | 'Assigned' | 'Resolved';
  assignedTo?: string;
}

export interface BlockEvent {
  index: number;
  blockHash: string;
  previousHash: string;
  eventType: 'HARVEST' | 'LAB_TEST' | 'PROCESSING' | 'QUALITY_APPROVAL' | 'PACKAGING' | 'DISPATCH' | 'RETAIL';
  title: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  location: string;
  gpsCoords: string;
  batchId: string;
  payload: Record<string, any>;
  signature: string;
  verified: boolean;
}

export interface LabQualityData {
  testId: string;
  certificateId: string;
  labName: string;
  technicianName: string;
  timestamp: string;
  moisturePercent: number; // < 20% standard
  hmfMgKg: number; // Hydroxymethylfurfural < 80 mg/kg
  fructoseGlucoseRatio: number; // typically > 1.0
  sucrosePercent: number; // < 5%
  pollenCountPerGram: number; // e.g. 38,000
  electricalConductivity: number; // mS/cm e.g. 0.38
  pollenTypes: { flora: string; percent: number }[];
  decision: 'PASS' | 'REVIEW' | 'FLAG';
  decisionNotes: string;
}

export interface ChildPackagingLot {
  lotId: string; // e.g. 'PKG-TG-001'
  parentBatchId: string; // 'HNY-TG-2026-0001'
  jarRange: string; // 'JAR 001 - 150'
  jarSizeGrams: number; // 500
  packagingDate: string;
  qrHash: string;
  status: 'In Warehouse' | 'Dispatched' | 'On Retail Shelf';
}

export interface Batch {
  id: string; // 'HNY-TG-2026-0001'
  batchCode: string;
  hiveId: string;
  hiveCode: string;
  beekeeperId: string;
  beekeeperName: string;
  beekeeperPhoto: string;
  beekeeperPhone: string;
  beekeeperVillage: string;
  apiary: string;
  cluster: string;
  floralSource: string;
  pollenDominance: string;
  harvestDate: string;
  quantityKg: number;
  availableKg: number;
  pricePerKg: number;
  labData: LabQualityData;
  chain: BlockEvent[];
  childLots: ChildPackagingLot[];
  status: 'Harvested' | 'Lab Verified' | 'Processed' | 'Packaged' | 'In Retail' | 'Sold';
  traceabilityConfidence: number; // e.g. 98%
  qrScansCount: number;
  clonedScanDetected?: boolean;
}

export interface ClusterData {
  id: string;
  name: string;
  state: string;
  coords: [number, number]; // [lat, lng]
  beekeeperCount: number;
  hiveCount: number;
  monthlyProductionKg: number;
  healthIndex: number; // 0-100
  status: 'Healthy' | 'Moderate Risk' | 'High Risk';
  activeAlerts: number;
  averageYieldKg: number;
  verifiedBatches: number;
  description: string;
}

export interface Beekeeper {
  id: string;
  name: string;
  village: string;
  cluster: string;
  boxesCount: number;
  kvicEnrollmentId: string;
  phone: string;
  joinedDate: string;
  totalHarvestKg: number;
  totalEarningsRupees: number;
  rating: number;
}

export interface OfflineSyncItem {
  id: string;
  timestamp: string;
  type: 'HARVEST' | 'INSPECTION' | 'ALERT';
  data: Record<string, any>;
  status: 'PENDING' | 'SYNCED';
}
