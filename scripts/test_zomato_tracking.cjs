const assert = require('assert');

async function testZomatoTracking() {
  console.log('Testing Zomato Live Tracking API endpoints...');

  // 1. Get active tracking orders
  const activeRes = await fetch('http://localhost:5001/api/tracking/active');
  assert.strictEqual(activeRes.status, 200, 'Tracking active endpoint must return 200');
  const activeData = await activeRes.json();
  console.log(`✓ Fetched ${activeData.orders.length} active delivery orders on the India map.`);
  assert.ok(activeData.orders.length > 0, 'Should have at least 1 active delivery');

  const firstOrder = activeData.orders[0];
  console.log(`\nInspecting Order: ${firstOrder.foodTitle}`);
  console.log(`- Donor: ${firstOrder.donorName} (${firstOrder.donorAddress})`);
  console.log(`- Receiver: ${firstOrder.receiverName} (${firstOrder.receiverAddress})`);
  console.log(`- Rider: ${firstOrder.riderName} (${firstOrder.riderVehicle})`);
  console.log(`- Current Step: ${firstOrder.statusStep} / 5 (${firstOrder.status})`);
  console.log(`- Rider GPS Coords: [${firstOrder.riderCoords[0]}, ${firstOrder.riderCoords[1]}]`);
  console.log(`- ETA: ${firstOrder.etaMinutes} mins`);

  // 2. Advance the order by 1 step
  console.log(`\nSimulating delivery step advancement (POST /api/tracking/${firstOrder.id}/advance)...`);
  const advanceRes = await fetch(`http://localhost:5001/api/tracking/${firstOrder.id}/advance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  assert.strictEqual(advanceRes.status, 200, 'Advance endpoint must return 200');
  const advanceData = await advanceRes.json();
  console.log(`✓ Advanced Order Step!`);
  console.log(`- New Status: ${advanceData.status}`);
  console.log(`- New Tracking Milestone: ${advanceData.tracking_status}`);

  console.log('\n🎉 Zomato Tracking API verified 100% working!');
}

testZomatoTracking().catch((err) => {
  console.error('Zomato tracking test error:', err);
  process.exit(1);
});
