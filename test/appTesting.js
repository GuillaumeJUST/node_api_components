let chai = require('chai')
    , chaiHttp = require('chai-http')
    , app = require('../app');

chai.use(chaiHttp);
let expect = chai.expect;

//Our parent block
describe('App', () => {
    const requester = chai.request.agent(app);

    describe('/GET test url', () => {
        it('it should GET success', (done) => {
            requester
                .get('/api/')
                .end((err, res) => {
                    console.log(res.body);
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.be.equal('Connected!');
                    done();
                });
        });


        it('it should GET with error', (done) => {
            requester
                .get('/api/qsdqsd')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});
