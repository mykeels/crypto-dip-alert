export const HOME_SCREEN = 'Home';
export const SETTINGS_SCREEN = 'Settings';

export const USER_SETTINGS = 'user_settings';
export const TRACKING_CHOICES = ['Cents', 'Percent'];
export const TRACKING_SYMBOLS = ['¢', '%'];
export const SUPPORTED_COINS = [
  { abbreviation: 'BTC', value: 'bitcoin' },
  { abbreviation: 'ETH', value: 'ethereum' },
  { abbreviation: 'MIN', value: 'minero' },
  { abbreviation: 'LTC', value: 'litecoin' },
];

export const INITIAL_USER_SETTINGS = {
  alerting: false,
  coinsToTrack: SUPPORTED_COINS.slice(0,2).map(e => e.value),
  trackingOption: TRACKING_CHOICES[0],
  threshold: 0
};
