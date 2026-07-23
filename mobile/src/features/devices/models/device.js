import { DEVICE_TYPES } from '../../../shared/constants/deviceTypes';
import { DEVICE_STATUS } from '../../../shared/constants/deviceStatus';

/**
 * Creates a normalized IoT device object structure matching real device configurations.
 */
export function createDevice({
  id,
  name,
  type = DEVICE_TYPES.LIGHT,
  location = { room: 'General', floor: 'ground-floor' },
  status = DEVICE_STATUS.ONLINE,
  state = {},
  powerConsumption = 0,
  lastUpdated = new Date().toISOString(),
  ...extra
}) {
  return {
    id,
    name,
    type,
    location,
    status,
    state,
    powerConsumption,
    lastUpdated,
    ...extra
  };
}

export default {
  createDevice,
};
