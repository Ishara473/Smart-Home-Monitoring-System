import { dashboardMockData } from '../data/dashboardMockData';

/**
 * Custom hook supplying dashboard data configuration.
 * Decouples visual presentation screens from backend data providers (e.g. mock vs Firebase).
 */
export function useDashboard() {
  return {
    dashboardData: dashboardMockData
  };
}

export default useDashboard;
