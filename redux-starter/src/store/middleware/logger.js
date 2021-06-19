const logger = (extraParam) => (store) => (next) => (action) => {
  console.log("my custom argument", extraParam);
  console.log("store", store);
  console.log("next", next);
  console.log("action", action);
  
  next(action);
};

export default logger;
