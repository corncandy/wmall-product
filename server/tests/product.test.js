import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## Product APIs', () => {
  let product = {
    name: 'Product1',
    description: 'Description1',
    price: 100,
    picture: 'Picture1'
  };

  describe('# POST /api/products', () => {
    it('should create a new product', (done) => {
      request(app)
        .post('/api/products')
        .send(product)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(product.name);
          expect(res.body.description).to.equal(product.description);
          expect(res.body.price).to.equal(product.price);
          expect(res.body.picture).to.equal(product.picture);
          product = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/products/:productId', () => {
    it('should get product details', (done) => {
      request(app)
        .get(`/api/products/${product._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(product.name);
          expect(res.body.description).to.equal(product.description);
          expect(res.body.price).to.equal(product.price);
          expect(res.body.picture).to.equal(product.picture);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when product does not exists', (done) => {
      request(app)
        .get('/api/products/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/products/:productId', () => {
    it('should update product details', (done) => {
      product.name = 'Product2';
      request(app)
        .put(`/api/products/${product._id}`)
        .send(product)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('Product2');
          expect(res.body.description).to.equal(product.description);
          expect(res.body.price).to.equal(product.price);
          expect(res.body.picture).to.equal(product.picture);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/products/', () => {
    it('should get all products', (done) => {
      request(app)
        .get('/api/products')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/products/', () => {
    it('should delete product', (done) => {
      request(app)
        .delete(`/api/products/${product._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('Product2');
          expect(res.body.description).to.equal(product.description);
          expect(res.body.price).to.equal(product.price);
          expect(res.body.picture).to.equal(product.picture);
          done();
        })
        .catch(done);
    });
  });
});
