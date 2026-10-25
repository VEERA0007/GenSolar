# GenSolar Pro — complete Android application

This repository is populated as a clean source tree from the latest GenSolar Pro 1.4 Android app baseline. The Android project files are not taken from this repository's earlier commits. The latest welcome screen, splash resources, logo assets, and visual styles are preserved.

## Android project

`gensolar-android-project/gensolar-android/`

- Android WebView application, package `com.gensolar.pro`
- Welcome screen and splash resources from the latest app baseline
- Firebase Phone OTP authentication
- Customer, representative, and manager roles
- Estimator, customer estimates/leads, profile, PDF/share actions
- Telangana, Andhra Pradesh, Odisha and Chhattisgarh tariff assumptions
- Added Engineering & Site Design workspace for preliminary panel sizing, roof capacity, azimuth/tilt, inverter ratio, resource data entry, project stages, and pre-sales document checklist

## Build an APK on GitHub

1. Open the **Actions** tab.
2. Select **Build GenSolar APK**.
3. Choose **Run workflow** on the `main` branch.
4. When the run succeeds, open it and download the `GenSolar-Pro-debug-APK` artifact.

The workflow runs `gradle assembleDebug` from the Android project directory and uploads the debug APK.

## Build locally

Requirements: JDK 17, Android SDK, and Gradle installed.

```sh
cd gensolar-android-project/gensolar-android
gradle assembleDebug
```

APK output:
`app/build/outputs/apk/debug/app-debug.apk`

## Firebase setup

The app uses the Firebase Android app configured in `app/google-services.json`. In Firebase Console, verify that Phone Authentication is enabled and that the Android package is `com.gensolar.pro`. Follow `gensolar-android-project/gensolar-android/LEAD_CRM_SETUP.md` for setup notes.

For Phone Auth, register the SHA fingerprints of the key used to sign the installed APK in Firebase Console. A debug signing key is included for development only; do not use it for a public production release. Create a separate production signing key before Play Store publishing.

## Engineering workspace notes

The Engineering page calculations are preliminary sizing aids. GHI, DNI, DHI, GTI, annual yield and source/date fields are manually entered from a verified assessment; they are not fetched live by this app. Roof area assumptions, final structure, string sizing, inverter selection, protection, cable sizing, statutory approvals and net-metering must be confirmed by the responsible engineer and local DISCOM.

## Repository safety

- Keep Firebase rules restrictive; see `firestore.rules.example`.
- Do not place production signing keys, private service-account credentials, or customer personal data in the public repository.
- Verify the APK on a test phone before distributing it.
