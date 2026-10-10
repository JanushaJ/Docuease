async function testHealthAndUpload() {
  try {
    const rootRes = await fetch('http://localhost:3000/');
    console.log('Root HTML Status:', rootRes.status);
    const text = await rootRes.text();
    console.log('Includes Krishxtattva in HTML?', text.includes('Krishxtattva'));

    const healthRes = await fetch('http://localhost:3000/api/health');
    console.log('Health Status:', healthRes.status);
    const healthJson = await healthRes.json();
    console.log('Health Service:', healthJson.service);
  } catch (err) {
    console.error('Test Failed:', err);
  }
}

testHealthAndUpload();
