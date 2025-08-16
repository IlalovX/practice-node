const request = require('supertest');
let server;
const { Enrollment } = require('../../models/enrollments.model');
const { Course } = require('../../models/courses.model');
const { Customer } = require('../../models/customers.model');
const { Category } = require('../../models/categories.model');
describe('/enrollments', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
    await Enrollment.deleteMany({});
    await Course.deleteMany({});
    await Customer.deleteMany({});
    await Category.deleteMany({});
  });
  describe('GET /', () => {
    it('should return all enrollments', async () => {
      const categories = await Category.insertMany([
        { name: 'category1' },
        { name: 'category2' },
        { name: 'category3' },
      ]);
      const [c1, c2, c3] = categories;
      const courses = await Course.insertMany([
        { name: 'course1', category: c1._id },
        { name: 'course2', category: c2._id },
        { name: 'course3', category: c3._id },
      ]);
      const customers = await Customer.insertMany([
        { name: 'customer1', phone: '1234567890' },
        { name: 'customer2', phone: '1234567890' },
        { name: 'customer3', phone: '1234567890' },
      ]);
      const [cu1, cu2, cu3] = customers;
      await Enrollment.insertMany([
        { course: courses[0]._id, customer: cu1._id },
        { course: courses[1]._id, customer: cu2._id },
        { course: courses[2]._id, customer: cu3._id },
      ]);
      const res = await request(server).get('/enrollments');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
    });
  });
  describe('GET /:id', () => {
    it('should return enrollment if valid id is given', async () => {
      const category = await Category.insertOne({ name: 'category1' });
      const course = await Course.insertOne({
        name: 'course1',
        category: category._id,
      });
      const customer = await Customer.insertOne({
        name: 'customer1',
        phone: '1234567890',
      });
      const enrollment = new Enrollment({
        course: course._id,
        customer: customer._id,
      });
      await enrollment.save();
      const res = await request(server).get(`/enrollments/${enrollment._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        course: expect.objectContaining({ name: 'course1' }),
        customer: expect.objectContaining({ name: 'customer1' }),
      });
    });
  });
});
