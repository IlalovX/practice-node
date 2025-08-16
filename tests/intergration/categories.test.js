const request = require('supertest');
let server;
const { Category } = require('../../models/categories.model');
const { Users } = require('../../models/users/users.model');
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
  describe('GET /:id', () => {
    it('should return category if valid id is given', async () => {
      const category = new Category({ name: 'category 1' });
      await category.save();
      const res = await request(server).get(`/categories/${category._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ name: 'category 1' });
    });
  });
  describe('POST /', () => {
    let token;
    let name;
    const execute = async () => {
      return await request(server)
        .post('/categories')
        .set('x-auth-token', token)
        .send({ name });
    };
    beforeEach(async () => {
      token = new Users().generateAuthToken();
      name = 'category1';
    });
    it('should return 401 if user is not logged in', async () => {
      token = '';
      const res = await execute();
      expect(res.status).toBe(401);
    });
    it('should return 400 if category is less than 3 characters', async () => {
      name = '12';
      const res = await execute();
      expect(res.status).toBe(400);
    });
    it('should return 400 if category is more than 50 characters', async () => {
      name = 'a'.repeat(51);
      const res = await execute();
      expect(res.status).toBe(400);
    });
    it('should save category if input is valid', async () => {
      await execute();
      const category = await Category.findOne({ name: 'category1' });
      expect(category).not.toBeNull();
    });
    it('should return 400 if category already exists', async () => {
      const res = await execute();
      expect(res.body).toHaveProperty('_id');
    });
  });
});
