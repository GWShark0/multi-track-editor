import { createVideoItem } from './media';
import reducer, {
  addItem,
  addTrack,
  moveItem,
  removeItem,
  removeTrack,
  selectActiveId,
  selectIsActive,
  selectLastTrackId,
  setActiveId,
} from './storyboardSlice';

it('should return the initial state', () => {
  const state = reducer(undefined, {});
  expect(state.items).toEqual({ entities: {}, ids: [] });
  expect(state.tracks.ids).toHaveLength(1);
  expect(state.tracks.entities[state.tracks.ids[0]]).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      itemIds: [],
    })
  );
});

it('should add a track', () => {
  const state = reducer(undefined, addTrack());
  expect(state.tracks.ids).toHaveLength(2);
  expect(state.tracks.entities[state.tracks.ids[1]]).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      itemIds: [],
    })
  );
});

it('should remove a track', () => {
  const previousState = {
    items: { ids: [], entities: {} },
    tracks: {
      ids: ['trackA'],
      entities: {
        trackA: {
          id: 'trackA',
          itemIds: [],
        },
      },
    },
  };
  expect(reducer(previousState, removeTrack('trackA'))).toEqual({
    items: { ids: [], entities: {} },
    tracks: { ids: [], entities: {} },
  });
});

it('should add an item', () => {
  const previousState = {
    items: { ids: [], entities: {} },
    tracks: {
      ids: ['trackA'],
      entities: {
        trackA: {
          id: 'trackA',
          itemIds: [],
        },
      },
    },
  };
  const state = reducer(previousState, addItem(createVideoItem('trackA')));
  expect(state.items.ids).toHaveLength(1);
  expect(state.items.entities[state.items.ids[0]]).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      trackId: 'trackA',
      type: 'video',
    })
  );
  expect(state.tracks.entities['trackA'].itemIds).toHaveLength(1);
  expect(state.activeId).toBe(state.items.ids[0]);
});

it('should remove an item', () => {
  const previousState = {
    items: {
      ids: ['itemA'],
      entities: {
        itemA: {
          id: 'itemA',
          trackId: 'trackA',
          type: 'video',
        },
      },
    },
    tracks: {
      ids: ['trackA'],
      entities: {
        trackA: {
          id: 'trackA',
          itemIds: ['itemA'],
        },
      },
    },
    activeId: 'itemA',
  };
  const state = reducer(previousState, removeItem('itemA'));
  expect(state.items).toEqual({ entities: {}, ids: [] });
  expect(state.tracks.entities['trackA'].itemIds).toHaveLength(0);
  expect(state.activeId).toBeUndefined();
});

it('should set active item', () => {
  expect(reducer({}, setActiveId('testId'))).toEqual({ activeId: 'testId' });
});

it('should select last track id', () => {
  expect(
    selectLastTrackId({
      storyboard: {
        tracks: {
          ids: ['trackA', 'trackB', 'trackC'],
        },
      },
    })
  ).toBe('trackC');
});

it('should select active id', () => {
  expect(
    selectActiveId({
      storyboard: {
        activeId: 'trackA',
      },
    })
  ).toBe('trackA');
});

it('should determine if id is active', () => {
  const state = {
    storyboard: {
      activeId: 'trackA',
    },
  };
  expect(selectIsActive(state, 'trackA')).toBe(true);
  expect(selectIsActive(state, 'trackB')).toBe(false);
});

it('should move an item', () => {
  const previousState = {
    items: {
      ids: ['itemA'],
      entities: {
        itemA: {
          id: 'itemA',
          trackId: 'trackA',
          type: 'video',
        },
      },
    },
    tracks: {
      ids: ['trackA', 'trackB'],
      entities: {
        trackA: {
          id: 'trackA',
          itemIds: ['itemA'],
        },
        trackB: {
          id: 'trackB',
          itemIds: [],
        },
      },
    },
    activeId: 'itemA',
  };
  const state = reducer(
    previousState,
    moveItem({ id: 'itemA', trackId: 'trackB' })
  );

  expect(state.items.entities.itemA.trackId).toBe('trackB');
  expect(state.tracks.entities).toEqual({
    trackA: {
      id: 'trackA',
      itemIds: [],
    },
    trackB: {
      id: 'trackB',
      itemIds: ['itemA'],
    },
  });
  expect(state.activeId).toBe('itemA');
});

it('should move an item to a track that already has an item', () => {
  const previousState = {
    items: {
      ids: ['itemA', 'itemB'],
      entities: {
        itemA: {
          id: 'itemA',
          trackId: 'trackA',
          type: 'video',
        },
        itemB: {
          id: 'itemB',
          trackId: 'trackB',
          type: 'video',
        },
      },
    },
    tracks: {
      ids: ['trackA', 'trackB'],
      entities: {
        trackA: {
          id: 'trackA',
          itemIds: ['itemA'],
        },
        trackB: {
          id: 'trackB',
          itemIds: ['itemB'],
        },
      },
    },
    activeId: 'itemA',
  };
  const state = reducer(
    previousState,
    moveItem({ id: 'itemA', trackId: 'trackB' })
  );

  // console.log(JSON.stringify(state, null, 2));
});
