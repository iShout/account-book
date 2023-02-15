import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {isHapticEnabled} from '../../redux/features/haptic/hapticSlice';

import {enableHapticFeedback} from '../../toolFunctions/toolFunctions';
const HapticFeedbackView = props => {
  const {onPress, children} = props;
  const hapticEnable = useSelector(isHapticEnabled);
  const onPressWithHapticFeedback = () => {
    hapticEnable && enableHapticFeedback();
    onPress();
  };
  return (
    <TouchableOpacity onPress={onPressWithHapticFeedback}>
      {children}
    </TouchableOpacity>
  );
};

export default HapticFeedbackView;
