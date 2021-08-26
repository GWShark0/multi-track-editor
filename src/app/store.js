import { configureStore } from '@reduxjs/toolkit';
import storyboardReducer from '../features/storyboard/storyboardSlice';

export const store = configureStore({
  reducer: {
    storyboard: storyboardReducer,
  },
});
