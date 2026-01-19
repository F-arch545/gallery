process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const should = chai.should();

describe('Photos', function () {
  this.timeout(20000);

  it('should respond on / GET', function (done) {
    const req = chai.request(app).get('/');

    // old dependency compatibility
    req.timeout(10000);

    req.end(function (err, res) {
      if (err) return done(err);

      res.should.have.status(200);
      res.text.should.equal('OK');
      done();
    });
  });
});
