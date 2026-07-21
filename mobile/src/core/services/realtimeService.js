/**
 * Placeholder service for future realtime sync protocol implementation (e.g. Firebase onSnapshot).
 */
export const realtimeService = {
  subscribe: (channel, callback) => {
    if (__DEV__) {
      console.log(`[RealtimeService]: Emulating active listener subscription to channel: ${channel}`);
    }
    // Return mock unsubscribe subscription object handler
    return {
      subscriptionId: `${channel}-${Date.now()}`,
      unsubscribe: () => {
        if (__DEV__) {
          console.log(`[RealtimeService]: Emulating unsubscription from channel: ${channel}`);
        }
      }
    };
  },

  unsubscribe: (subscription) => {
    if (subscription && typeof subscription.unsubscribe === 'function') {
      subscription.unsubscribe();
    }
  }
};

export default realtimeService;
