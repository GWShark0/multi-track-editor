import { createSelector, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  tracks: [{ id: nanoid() }],
};

export const storyboardSlice = createSlice({
  name: 'storyboard',
  initialState,
  reducers: {
    addTrack: (state) => {
      state.tracks.push({ id: nanoid() });
    },
    removeTrack: (state) => {
      state.tracks.pop();
    },
  },
});

// actions

export const { addTrack, removeTrack } = storyboardSlice.actions;

// selectors

export const selectTracks = (state) => state.storyboard.tracks;

export const selectCanRemoveTrack = createSelector(
  selectTracks,
  (tracks) => tracks.length > 1
);

export default storyboardSlice.reducer;
