const request = require('supertest');
let server;
const { Customer } = require('../../models/customers.model');
describe('/customers', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
    await Customer.deleteMany({});
  });
  describe('GET /', () => {
    it('should return all customers', async () => {
      await Customer.insertMany([
        { name: 'customer1', phone: '1234567890' },
        { name: 'customer2', phone: '1234567890' },
        { name: 'customer3', phone: '1234567890' },
      ]);
      const res = await request(server).get('/customers');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((c) => c.name === 'customer1')).toBeTruthy();
    });
  });
  describe('GET /:id', () => {
    it('should return customer if valid id is given', async () => {
      const customer = new Customer({
        name: 'customer 1',
        phone: '1234567890',
      });
      await customer.save();
      const res = await request(server).get(`/customers/${customer._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ name: 'customer 1' });
    });
  });
});
