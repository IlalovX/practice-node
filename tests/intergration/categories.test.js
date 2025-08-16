const request = require('supertest');
let server;
const { Category } = require('../../models/categories.model');
describe('/categories', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
    await Category.deleteMany({});
  });
  describe('GET /', () => {
    it('should return all categories', async () => {
      await Category.insertMany([
        { name: 'category1' },
        { name: 'category2' },
        { name: 'category3' },
      ]);
      const res = await request(server).get('/categories');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((c) => c.name === 'category1')).toBeTruthy();
    });
  });
});
