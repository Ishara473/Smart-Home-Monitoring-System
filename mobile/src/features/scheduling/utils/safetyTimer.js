const activeTimers = {};

/**
 * Checks running devices against active safety rules.
 * Triggers a callback if a device exceeds its maximum permissible active duration.
 */
export function checkSafetyBreaches(devices, safetyRules, onCutoffTriggered) {
  devices.forEach(device => {
    const rule = safetyRules.find(r => r.deviceId === device.id && r.enabled);
    
    if (device.status === 'ON' && rule) {
      if (!activeTimers[device.id]) {
        activeTimers[device.id] = Date.now();
      } else {
        const elapsedSeconds = Math.floor((Date.now() - activeTimers[device.id]) / 1000);
        if (elapsedSeconds >= rule.maxOnDuration) {
          // Safety cutoff limit breached
          delete activeTimers[device.id];
          onCutoffTriggered(device.id, rule);
        }
      }
    } else {
      // Remove tracker if device is turned off or disconnected
      delete activeTimers[device.id];
    }
  });
}

/**
 * Retrieves the elapsed runtime in seconds for an active device.
 */
export function getElapsedSeconds(deviceId) {
  if (!activeTimers[deviceId]) return 0;
  return Math.floor((Date.now() - activeTimers[deviceId]) / 1000);
}

export default {
  checkSafetyBreaches,
  getElapsedSeconds
};
