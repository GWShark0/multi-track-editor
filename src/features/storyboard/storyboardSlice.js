import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { last } from 'lodash';
import { nanoid } from 'nanoid';

const itemsAdapter = createEntityAdapter();
const tracksAdapter = createEntityAdapter();

const initialState = {
  items: itemsAdapter.getInitialState(),
  // start with one track by default
  tracks: tracksAdapter.addOne(tracksAdapter.getInitialState(), {
    id: nanoid(),
  }),
};

export const storyboardSlice = createSlice({
  name: 'storyboard',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const id = nanoid();
      itemsAdapter.addOne(state.items, { id, ...action.payload });
    },
    addTrack: (state) => {
      const id = nanoid();
      tracksAdapter.addOne(state.tracks, { id, itemIds: [] });
    },
    removeItem: (state, action) => {
      itemsAdapter.removeOne(state.items, action);
    },
    removeTrack: (state, action) => {
      tracksAdapter.removeOne(state.tracks, action);
    },
  },
});

// actions
export const { addItem, addTrack, removeItem, removeTrack } =
  storyboardSlice.actions;

// selectors
export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectTotal: selectTotalItems,
} = itemsAdapter.getSelectors((state) => state.storyboard.items);
export const {
  selectAll: selectAllTracks,
  selectById: selectTrackById,
  selectTotal: selectTotalTracks,
} = tracksAdapter.getSelectors((state) => state.storyboard.tracks);

export const selectLastTrackId = createSelector(
  selectAllTracks,
  (tracks) => last(tracks).id
);

export const selectCanRemoveTracks = createSelector(
  selectTotalTracks,
  (total) => total > 1
);

export default storyboardSlice.reducer;
