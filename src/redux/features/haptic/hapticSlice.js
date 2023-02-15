import {createSlice} from '@reduxjs/toolkit';

export const hapticSlice = createSlice({
  name: 'haptic',
  initialState: {
    hapticEnable: false,
  },
  reducers: {
    hapticToggle: state => {
      state.hapticEnable = !state.hapticEnable;
    },
  },
});

export const {hapticToggle} = hapticSlice.actions;
export const isHapticEnabled = state => state.haptic.hapticEnable;

export default hapticSlice.reducer;
