/**
 * Repository Factory / Central Abstraction Index
 * 
 * Re-exports the active repository implementations for the application.
 * Currently configured to export Mock Repositories.
 * Switching to Firebase during migration will involve changing these exports.
 */

export { default as DeviceRepository } from './device';
export { default as FloorRepository } from './floor';
export { default as RoomRepository } from './room';
export { default as CameraRepository } from './camera';
export { default as ScheduleRepository } from './schedule';
export { default as NotificationRepository } from './notification';
export { default as ReportRepository } from './report';
