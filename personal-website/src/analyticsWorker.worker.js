let eventsBatch = [];

self.addEventListener('message', function (e) {
  console.log('Received event in worker:');
  eventsBatch.push(e.data);

  if (eventsBatch.length === 5) {
    sendBatchToServer();
    eventsBatch = [];
  }
}, false);

const sendBatchToServer = async () => {
  console.log('Attempting to send data:', eventsBatch);

  try {
    const response = await fetch('http://localhost:3000/analytics/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventsBatch),
    });

    if (!response.ok) {
      throw new Error('Failed to send analytics data');
    }
  } catch (error) {
    console.error('Error in worker:', error);
  }
};
