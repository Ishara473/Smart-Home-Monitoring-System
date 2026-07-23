import { useState, useEffect } from 'react';
import { NotificationRepository } from '../repository/NotificationRepository';

/**
 * Hook returning notification list plus computed unreadCount.
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);

    const delay = setTimeout(() => {
      try {
        const data = NotificationRepository.getNotifications();
        // Sort: unread first, then by timestamp descending
        const sorted = [...data].sort((a, b) => {
          if (a.read !== b.read) return a.read ? 1 : -1;
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setNotifications(sorted);
      } catch (err) {
        setError('Failed to retrieve notifications');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  };

  useEffect(() => {
    const cleanup = load();
    return cleanup;
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    loading,
    error,
    unreadCount,
    refresh: load,
  };
}

export default useNotifications;
