[![Build Status](https://snap-ci.com/VamosJuntas/vamosjuntas/branch/master/build_image)](https://snap-ci.com/VamosJuntas/vamosjuntas/branch/master)
#Vamos Juntas

VamosJuntas mobile application.

## To use docker

Docker [installation](https://docs.docker.com/engine/installation/) is mandatory

First, inside project root folder build the image:

```
docker build -t vamosjuntas .
````

To test the code in development environment, use that command:

```
docker run -it -v $PWD:/code -p 8100:8100 vamosjuntas
```

Now access 8100 port on your docker host. If you use MAC, please try 192.168.99.100:8100 in your browser. If you use linux, please try localhost:8100.


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
npm run serve
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

## Functional Test

```
npm run functional
```
----------------------------------------------------
## Manual Setup Instructions

`brew install node` (for mac, other platforms: [nodejs downloads](https://nodejs.org/en/download/))

```
npm install

```

#### Adding platforms

```
npm run ios
npm run android
```
