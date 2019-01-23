# BLSI Mobile App
The Blunt Liver and Spleen (BLSI) application for Phoenix Children's Hospital (PCH) is an application that prevents unnecessary surgeries when there may or may not be internal bleeding. The BLSI algorithm helps determine whether or not a surgeon needs to perform an operation on the patient. The BLSI algorithm's main purpose is to prevent unnecessary surgeries for patients.

## Getting Started
### Basic Software Needs

* [Node.js](https://nodejs.org/en/download/)
* [Android Studio](https://developer.android.com/studio/install)

This application was built with React Native, which will require a few things to get up and running. The first and main item to download is [Node.js](https://nodejs.org/en/download/). This will allow you to run and install all the modules that go along with this application. 

There are a variety of methods to have the app run. You may want to run it on an emulator or on your own phone. You should be able to get it running quickly with the Expo app, which is available on your respective app store. If you would prefer to use an emulator, one option is to use [Android Studio](https://developer.android.com/studio/install). If you are using a Mac, there is the option to use Xcode.

### App Setup and Running
Create or go to the folder that you want to place the project. Download the zip of the project or run this command in your CLI: 
```git clone https://github.com/AaronStahley/SER401-BLSI.git```.

Next with Node.js installed, open a CLI within the project folder and run: ```npm install```.

This may take a while, so give it some time. Once finished, run the command: 
```npm start```. This will later ask to press a button corresponding to the method you would like to run. Press <A> to run on android or <I> to run on ios. Alternatively, there is ```npm android``` or ```npm ios```, instead of running ```npm start```. 

Those using the Expo app that was downloaded, will be able to scan a QR code to connect to the server hosting the app. This should install and open it up on your device. If an emulator is being used, this should be opened up automatically once loaded.

## Dependencies
* React-Native - Main Framework the application runs off of
* Expo - Platform to run the application
* Mobx - Update and refresh pages
* Bluebird - Extends promise capabilities of JavaScript/Node.js 

## Testing 
* Jest - JavaScript unit testing module
* Jest-Expo - Expo module for running test in Jest
* Babel-Jest - Babel module for running tests in Jest
* Enzyme - Provides way to unit test components for React
* Prettier - Code stylizer

Download the developer testing utilities with: ```npm install --only=dev```. The tests can then be ran using: ```npm test```.

## Authors
* Michael Kasper
* Conrad Morawski
* Aaron Stahley
* Cristina Gloria
* Taylor Greeff

## Support Application
This application has a support application that is being developed to create the data of the application.  
* https://github.com/michaelkasper/SER401-BLSI-SupportApp
