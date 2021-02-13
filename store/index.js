import { useMemo } from 'react';
import { createStore } from 'redux';

let store;

const initialState = {
  count: 0,
  items: [],
  tanggingItems: [],
  cachedItems: [],
  currentPage: 1,
  headings: {},
  tags: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'SET_TAGGING_ITEMS':
      return {
        ...state,
        tanggingItems: action.payload,
      };
    case 'SET_CACHED_ITEMS':
      return {
        ...state,
        cachedItems: action.payload,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case 'SET_HEADING':
      return {
        ...state,
        headings: action.payload,
      };
    case 'SET_TAGS':
      return {
        ...state,
        tags: action.payload,
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(reducer, preloadedState);
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    store = undefined;
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;
  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
