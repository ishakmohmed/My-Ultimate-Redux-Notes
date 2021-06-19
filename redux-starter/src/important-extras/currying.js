function add(a) {
  return function (b) {
    return a + b;
  };
}

// alternatively 

const add2 = (a) => (b) => a + b;

add(1)(5);
