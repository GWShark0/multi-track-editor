import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { last, pull } from 'lodash';
import { nanoid } from 'nanoid';

const itemsAdapter = createEntityAdapter();
const tracksAdapter = createEntityAdapter();

const initialState = {
  items: itemsAdapter.getInitialState(),
  // start with one track by default
  tracks: tracksAdapter.addOne(tracksAdapter.getInitialState(), {
    id: nanoid(),
    itemIds: [],
  }),
};

export const storyboardSlice = createSlice({
  name: 'storyboard',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id = nanoid(), trackId, type } = action.payload;

      const track = state.tracks.entities[trackId];

      if (track?.itemIds.includes(id) === false) {
        track.itemIds.push(id);
      }

      itemsAdapter.addOne(state.items, { id, trackId, type });

      state.activeId = id;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;

      const { trackId } = state.items.entities[itemId];
      const track = state.tracks.entities[trackId];

      track.itemIds = pull(track.itemIds, itemId);
      itemsAdapter.removeOne(state.items, action);
      delete state.activeId;
    },
    addTrack: (state) => {
      const id = nanoid();
      tracksAdapter.addOne(state.tracks, { id, itemIds: [] });
    },
    removeTrack: (state, action) => {
      const trackId = action.payload;

      const track = state.tracks.entities[trackId];

      itemsAdapter.removeMany(state.items, track.itemIds);
      tracksAdapter.removeOne(state.tracks, action);
    },
    setActiveId: (state, action) => {
      state.activeId = action.payload;
    },
  },
});

// actions
export const { addItem, addTrack, removeItem, removeTrack, setActiveId } =
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
  selectIds: selectTrackIds,
  selectTotal: selectTotalTracks,
} = tracksAdapter.getSelectors((state) => state.storyboard.tracks);

export const selectLastTrackId = createSelector(selectTrackIds, (tracks) =>
  last(tracks)
);

export const selectCanRemoveTracks = createSelector(
  selectTotalTracks,
  (total) => total > 1
);

export const selectItemsByTrack = createSelector(
  [selectAllItems, (state, trackId) => trackId],
  (items, trackId) => {
    return items.filter((item) => item.trackId === trackId);
  }
);

export const selectActiveId = (state) => state.storyboard.activeId;

export const selectIsActive = (state, id) => {
  return selectActiveId(state) === id;
};

export default storyboardSlice.reducer;
