// import { createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
// import reducer from "./bugs";

// export default function configureStore() {
//   // we're returning a function to create store, so in index.js needa call this function and get the store object!

//   const store = createStore(
//     reducer,
//     devToolsEnhancer({
//       trace: true, // this returns a store enhancer function that knows how to talk to redux devtools extension with tracing enabled.
//     })
//   );
//   return store;
// }

// here's a better way to do it with redux toolkit >>>
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";

export default function () {
  return configureStore({
    // this fn will automatically set up the store to talk to redux dev tools
    reducer,
    middleware: [logger("console"), func], // if you're not using redux toolkit and you wanna apply middleware, you can also use the applyMiddleware(logger) which is a store enhancer from "redux"!
  });
}

store.dispatch(() => {
  store.dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
});
