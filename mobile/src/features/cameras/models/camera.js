export function createCamera({
  id,
  deviceId,
  name,
  location,
  status = 'ONLINE', // 'ONLINE' | 'OFFLINE' | 'DISCONNECTED'
  snapshotUri = null,
  streamUri = null,
  lastUpdated = 'Just now'
}) {
  return {
    id,
    deviceId,
    name,
    location,
    status,
    snapshotUri,
    streamUri,
    lastUpdated
  };
}

export default {
  createCamera,
};
