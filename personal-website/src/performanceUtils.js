export function capturePerformanceMetrics () {
  const performanceData = {
    fetchTime: null,
    pageLoadTime: null,
    memoryUsage: null,
  };

  const performanceEntries = performance.getEntriesByType('navigation');

  if (performanceEntries.length > 0) {
    const navigationEntry = performanceEntries[0];
    performanceData.pageLoadTime = navigationEntry.loadEventEnd - navigationEntry.startTime;
  }

  if (performance.memory) {
    performanceData.memoryUsage = performance.memory.usedJSHeapSize;
  }

  return performanceData;
}

export async function fetchCommunityData () {
  const startFetchTime = performance.now();

  const response = await fetch('/community');
  const data = await response.json();

  const endFetchTime = performance.now();
  return {
    data,
    fetchTime: endFetchTime - startFetchTime,
  };
}
