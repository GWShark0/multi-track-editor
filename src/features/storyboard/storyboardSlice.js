import {
  createEntityAdapter,
  createSelector,
  createSlice,
  current,
  // current,
} from '@reduxjs/toolkit';
import { first, last, pull } from 'lodash';
import { nanoid } from 'nanoid';

const itemsAdapter = createEntityAdapter();
const tracksAdapter = createEntityAdapter();

const initialState = {
  items: itemsAdapter.getInitialState(),
  // start with one track by default
  tracks: tracksAdapter.addMany(tracksAdapter.getInitialState(), [
    { id: nanoid(), itemIds: [] },
    { id: nanoid(), itemIds: [] },
    { id: nanoid(), itemIds: [] },
    { id: nanoid(), itemIds: [] },
  ]),
};

export const storyboardSlice = createSlice({
  name: 'storyboard',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const {
        id = nanoid(),
        duration = 1,
        startTime,
        trackId,
        type,
      } = action.payload;

      const track = state.tracks.entities[trackId];

      track.itemIds.push(id);
      itemsAdapter.addOne(state.items, {
        id,
        duration,
        startTime,
        trackId,
        type,
      });

      state.activeItemId = id;
    },
    moveItem: (state, action) => {
      const { itemId, fromTrackId, toTrackId } = action.payload;
      const fromTrack = state.tracks.entities[fromTrackId];
      const toTrack = state.tracks.entities[toTrackId];

      pull(fromTrack.itemIds, itemId);
      toTrack.itemIds.push(itemId);

      itemsAdapter.updateOne(state.items, {
        id: itemId,
        changes: { trackId: toTrackId },
      });
    },
    updateItem: (state, action) => {
      const { itemId, delta } = action.payload;

      const startTime = Math.max(
        0,
        state.items.entities[itemId].startTime + delta
      );

      itemsAdapter.updateOne(state.items, {
        id: itemId,
        changes: { startTime },
      });
    },
    removeItem: (state, action) => {
      const { itemId, trackId } = action.payload;
      const track = state.tracks.entities[trackId];

      pull(track.itemIds, itemId);
      itemsAdapter.removeOne(state.items, action);
      delete state.activeItemId;
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
    setActiveItemId: (state, action) => {
      state.activeItemId = action.payload;
    },
  },
});

// actions
export const {
  addItem,
  addTrack,
  moveItem,
  updateItem,
  removeItem,
  removeTrack,
  setActiveItemId,
  setActiveTrackId,
} = storyboardSlice.actions;

// selectors
export const {
  selectEntities: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemIds,
  selectTotal: selectTotalItems,
} = itemsAdapter.getSelectors((state) => state.storyboard.items);
export const {
  selectAll: selectAllTracks,
  selectById: selectTrackById,
  selectIds: selectTrackIds,
  selectTotal: selectTotalTracks,
} = tracksAdapter.getSelectors((state) => state.storyboard.tracks);

export const selectFirstTrackId = createSelector(selectTrackIds, (tracks) =>
  first(tracks)
);

export const selectLastTrackId = createSelector(selectTrackIds, (tracks) =>
  last(tracks)
);

export const selectNextTrackId = (state, trackId) => {
  const trackIds = selectTrackIds(state);
  const index = trackIds.indexOf(trackId);
  return index >= 0 ? trackIds[index + 1] : undefined;
};

export const selectPreviousTrackId = (state, trackId) => {
  const trackIds = selectTrackIds(state);
  const index = trackIds.indexOf(trackId);
  return index >= 0 ? trackIds[index - 1] : undefined;
};

export const selectCanRemoveTracks = createSelector(
  selectTotalTracks,
  (total) => total > 1
);

export const selectItemsByTrack = (state, trackId) => {
  const items = selectAllItems(state);
  const { itemIds } = selectTrackById(state, trackId);
  return itemIds.map((id) => items[id]);
};

export const selectTrackEndTime = (state, trackId) => {
  const items = selectItemsByTrack(state, trackId);
  return items.reduce((total, item) => total + item.duration, 0);
};

export const selectActiveItemId = (state) => state.storyboard.activeItemId;

export const selectActiveTrackId = createSelector(
  selectAllItems,
  selectActiveItemId,
  (items, itemId) => items[itemId]?.trackId
);

export const selectIsActive = (state, id) => {
  return selectActiveItemId(state) === id;
};

export default storyboardSlice.reducer;
