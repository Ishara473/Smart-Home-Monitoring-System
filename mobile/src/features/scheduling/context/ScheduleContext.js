import React, { createContext, useState, useEffect } from 'react';
import { useDevices } from '../../devices';
import { scheduleMockData } from '../data/scheduleMockData';
import { checkSafetyBreaches } from '../utils/safetyTimer';
import { scheduleRepository as firebaseScheduleRepository } from '../../../services/firebase/repositories';
import { shouldUseMockData, isFirebaseConfigured } from '../../../services/firebase';
import { useHomeContext } from '../../home/context/HomeContext';

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
  const { homeId, loading: homeLoading } = useHomeContext();
  const [schedules, setSchedules] = useState([]);
  const [safetyRules, setSafetyRules] = useState([]);
  const { devices, updateDeviceStatus } = useDevices();

  useEffect(() => {
    if (homeLoading) return;

    if (shouldUseMockData()) {
      setSchedules(scheduleMockData.schedules);
      setSafetyRules(scheduleMockData.safetyRules);
      return;
    }

    if (!isFirebaseConfigured() || !homeId) return;

    let isMounted = true;
    firebaseScheduleRepository.getSchedulesByHome(homeId)
      .then((allSchedules) => {
        if (!isMounted) return;
        setSchedules(allSchedules.filter(s => s.scheduleType === 'TIME_TRIGGER' || s.scheduleType === 'TIME_RANGE'));
        setSafetyRules(allSchedules.filter(s => s.scheduleType === 'SAFETY_RULE'));
      })
      .catch(err => console.error('[ScheduleContext] Failed to load schedules', err));

    return () => { isMounted = false; };
  }, [homeId, homeLoading]);

  // Safety timer — always active
  useEffect(() => {
    const interval = setInterval(() => {
      checkSafetyBreaches(devices, safetyRules, (deviceId) => {
        updateDeviceStatus(deviceId, 'OFF');
        if (__DEV__) console.warn(`[SAFETY CUTOFF]: Device ${deviceId} flipped to OFF.`);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [devices, safetyRules, updateDeviceStatus]);

  const createSchedule = async (newSchedule) => {
    if (shouldUseMockData()) { setSchedules(prev => [...prev, newSchedule]); return; }
    try {
      const id = await firebaseScheduleRepository.createSchedule({ ...newSchedule, homeId });
      setSchedules(prev => [...prev, { ...newSchedule, id }]);
    } catch (err) { console.error('[ScheduleContext] createSchedule failed', err); }
  };

  const updateSchedule = async (id, updated) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    if (shouldUseMockData()) return;
    try { await firebaseScheduleRepository.updateSchedule(id, updated); }
    catch (err) { console.error('[ScheduleContext] updateSchedule failed', err); }
  };

  const deleteSchedule = async (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    if (shouldUseMockData()) return;
    try { await firebaseScheduleRepository.deleteSchedule(id); }
    catch (err) { console.error('[ScheduleContext] deleteSchedule failed', err); }
  };

  const enableSchedule = (id) => updateSchedule(id, { enabled: true });
  const disableSchedule = (id) => updateSchedule(id, { enabled: false });

  const updateSafetyRule = async (id, updated) => {
    setSafetyRules(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
    if (shouldUseMockData()) return;
    try { await firebaseScheduleRepository.updateSchedule(id, updated); }
    catch (err) { console.error('[ScheduleContext] updateSafetyRule failed', err); }
  };

  return (
    <ScheduleContext.Provider value={{
      schedules, safetyRules,
      createSchedule, updateSchedule, deleteSchedule,
      enableSchedule, disableSchedule, updateSafetyRule,
    }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export default ScheduleProvider;
