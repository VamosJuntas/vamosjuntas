[![Build Status](https://snap-ci.com/VamosJuntas/vamosjuntas/branch/master/build_image)](https://snap-ci.com/VamosJuntas/vamosjuntas/branch/master)
#Vamos Juntas

VamosJuntas mobile application.


## Automatic setup

```
`brew install node` (for mac, other platforms: [nodejs downloads](https://nodejs.org/en/download/))
npm run setup
```

## Run on Android

To enable android emulator to get position is necessary to update the file platforms/android/AndroidManifest.xml with the following code:

```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

```
ionic emulate android
```

## Run on IOS

```
ionic emulate ios
```

## Run on Browser

```
ionic serve
```

## Debugging

```
ionic emulate -lc ios
```

## Testing

```
npm run test -- running tests with watcher
npm run ci -- running tests once
```
## Linter

```
npm run lint -- running eslint
```
## Troubleshooting

Restore plugins in case of problems

```
ionic state restore
```

----------------------------------------------------
## Manual Setup Instructions

`brew install node` (for mac, other platforms: [nodejs downloads](https://nodejs.org/en/download/))

```
npm install
npm install -g bower
npm install -g karma-cli
npm install -g cordova ionic ios-sim
```

#### Adding platforms

```
cordova platform add ios
cordova platform add android
```
