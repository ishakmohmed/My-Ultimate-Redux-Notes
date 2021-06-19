import { compose, pipe } from "lodash/fp";

let input = "     JavaScript     ";

const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;

const transform = pipe(trim, toLowerCase, wrap("div")); 
console.log(transform(input)); 

import { Map } from "immutable";

let book = Map({ title: "Harry Potter" });

function publish(book) {
  return book.set("isPublished", true); 
}

book = publish(book);

console.log(book.toJS());

import { produce } from "immer";

let someBook = { title: "Harry Potter" };

function publishhh(someBook) {
  return produce(someBook, (draftBook) => {
    draftBook.isPublished = true; 
  });
}

someBook = publishhh(someBook);

import store from "./store";
import { bugAdded, bugResolved } from "./actions";

console.log(store);

const unsubscribe = store.subscribe(() => {
  console.log("Store is changed!", store.getState());
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
