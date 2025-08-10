
# Secure Store

Mock practice app demonstrating mobile security features including root detection, screenshot prevention, and developer mode restrictions.
NOTE: Release and Debug APKs are available [**here**](https://github.com/Kushalchg/SecureStore/releases/tag/v1.0.1)
https://github.com/Kushalchg/SecureStore/releases/tag/v1.0.0

## Security Features

- Root detection using RootBeer library
- Screenshot and screen recording prevention
- Developer mode detection

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Build for development
   
   This app requires a development build due to custom native modules. It won't work with Expo Go.
   
   ```bash
   cd android/
   ./gradlew assembleDebug
   ```
   
   Debug APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

   Add to this you can also find the `app-debug.apk` and `app-release.apk` on project [release](https://github.com/Kushalchg/SecureStore/releases/tag/v1.0.1) page also.

3. Device setup (if using physical device)
   
   See [React Native docs](https://reactnative.dev/docs/running-on-device)

4. Start development server

   ```bash
   npm start
   ```

## Platform Support

- Android: Tested and working
- iOS: Untested (native modules may not work)

## Implementation Details

### Root Detection
Uses [RootBeer](https://github.com/scottyab/rootbeer) library to detect rooted devices.

### Screenshot Prevention
Implements Android's native [screen capture control](https://developer.android.com/about/versions/14/features/screenshot-detection#control-capture-ability).

### Developer Mode Detection
Checks `Settings.Global.DEVELOPMENT_SETTINGS_ENABLED` via Android's [Settings API](https://developer.android.com/reference/android/provider/Settings.Global#DEVELOPMENT_SETTINGS_ENABLED).

## Build Outputs

### Debug Build
```bash
cd android/
./gradlew assembleDebug
```
APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release Build
```bash
cd android/
./gradlew assembleRelease
```
APK location: `android/app/build/outputs/apk/release/app-release.apk`

*Note: Release keystore is already included in the project.*

## Notes

- Custom native modules require development builds
- Security features are Android-specific
- Project uses Expo with file-based routing
