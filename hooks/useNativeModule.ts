import { useState, useEffect } from 'react';
import RootDetection from '../modules/RootDetection';
import { DeveloperCheckResult, RootCheckResult } from '@/types/RootDetection';
interface RootDetectionType {
  isRooted: RootCheckResult,
  isDevEnabled: DeveloperCheckResult,
}

export const useNativeModule = () => {
  const [securityStatus, setSecurityStatus] = useState<RootDetectionType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkSecurity = async () => {
    try {
      setError(null);
      const isRooted = await RootDetection.checkRootStatus();
      const isDevEnabled = await RootDetection.checkDeveloperOptions();
      setSecurityStatus({ isRooted, isDevEnabled });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  useEffect(() => {
    checkSecurity();
  }, []);

  return {
    securityStatus,
    error,
    checkSecurity,
  };
};
