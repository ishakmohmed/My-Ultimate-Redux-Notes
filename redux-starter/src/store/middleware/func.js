// ACTUALLY YOU DON'T NEED THIS MIDDLEWARE, YOU CAN JUST USE REDUX THUNK WHICH YOU WILL GET FROM REDUX TOOLKIT!

// to check if action is a function and to call it cause you can't call functions when you dispatch an action, so I'm calling using this middleware (I mean im calling over there in dispatch method, but heres where the magic happens)!

const func = (store) => (next) => (action) => {
  if (typeof action === "function") action();
  else next(action);
};

export default func;
