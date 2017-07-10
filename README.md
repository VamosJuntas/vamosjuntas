[![Stories in Ready](https://badge.waffle.io/VamosJuntas/vamosjuntas.png?label=ready&title=Ready)](https://waffle.io/VamosJuntas/vamosjuntas)
[![Build Status](https://snap-ci.com/VamosJuntas/vamosjuntas/branch/master/build_image)](https://snap-ci.com/VamosJuntas/vamosjuntas/branch/master)
#Vamos Juntas

VamosJuntas mobile application.

## Setup

What's the [Google Maps Key](https://developers.google.com/maps/documentation/javascript/get-api-key).
Access the link [API keys for the standard API](https://developers.google.com/maps/documentation/javascript/get-api-key#key) to create the key.

When you have your key in hands, export it with the following command `export API_KEY=your Key`. After you run `npm run serve` for the first time it will generate the configuration file for you.

### Normal Setup Without Docker

We recommend using `nvm` (Node Version Manager) if you want to install and manage different versions of node and linking local versions into specific directories ([download](https://github.com/creationix/nvm)).

After install nvm, run `nvm install 4.3.1`, so the supported node version of the project would be installed.

Run `nvm use` to use the node version defined in the *.nvmrc* file.

Run `npm install` to install the node dependencies.


### Setup With Docker <not working>
Docker [installation](https://docs.docker.com/engine/installation/) is mandatory

First, inside project root folder build the image:

```
docker build -t vamosjuntas .
```

To test the code in development environment, use that command:

```
docker run -it -v $PWD:/code -p 8100:8100 vamosjuntas
```

Now access 8100 port on your docker host. If you use MAC, please try 192.168.99.100:8100 in your browser. If you use linux, please try localhost:8100.

## Run on browser


It can be run with laptop's browser.
It will run with debug output.

```
npm run serve
```

## Run on Mobile Devices

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


## Testing


#### Dev Testing


If you want to **watch** unit test changes you can also run:

```
npm run watch-unit-test
```

If you want to run functional-test faster do:

```
npm run ionic
```

This will keep ionic running in your console, open another console and run:


```
npm run dev-functional-test
```


#### More complete testing (CI...)


Run both unit and functional test (separated commands bellow):

```
npm run ci
```


Run **only** functional test (this will also update webdrivers and compile css):

```
npm run functional-test
```

Run **only** unit test:

```
npm run unit-test
```


## CSS

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

## How to add specific things to specific environments?

We are using templates/appSettings.js along with gulp-preprocess (https://www.npmjs.com/package/gulp-preprocess) to pass variables depending on environment to our angular App.
If you need to add new variables to the app, follow these steps:

1. Add a new property to the appSettings global object

2. Enclose with commented "if" tags for the specfic environment, so that gulp build task will preprocess and copy the  appSettings file with the correct property values to our project source folder.

  ```
  // @if NODE_ENV == 'DEVELOPMENT'
  mapsAPIBaseUrl: '/maps/api/place'
  // @endif
  ```

3. You can now use this property in the javascript code.

 For example:

 ```
 angular.module('vamosJuntas').constant('PlacesAPI', {
   autoCompleteBaseUrl: AppSettings.mapsAPIBaseUrl + '/autocomplete/json?',
   coordinatesBaseUrl: AppSettings.mapsAPIBaseUrl + '/details/json?',
   nearbySearchBaseUrl: AppSettings.mapsAPIBaseUrl + '/nearbysearch/json?'
 });
 ```

## CORS issues in development
If you’ve used ionic serve or ionic run with live reload and accessing external API endpoints, chances are you’ve run into some CORS issues.

See the blog: http://blog.ionic.io/handling-cors-issues-in-ionic/
