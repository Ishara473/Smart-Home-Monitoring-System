import { DEVICE_TYPES } from '../../../shared/constants/deviceTypes';
import { DEVICE_STATUS } from '../../../shared/constants/deviceStatus';

/**
 * Creates a normalized device object structure.
 */
export function createDevice({
  id,
  name,
  type = DEVICE_TYPES.LIGHT,
  status = DEVICE_STATUS.OFF,
  room = 'General',
  floor = 'Ground Floor',
  isControllable = true,
  powerUsage = 0,
  schedule = null,
  maxOnDuration = null,
  switches = [],
  cameraUri = null,
  ...extra
}) {
  return {
    id,
    name,
    type,
    status,
    room,
    floor,
    isControllable,
    powerUsage,
    schedule,
    maxOnDuration,
    switches,
    cameraUri,
    ...extra
  };
}

export default {
  createDevice,
};
