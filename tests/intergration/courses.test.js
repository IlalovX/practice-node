const request = require('supertest');
let server;
const { Course } = require('../../models/courses.model');
const { Category } = require('../../models/categories.model');
describe('/courses', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
    await Course.deleteMany({});
    await Category.deleteMany({});
  });
  describe('GET /', () => {
    it('should return all courses', async () => {
      const categories = await Category.insertMany([
        { name: 'category1' },
        { name: 'category2' },
        { name: 'category3' },
      ]);
      const [c1, c2, c3] = categories;
      await Course.insertMany([
        { name: 'course 1', category: c1._id, trainer: 'T1', status: 'Active' },
        {
          name: 'course 2',
          category: c2._id,
          trainer: 'T2',
          status: 'Inactive',
        },
        { name: 'course 3', category: c3._id, trainer: 'T3', status: 'Active' },
      ]);
      const res = await request(server).get('/courses');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((c) => c.name === 'course 1')).toBeTruthy();
    });
  });
  describe('GET /:id', () => {
    it('should return course if valid id is given', async () => {
      const category = new Category({ name: 'category 1' });
      await category.save();
      const course = new Course({ name: 'course 1', category: category._id });
      await course.save();
    });
  });
});
