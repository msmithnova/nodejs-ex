var server = require('../server'),
    chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should();

chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

describe('Basic routes tests', function () {

    it('GET to / should return 200', function (done) {
        chai.request(reqServer)
            .get('/')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });

    });

    it('GET to /example should return 200', function (done) {
        chai.request(reqServer)
            .get('/example')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });

    });

    it('GET to /example/pagecount should return 200', function (done) {
        chai.request(reqServer)
            .get('/example/pagecount')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });

    });

});
