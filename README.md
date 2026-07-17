# Notfallbereit – Flutter Frontend

## Requirements

Before running the application, make sure the following software is installed:

* Flutter SDK
* Dart SDK
* Android Studio or Visual Studio Code
* Android Emulator or a physical Android device

## Installation

Clone the repository and navigate to the Flutter project directory.

Clean previous build files:

```bash
flutter clean
```

Install all required dependencies:

```bash
flutter pub get
```

## Running the application

Display all available devices:

```bash
flutter devices
```

Run the application on a specific device:

```bash
flutter run -d <device-id>
```

Example:

```bash
flutter run -d emulator-5554
```

## Android Studio

1. Open the Flutter project in Android Studio.
2. Wait until Gradle synchronization has finished.
3. Open the integrated terminal and run:

```bash
flutter pub get
```

4. Start an Android emulator or connect a physical Android device.
5. Select the target device from the toolbar.
6. Click **Run** or press **Shift + F10** to launch the application.

## Useful Flutter Commands

Analyze the project:

```bash
flutter analyze
```

Run all tests:

```bash
flutter test
```

Build an Android APK:

```bash
flutter build apk
```

Build an Android App Bundle:

```bash
flutter build appbundle
```

Clean generated build files:

```bash
flutter clean
```

Update project dependencies:

```bash
flutter pub get
```
