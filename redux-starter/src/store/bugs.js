// THERE ARE 2 RULES YOU NEEDA FOLLOW WHEN FOLLOWING THE DUCKS PATTERN:
// 1- reducer has to be the default export
// 2- needa export individual action creators

// import { createAction, createReducer } from "@reduxjs/toolkit";

// // action creators
// export const bugAdded = createAction("bugAdded"); // { type: "bugAdded", payload: undefined }
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved");

// // reducer
// let lastId = 0;

// export default createReducer([], {
//   // arg1 is initial state
//   // key: value
//   // actions: functions (event => eventHandler)

//   [bugAdded.type]: (state, action) => {
//     // in this 2nd arg function, we can write mutating code, no more using spread operation, under the hood redux toolkit uses immer so this code is updated to immutable update pattern!
//     state.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },

//   [bugResolved.type]: (state, action) => {
//     const index = state.findIndex((bug) => bug.id === action.payload.id);
//     state[index].resolved = true;
//   },

//   [bugRemoved.type]: (state, action) => {
//     state = state.filter((bug) => bug.id !== action.payload.id);
//   },
// });

// ***************************************************
// ***************************************************

// HERE'S A BETTER WAY TO DO IT (now we're gonna combine action and reducer using createSlice()) >>>>>>>>>>
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect"; // with this function, we can create a memoized selector!

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },

    bugAdded: (state, action) => {
      // internally this function will call 2 functions, createAction and createReducer!
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state[index].resolved = true;
    },

    bugRemoved: (state, action) => {
      state = state.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

console.log("The slice is >>>", slice);
// the slice is >>>
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

export default slice.reducer; // needa export this as default object
export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
} = slice.actions; // and needa export these actions as named export

// Selector function (a function that takes a state and returns computed state) >>>
// export const getUnresolvedBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

// ^ in index.js, you'll call this function like > getUnresolvedBugs(store.getState());

// ^ but above function has a problem, because everytime i wanna getUnresolvedBugs(), although sometimes the result might be the same because the state is not changed, this function will be called everytime, so we needa memoize it using createSelector() from reselect library!

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs, // entities cause I combined bugs and projects under entities (see entities.js and then this is imported in reducer.js)
  (bugs) => bugs.filter((bug) => !bug.resolved) // now, if the list of bugs is not changed, this logic will not get executed again, cause this selector will return the result from the cache! NOT ONLY THAT, IF YOU CALL THIS FUNCTION 2 TIMES, THE RESULTING ARRAYS WILL BE EQUAL IN THE MEMORY X == Y ? will be true, this is the benefit of memoization!
);

// what if you wanna combine them? here we go >>>
// export const getUnresolvedBugs = createSelectors(
//   (state) => state.entities.bugs,
//   (state) => state.entities.projects,
//   (bugs, projects) => bugs.filter((bug) => !bug.resolved)
// );

// ^^^ this means that if the bugs and projects are not changed, this logic is not gonna be recalculated!

export const getBugsByUser = (
  userId // before createSelector, now we've got arg cause createSelector returns a function, so you can write like in this line! So in index.js, this is how you will call this function >>> getBugsByUser(1)(store.getState())
) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
