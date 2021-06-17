// currying => function with single parameter

function add(a) {
  return function (b) {
    return a + b;
  };
}

// another way to write that ^ >>>
const add2 = (a) => (b) => a + b;

add(1)(5);
