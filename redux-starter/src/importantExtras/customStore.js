import reducer from "./reducer";

// this is my custom store, don't worry about it!

function createStore(reducer) {
  let state;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    // 1- call the reducer to get the new state
    // 2- notify the subscribers
    state = reducer(state, action);

    for (i = 0; i < listeners.length; i++) listeners[i]();
  }

  function getState() {
    return state;
  }

  return {
    subcsribe,
    dispatch,
    getState,
  };
}

export default createStore(reducer);
