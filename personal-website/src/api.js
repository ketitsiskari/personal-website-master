export async function sendPerformanceMetricsToServer (performanceData) {
  try {
    const response = await fetch('http://localhost:3000/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(performanceData),
    });

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Failed to send performance data:', error);
    return false;
  }
}
