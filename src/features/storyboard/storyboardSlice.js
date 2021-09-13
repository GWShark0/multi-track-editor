import {
  createEntityAdapter,
  createSelector,
  createSlice, // current,
} from '@reduxjs/toolkit';
import { find, first, isEmpty, last, maxBy, pick, pull, toArray } from 'lodash';
import { nanoid } from 'nanoid';

import { mapMediaToTrack } from './media';

const itemsAdapter = createEntityAdapter();
const tracksAdapter = createEntityAdapter();

const initialState = {
  items: itemsAdapter.getInitialState(),
  tracks: tracksAdapter.addMany(tracksAdapter.getInitialState(), [
    { id: nanoid(), type: 'text', itemIds: [] },
    { id: nanoid(), type: 'video', itemIds: [] },
    { id: nanoid(), type: 'audio', itemIds: [] },
  ]),
  // tracks: tracksAdapter.getInitialState(),
};

function addTrack(state, type) {
  const id = nanoid();
  tracksAdapter.addOne(state.tracks, { id, type, itemIds: [] });
  return id;
}

function findTrackIdByType(state, type) {
  return find(state.tracks.entities, ['type', type])?.id;
}

function findTrackForMediaType(state, mediaType) {
  const type = mapMediaToTrack(mediaType);
  const trackId = findTrackIdByType(state, type) || addTrack(state, type);
  return trackId;
}

function calculateTrackEndTime(state, trackId) {
  const track = state.tracks.entities[trackId];
  const { itemIds } = track;
  const items = toArray(pick(state.items.entities, itemIds));
  const lastItem = maxBy(items, 'startTime');
  return lastItem?.startTime + lastItem?.duration || 0;
}

export const storyboardSlice = createSlice({
  name: 'storyboard',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { duration, id, mediaType } = action.payload;
      let { trackId } = action.payload;

      if (!trackId) {
        trackId = findTrackForMediaType(state, mediaType);
      }

      const startTime = calculateTrackEndTime(state, trackId);

      const track = state.tracks.entities[trackId];
      track.itemIds.push(id);

      const item = { duration, id, mediaType, startTime };
      itemsAdapter.addOne(state.items, item);

      state.activeItemId = id;
    },
    moveItem: (state, action) => {
      const { itemId, fromTrackId, toTrackId } = action.payload;
      const fromTrack = state.tracks.entities[fromTrackId];
      const toTrack = state.tracks.entities[toTrackId];

      pull(fromTrack.itemIds, itemId);
      toTrack.itemIds.push(itemId);
    },
    updateItem: (state, action) => {
      const { itemId, delta } = action.payload;

      const { startTime } = state.items.entities[itemId];
      const newstartTime = Math.max(0, startTime + delta);

      itemsAdapter.updateOne(state.items, {
        id: itemId,
        changes: { startTime: newstartTime },
      });
    },
    removeItem: (state, action) => {
      const { itemId, trackId } = action.payload;
      const track = state.tracks.entities[trackId];

      pull(track.itemIds, itemId);

      if (isEmpty(track.itemIds)) {
        tracksAdapter.removeOne(state.tracks, trackId);
      }

      itemsAdapter.removeOne(state.items, itemId);
      delete state.activeItemId;
    },
    setActiveItemId: (state, action) => {
      state.activeItemId = action.payload;
    },
  },
});

// actions
export const { addItem, moveItem, updateItem, removeItem, setActiveItemId } =
  storyboardSlice.actions;

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
  const { itemIds = [] } = selectTrackById(state, trackId) || {};
  return itemIds.map((id) => items[id]);
};

export const selectTrackEndTime = (state, trackId) => {
  const items = selectItemsByTrack(state, trackId);
  const lastItem = maxBy(items, 'startTime');
  return lastItem?.startTime + lastItem?.duration || 0;
};

export const selectActiveItemId = (state) => state.storyboard.activeItemId;

function getTrackIdByItemId(tracks = [], itemId) {
  return tracks.find((track) => track.itemIds.includes(itemId))?.id;
}

export const selectActiveTrackId = createSelector(
  selectAllTracks,
  selectActiveItemId,
  getTrackIdByItemId
);

export const selectIsActive = (state, id) => {
  return selectActiveItemId(state) === id;
};

export default storyboardSlice.reducer;
