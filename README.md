# DSH Remote (iOS client fork)

An **iOS-only** build of the DSH Remote mobile client, forked from
[liguobao/ds-harness-remote](https://github.com/liguobao/ds-harness-remote) (MIT).
It talks to a DeepSeek Harness host through a self-hosted ds-harness-remote relay; traffic between
phone and host is end-to-end encrypted (Noise IK), the relay only sees ciphertext.

This fork keeps only what the phone app needs:

| Path | What it is |
| --- | --- |
| `apps/mobile` | Expo (SDK 57) / React Native app, built for iOS |
| `packages/client-core`, `packages/crypto`, `packages/protocol`, `packages/webrtc` | Workspace packages the app imports |
| `fixtures/` | Protocol / crypto test vectors used by the package tests |
| `docs/` | Protocol, encryption, pairing, network and relay (server) reference |

The relay server, desktop plugin, TUI, VS Code / browser clients and the Android-specific release
tooling from upstream are not included. Use upstream for those.

## Default server

The app defaults to **`https://dsh.zehoon.com`** (our self-hosted relay). Override at build time:

```sh
EXPO_PUBLIC_DSH_REMOTE_SERVER=https://your-relay.example.com pnpm ios
```

The server can also be changed in the app on the sign-in page ("修改服务地址" / switch server).
Sign in with the relay's account + password (OAuth providers are not configured on the self-hosted relay).

## Build and run on iOS

Requirements: macOS with Xcode, Node 20+, pnpm 9 (`corepack enable`), CocoaPods.

```sh
pnpm install
cd apps/mobile
pnpm run prepare:workspace          # build workspace packages + bundled renderers
npx expo prebuild -p ios            # generates apps/mobile/ios (git-ignored)
npx expo run:ios                    # simulator
npx expo run:ios --device           # USB-connected iPhone (needs a signing team)
```

Bundle identifier: `com.anselorville.dshremote`. With a free Apple ID (Personal Team) the
installed app expires after 7 days and must be rebuilt/re-signed; a paid Apple Developer account
gives 1-year profiles and TestFlight.

### iOS limitations

- The native fast-path transport module (`modules/remote-transport`) and the foreground service are
  Android-only; iOS uses the JavaScript transport, so the connection drops when the app is
  backgrounded and there are no push notifications.
- In-app APK update / download manager is Android-only and disabled on iOS.

## License and attribution

MIT, see [LICENSE](./LICENSE). Original work © liguobao and the ds-harness-remote contributors.
