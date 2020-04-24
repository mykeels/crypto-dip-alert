# Crypto Dip Alert

## Setup

Seeing as React Native supports both Android and iOS platform and they kinda have unique setup, you might need to run a separate setup depending on the platform you want to build for. Follow the steps highlighted below:

* Clone the repository

* Install dependencies with the command

```sh
yarn
```

### iOS

For iOS, there's an extra step you need to take to get the app working on your emulator/iPhone.
Ensure you have `cocoapods` installed on your PC, you can install using homebrew.

```sh
brew install cocoapods
```

* CD into the `ios` directory

* Install pods with the command `pod install`

### Running the app on your emulator or physical device

If you're making use of an emulator, ensure you've started the emulator. If you're making use of your mobile device, ensure it's connected to your PC (and you can view it when you run the command `adb devices` for android devices).

Run the `yarn android` or `yarn ios` command depending on your platform.

#### Icons Directory

Made use of MaterialCommunityIcons, you can look at the list of [icons available here](https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialCommunityIcons.json).
