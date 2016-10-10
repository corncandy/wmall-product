import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## Auth', () => {
  let token;
  describe('# Get /api/auth/random-number', () => {
    it('should return unauthorized', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });

  describe('# Post /api/auth/login', () => {
    it('should return unauthorized', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({
          username: 'random',
          password: 'express'
        })
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });

  describe('# Post /api/auth/login', () => {
    it('should return OK', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({
          username: 'react',
          password: 'express'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal('react');
          token = res.body.token;
          done();
        })
        .catch(done);
    });
  });

  describe('# Get /api/auth/random-number', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .set('Authorization', `Bearer ${token}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.num).to.exist; // eslint-disable-line no-unused-expressions
          done();
        })
        .catch(done);
    });
  });
});
