const db = require('./db');

module.exports.absolute = function (number) {
  return number >= 0 ? number : -number;
};

module.exports.greet = function (name) {
  // return 'Hello ' + name;
  return 'Hello ' + name + '!';
};

module.exports.getCurrencies = function () {
  return ['USD', 'EUR', 'AUD'];
};

module.exports.getProduct = function (productId) {
  return { id: productId, title: 'banana', price: 10 };
};

module.exports.registerUser = function (username) {
  if (!username) throw new Error('Username is required');
  return { id: new Date().getTime(), username: username };
};

module.exports.fizzBuzz = function (input) {
  if (typeof input !== 'number') throw new Error('Input should be a number');
  if (input % 3 === 0 && input % 5 === 0) return 'FizzBuzz';
  if (input % 3 === 0) return 'Fizz';
  if (input % 5 === 0) return 'Buzz';
  return input;
};

// mock function
module.exports.applyDiscount = function (order) {
  const customer = db.getCustomer(order.customerId);
  if (customer.points > 100) {
    order.totalPrice = order.price - order.price * 0.1;
  }
};
