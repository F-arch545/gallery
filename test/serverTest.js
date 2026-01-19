process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const should = chai.should();

describe('Photos', function () {
  // Keep Mocha timeout, but also enforce request timeout
  this.timeout(20000);

  it('should respond on / GET', function (done) {
    chai.request(app)
      .get('/')
      .timeout({ response: 10000, deadline: 15000 }) // 👈 prevents hanging forever
      .end(function (err, res) {
        if (err) {
          // show the actual cause instead of a dumb timeout
          console.error('Request error:', err.message);
          return done(err);
        }

        res.should.have.status(200);
        res.should.be.html;
        res.text.should.be.a('string');
        done();
      });
  });
});
