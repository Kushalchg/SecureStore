import { NativeModules } from 'react-native';
import type { RootDetectionModule } from '../types/RootDetection';

//accessign the out custom module we made in android folder(rootdetectionmodule)
// and we assign the module name as "RootDetection"

const { RootDetection } = NativeModules;

if (!RootDetection) {
  throw new Error(
    'RootDetection native module is not available. Make sure you have run expo prebuild and rebuilt your app.'
  );
}

//assigning the custom types 
export default RootDetection as RootDetectionModule;
