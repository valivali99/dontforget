# Don't Forget

A small Angular app for home reminder cards ("Turn off lights", "Check sink", "Get keys").

- Add as many cards as you like; each new card starts with its toggle **OFF**.
- Edit a card's title, color (presets or any custom color) and icon (a curated set of household Material Symbols).
- Cards are saved with Capacitor Preferences (key `dontforget.cards.v1`): on Android that is the app's own private storage (SharedPreferences), kept until you clear the app's data or uninstall it. In a browser it falls back to `localStorage`.
- Fonts and icons are bundled, so the app works fully offline.

## Run

```bash
npm install
npm start
```

Then open http://localhost:4200.

## Android

The Android project lives in `android/` (Capacitor 8).

```bash
npm run android:apk   # build web app, sync, and build a debug APK
npm run android:open  # build, sync, and open in Android Studio
```

The debug APK ends up at `android/app/build/outputs/apk/debug/app-debug.apk`. After changing Angular code, run `npm run android:sync` (or one of the commands above) so the Android app picks it up.

## Structure

- `src/app/services/card-store.service.ts` — card state (signals) + localStorage persistence
- `src/app/components/reminder-card` — a single card with its toggle
- `src/app/components/card-editor` — dialog for title, color and icon
- `src/app/data/home-icons.ts` — the icon selection
- `src/app/data/card-colors.ts` — color presets
