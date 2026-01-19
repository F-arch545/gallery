process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');

chai.use(chaiHttp);

const should = chai.should();

describe('Photos', function () {
  it('should list ALL photos on / GET', function (done) {
    this.timeout(60000);

    chai.request(app)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.be.a('string');
        done();
      });
  });
});
