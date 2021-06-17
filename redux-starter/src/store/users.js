import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name, // this is how I called this one: store.dispatch(userAdded({ name: "User 1" }));
      });
    },
  },
});

// the slice is (i took it from bugs file) >>>
// actions:
//  bugAdded: ƒ ()
//  bugRemoved: ƒ ()
//  bugResolved: ƒ ()
// __proto__: Object
// caseReducers:
// bugAdded: (state, action) => {…}
// bugRemoved: (state, action) => {…}
// bugResolved: (state, action) => {…}
// __proto__: Object
// name: "bugs"
// reducer: ƒ (state, action)
// arguments: (...)
// caller: (...)
// length: 2
// name: ""
// prototype: {constructor: ƒ}
// __proto__: ƒ ()

export default slice.reducer;
export const { userAdded } = slice.actions;
