module.exports.getCustomer = function (id) {
  console.log('Reading a customer from the database...');
  return { id: id, points: 107 };
};
