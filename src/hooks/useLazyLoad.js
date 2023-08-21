import { useEffect, useReducer, useCallback } from 'react';
import debounce from 'lodash/debounce';

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 500;

const reducer = (state, action) => {
  switch (action.type) {
    case 'set': {
      return {
        ...state,
        ...action.payload
      };
    }
    case 'onGrabData': {
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload.data],
        currentPage: state.currentPage + 1
      };
    }
    case 'resetData': {
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload.data],
        currentPage: state.currentPage + 1
      };
    }
    default:
      return state;
  }
};

const useLazyLoad = ({
  triggerRef,
  onGrabData,
  resetLazy,
  resetData,
  options
}) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    currentPage: 1,
    data: []
  });

  /**
   * Load Data On Scroll Handler
   */
  const _handleEntry = async entry => {
    const boundingRect = entry.boundingClientRect;
    const { intersectionRect } = entry;

    if (
      !state.loading &&
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
    ) {
      dispatch({ type: 'set', payload: { loading: true } });
      const data = await onGrabData(state.currentPage);
      dispatch({ type: 'onGrabData', payload: { data } });
    }
  };
  const handleEntry = debounce(_handleEntry, LOAD_DELAY_MS);

  const onIntersect = useCallback(
    entries => {
      handleEntry(entries[0]);
    },
    [handleEntry]
  );

  /**
   * Reset Data Handler
   */
  const _handleReset = async () => {
    if (!state.loading) {
      const currentPage = 1;
      dispatch({
        type: 'set',
        payload: { loading: true, currentPage, data: [] }
      });
      const data = await onGrabData(currentPage);
      dispatch({ type: 'onGrabData', payload: { data } });
    }
  };

  useEffect(() => {
    // Call Reset func
    if (resetLazy) {
      _handleReset();
      return () => {};
    }

    // Reset Data
    if (resetData) {
      dispatch({
        type: 'set',
        payload: { loading: false, currentPage: 1, data: [] }
      });
      return () => {};
    }

    // Trigger func with IntersectionObserver
    if (triggerRef.current) {
      const container = triggerRef.current;
      const observer = new IntersectionObserver(onIntersect, options);
      observer.observe(container);
      return () => observer.disconnect();
    }

    return () => {};
  }, [triggerRef, onIntersect, resetLazy, resetData, options]);

  return state;
};

export default useLazyLoad;
