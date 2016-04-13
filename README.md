[![Stories in Ready](https://badge.waffle.io/vamosJuntas/vamosJuntas.png?label=ready&title=Ready)](https://waffle.io/vamosJuntas/vamosJuntas)
[![Stories in Ready](https://badge.waffle.io/vamosjuntas/vamosjuntas.png?label=ready&title=Ready)](https://waffle.io/vamosjuntas/vamosjuntas)
[![Stories in Ready](https://badge.waffle.io/VamosJuntas/vamosjuntas.png?label=ready&title=Ready)](https://waffle.io/VamosJuntas/vamosjuntas)
[![Build Status](https://snap-ci.com/VamosJuntas/vamosjuntas/branch/master/build_image)](https://snap-ci.com/VamosJuntas/vamosjuntas/branch/master)
#Vamos Juntas

VamosJuntas mobile application.

## Setup



### Normal Setup


Run `brew install node` (for mac, other platforms: [nodejs downloads](https://nodejs.org/en/download/)).

Run `npm install`


### To use docker <not working>
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

## Run on browser


It can be run with laptop's browser.
It will run with debug output.

```
npm run ionic
```

##Run on Mobile Devices

To enable android emulator to get position is necessary to update the file platforms/android/AndroidManifest.xml with the following code:

```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

```
npm run ionic-emulate-android
```

To run on IOS:

```
npm run ionic-emulate-ios
```


##Testing

To run both unit and functional test:

```
npm run ci
```


Run **only** functional test:

```
npm run functional-test
```

Run **only** unit test:

```
npm run unit-test
```

If you want to **watch** unit test changes you can also run:

```
npm run watch-unit-test
```


##CSS

Compile css:

```
npm run build-css
```
Watch CSS:

```
npm run watch-css
```

## Linter

```
npm run lint
```
## Troubleshooting

Restore plugins in case of problems

```
npm run ionic-state-restore
```

Run in devices on debug mode:

```
npm run ionic-emulate-android
```

```
npm run ionic-emulate-android
```
