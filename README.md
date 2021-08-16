# NextToGo

## Setting up environment

What you need to install first

1. **Node**

2. **Xcode** & **Cocapods** for iOS development

3. **Android Studio** & **JDK** for Android development

Please refer to the **React Native CLI Quickstart** in https://reactnative.dev/docs/environment-setup for more details

## Install dependencies
Run the following command in the project folder.
```bash
npm install
```

Run the following command in `<Project Folder>/ios/` folder (skip this if you develop for Android only).
```bash
pod install
```

## Run the App
**Step 1**. Run the following command in the project folder.

```bash
npx react-native start
```

**Step 2**. Open a new terminal, cd to the project folder.

Execute the following to run the app on an iOS device or simulator.
```bash
npx react-native run-ios
```

Execute the following to run the app an Android device or emulator (must have a device connected or an emulator running at first)
```bash
npx react-native run-android
```

Please refer to https://reactnative.dev/docs/running-on-device for more information.
