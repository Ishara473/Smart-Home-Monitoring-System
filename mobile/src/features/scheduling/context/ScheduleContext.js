import React, { createContext, useState, useEffect } from 'react';
import { useDevices } from '../../devices';
import { scheduleMockData } from '../data/scheduleMockData';
import { checkSafetyBreaches } from '../utils/safetyTimer';

export const ScheduleContext = createContext({
  schedules: [],
  safetyRules: [],
  createSchedule: () => {},
  updateSchedule: () => {},
  deleteSchedule: () => {},
  enableSchedule: () => {},
  disableSchedule: () => {},
  updateSafetyRule: () => {},
});

export function ScheduleProvider({ children }) {
  const [schedules, setSchedules] = useState(scheduleMockData.schedules);
  const [safetyRules, setSafetyRules] = useState(scheduleMockData.safetyRules);
  const { devices, updateDeviceStatus } = useDevices();

  // Run the background safety timer check on active devices
  useEffect(() => {
    const interval = setInterval(() => {
      checkSafetyBreaches(devices, safetyRules, (deviceId, rule) => {
        // Trigger automated safety cutoff
        updateDeviceStatus(deviceId, 'OFF');
        if (__DEV__) {
          console.warn(`[SAFETY CUTOFF]: Automatically flipped device ${deviceId} state to OFF.`);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [devices, safetyRules]);

  const createSchedule = (newSchedule) => {
    setSchedules(prev => [...prev, newSchedule]);
  };

  const updateSchedule = (id, updated) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  const enableSchedule = (id) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, enabled: true } : s));
  };

  const disableSchedule = (id) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, enabled: false } : s));
  };

  const updateSafetyRule = (id, updated) => {
    setSafetyRules(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
  };

  const value = {
    schedules,
    safetyRules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    enableSchedule,
    disableSchedule,
    updateSafetyRule,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
}

export default ScheduleProvider;
