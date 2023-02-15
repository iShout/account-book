import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const enableHapticFeedback = () => {
  ReactNativeHapticFeedback.trigger('impactLight', options);
};

export default enableHapticFeedback;
