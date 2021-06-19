import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";

export default function () {
  return configureStore({
    reducer,
    middleware: [logger("console"), func], 
  });
}

store.dispatch(() => {
  store.dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
});
