const { Users } = require('./users.model');
const jwt = require('jsonwebtoken');

describe('users.generateAuthToken', () => {
  beforeAll(() => {
    require('../../startup/config')();
  });
  it('should return a valid JWT', () => {
    const user = new Users({ isAdmin: true });
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    expect(decoded).toMatchObject({ isAdmin: true });
  });
});
