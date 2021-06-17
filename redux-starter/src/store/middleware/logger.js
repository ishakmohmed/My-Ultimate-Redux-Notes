// this is a middleware

const logger = (extraParam) => (store) => (next) => (action) => {
  // should be 3 args, if 4 the first is my custom param!
  // if this is the only middleware, next will be the reducer!

  console.log("My custom argument (string named console) >>>", extraParam);

  console.log("store >>>>>>>>>>>>>", store); // looks like store object in redux, but is not the store!
  //   Object
  // dispatch: ƒ dispatch()
  // getState: ƒ f()
  // __proto__: Object
  console.log("next >>>>>>>>>>>>>>", next); // reference to next middleware function, finally it goes to the reducer!
  // ƒ e(n){return t.dispatch(y(n,c,s,e)),n}
  console.log("action >>>>>>>>>>>>", action);
  // Object;
  // payload: {
  //   name: "User 1";
  // }
  // type: "users/userAdded";
  // __proto__: Object;

  next(action);
};

export default logger;
