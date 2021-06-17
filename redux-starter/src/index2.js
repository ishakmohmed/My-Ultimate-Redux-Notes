console.log("Hello World!");

// a higher order function takes fn as arg or returns fn or both! Example is map function. Another is setTimeout().

// use lodash compose (compose functions but read functions from right to left where the right function takes the arg) and pipe fn (same with compose but read from left to right where the left fn take the arg)

import { compose, pipe } from "lodash/fp";

let input = "     JavaScript     ";

const trim = (str) => str.trim();
// const wrapInDiv = (str) > `<div>${str}</div>`;
// const wrapInSpan = (str) => `<span>${str}</span>`;
const toLowerCase = (str) => str.toLowerCase();
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;

const transform = pipe(trim, toLowerCase, wrap("div")); // every arg to pipe function has to be a function!
console.log(transform(input)); // <div>JavaScript</div>

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// IMPORTANT RULE: DON'T MUTATE OBJECTS DIRECTLY IN REDUX!

// note: Object.assign or ... the spread operator do shallow copy (will screw you when copying nested objects)!

import { Map } from "immutable"; // this Map is immutable!

let book = Map({ title: "Harry Potter" }); // this object is a complex mess with a bunch of complex properties, so to make it a plain JavaScript object, needa book.toJS()!!!!

function publish(book) {
  return book.set("isPublished", true); // get() is available too! This is not gonna modify the original object, but it's gonna return a new object, cause we're using the immutable library!
}

book = publish(book);

console.log(book.toJS());

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// IMMUTABLEJS IS AN ENTIRE MESS, SO HERE'S A BETTER LIBRARY (IMMER) >>>
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import { produce } from "immer";

let someBook = { title: "Harry Potter" };

function publishhh(someBook) {
  // 1st arg is initial state, 2nd arg is function that specifies the mutation (also this thing copies deeply not shallow!) >>>
  return produce(someBook, (draftBook) => {
    draftBook.isPublished = true; // copy everything from 1st arg and then override/add this property. Original object is not gonna get mutated!
  });
}

someBook = publishhh(someBook);

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import store from "./store";
import { bugAdded, bugResolved } from "./actions";

console.log(store);
// store (what's interesting is that there's no method to setState, so to change the store, we needa dispatch an action) >>>
// Object
// dispatch: ƒ dispatch(action)
// getState: ƒ getState()
// replaceReducer: ƒ replaceReducer(nextReducer)
// subscribe: ƒ subscribe(listener)
// Symbol(observable): ƒ observable()
// __proto__: Object

const unsubscribe = store.subscribe(() => {
  // UI components should subscribe to the store so they get notified when the store changes!
  console.log("Store is changed!!!", store.getState());
});

store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugResolved(1));

unsubscribe();
console.log("The state is", store.getState());

store.dispatch({
  type: actions.BUG_REMOVED,
  payload: {
    id: 1,
  },
});

console.log("The state is", store.getState());
