[![Build Status](https://snap-ci.com/VamosJuntas/vamosjuntas/branch/master/build_image)](https://snap-ci.com/VamosJuntas/vamosjuntas/branch/master)
#Vamos Juntas

VamosJuntas mobile application.

## Installing dependencies

`brew install node` (for mac, other platforms: [nodejs downloads](https://nodejs.org/en/download/))

```
npm install
npm install -g bower
npm install -g karma-cli
npm install -g cordova ionic ios-sim
```


## Running

### Browser

```
ionic serve
```
### Phone Emulation

#### Set platform as IOS

```
cordova platform add ios
ionic emulate ios
```

#### Set platform as Android

```
cordova platform add Android
ionic emulate android
```

## Testing

```
npm run test -- running tests with watcher
npm run ci -- running tests once
```

## Debugging

```
ionic emulate -lc ios
```
`karma start karma.conf.js`

## Troubleshooting

Restore plugins in case of problems

```
ionic state restore
```

