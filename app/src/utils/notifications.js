import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },

  popInitialNotification: true,
  requestPermissions: true,
});

export const LocalNotification = ({threshold, trackingOption}) => {
  let dip;
  trackingOption === 'Percent'
    ? (dip = `${threshold}%`)
    : (dip = `$${threshold}`);

  PushNotification.localNotification({
    autoCancel: true,
    bigText: `We detected a ${dip} dip and thought we should let you know.`,
    subText: 'Dip Alert',
    title: 'Dip Alert',
    message: 'Expand to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    // actions: '["Yes", "No"]',
  });
};
