import {configureStore} from '@reduxjs/toolkit';
import hapticReducer from '../features/haptic/hapticSlice';

export default configureStore({
  reducer: {
    haptic: hapticReducer,
  },
});
