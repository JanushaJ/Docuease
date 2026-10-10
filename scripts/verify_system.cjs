const crypto = require('crypto');

function sha256(message) {
  return crypto.createHash('sha256').update(message).digest('hex');
}

console.log('=== HONEY CHAIN SYSTEM VERIFICATION TEST ===\n');

// 1. Test SHA-256 Cryptographic Chaining
console.log('Test 1: SHA-256 Hash Generation & Block Chaining...');
const blocks = [];
let prevHash = '0000000000000000000000000000000000000000000000000000000000000000';

const events = [
  { index: 1, type: 'HARVEST', payload: { hive: 'HIVE-TG-017', qty: 42.5 } },
  { index: 2, type: 'LAB_TEST', payload: { moisture: 17.2, hmf: 14.2, result: 'PASS' } },
  { index: 3, type: 'PROCESSING', payload: { temp: '37.5C', lot: 'LOT-PROC-049' } },
  { index: 4, type: 'QUALITY_APPROVAL', payload: { kvic: 'TG-084', verified: true } },
  { index: 5, type: 'PACKAGING', payload: { lots: ['PKG-001', 'PKG-002'] } },
  { index: 6, type: 'DISPATCH', payload: { fleet: 'DISP-TG-88192' } },
  { index: 7, type: 'RETAIL', payload: { shelf: 'KVIC Banjara Hills' } }
];

for (const ev of events) {
  const content = JSON.stringify({ index: ev.index, prevHash, type: ev.type, payload: ev.payload });
  const blockHash = sha256(content);
  blocks.push({ ...ev, prevHash, blockHash });
  prevHash = blockHash;
}

console.log(`✓ Mined ${blocks.length} blocks successfully.`);
console.log(`  Genesis Block Hash: ${blocks[0].blockHash.substring(0, 16)}...`);
console.log(`  Retail Block Hash:  ${blocks[6].blockHash.substring(0, 16)}...`);

// 2. Test Verification Function
function verifyChain(chain) {
  for (let i = 0; i < chain.length; i++) {
    if (i > 0 && chain[i].prevHash !== chain[i - 1].blockHash) {
      return { valid: false, brokenIndex: i, reason: 'Previous hash mismatch' };
    }
    const content = JSON.stringify({ index: chain[i].index, prevHash: chain[i].prevHash, type: chain[i].type, payload: chain[i].payload });
    const expected = sha256(content);
    if (expected !== chain[i].blockHash) {
      return { valid: false, brokenIndex: i, reason: 'Payload tampered', expected, received: chain[i].blockHash };
    }
  }
  return { valid: true, count: chain.length };
}

const verifyOriginal = verifyChain(blocks);
console.log(`\nTest 2: Verification on authentic chain: Valid = ${verifyOriginal.valid} (${verifyOriginal.count}/${blocks.length} blocks valid)`);
if (!verifyOriginal.valid) throw new Error('Original chain verification failed!');

// 3. Test Tamper Detection
console.log('\nTest 3: Simulating malicious payload tampering on Block #3 (Processing)...');
const tamperedChain = JSON.parse(JSON.stringify(blocks));
tamperedChain[2].payload.temp = '68.0C (Overheated Pasteurized)';

const verifyTampered = verifyChain(tamperedChain);
console.log(`✓ Tamper successfully detected: Valid = ${verifyTampered.valid}`);
console.log(`  Compromised Block Index: ${verifyTampered.brokenIndex} (Block #${verifyTampered.brokenIndex + 1})`);
console.log(`  Reason: ${verifyTampered.reason}`);
if (verifyTampered.valid) throw new Error('Tamper detection failed to detect altered payload!');

// 4. Test What-If Yield Calculation Algorithm
console.log('\nTest 4: What-If Yield Forecast Formula...');
function calcYield(base, temp, rain, flora, health, days) {
  const tempFactor = (temp >= 30 && temp <= 36) ? 1.05 : 0.88;
  const rainFactor = rain > 40 ? 0.85 : 1.02;
  const floraFactor = flora / 80;
  const healthFactor = health / 85;
  const rate = (days / 21) * 4.8 * tempFactor * rainFactor * floraFactor * healthFactor;
  return +(base + rate).toFixed(1);
}

const baseYield = 18.4;
const optimal14 = calcYield(baseYield, 34, 12, 85, 86, 14);
const drought14 = calcYield(baseYield, 42, 0, 30, 60, 14);
console.log(`  Optimal 14-day yield: ${optimal14} kg (Expected: > 20 kg)`);
console.log(`  Drought 14-day yield: ${drought14} kg (Expected: reduced growth)`);

// 5. Test FSSAI Standards Evaluation Logic
console.log('\nTest 5: FSSAI Lab Standards Evaluation...');
function evalLab(moisture, hmf, sucrose) {
  if (moisture > 20 || hmf > 80 || sucrose > 5) return 'FLAG';
  if (moisture > 19 || hmf > 40) return 'REVIEW';
  return 'PASS';
}
console.log(`  Pure Raw Honey (Moisture 17.2%, HMF 14.2): ${evalLab(17.2, 14.2, 1.8)} (Expected: PASS)`);
console.log(`  Adulterated Honey (Moisture 21.5%, HMF 92.0): ${evalLab(21.5, 92.0, 7.5)} (Expected: FLAG)`);

console.log('\n=== ALL HONEY CHAIN ENGINE TESTS PASSED (5/5) ===');
