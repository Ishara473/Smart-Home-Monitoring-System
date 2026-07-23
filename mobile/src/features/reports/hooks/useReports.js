import { useState, useEffect } from 'react';
import { ReportRepository } from '../repository/ReportRepository';

/**
 * Hook returning the full report list.
 * The 500ms delay simulates async API latency and
 * makes swapping to a real analytics service seamless.
 */
export function useReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const delay = setTimeout(() => {
      try {
        const data = ReportRepository.getReports();
        setReports(data);
      } catch (err) {
        setError('Failed to load analytics reports');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  return { reports, loading, error };
}

export default useReports;
