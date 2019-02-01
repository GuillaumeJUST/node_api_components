let Todo = require('./todo');

let chai = require('chai')
    , chaiHttp = require('chai-http')
    , app = require('../../app');

chai.use(chaiHttp);
let expect = chai.expect;

//Our parent block
describe('Todos', () => {
    const requester = chai.request.agent(app);
    beforeEach((done) => { //Before each test we empty the database
        Todo.deleteMany({}, (err) => {
            expect(err).to.be.null;
            done();
        });
    });

    describe('/GET todos', () => {
        it('it should GET empty todos', (done) => {
            requester
                .get('/api/todos')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.be.true;
                    expect(res.body.todos).to.be.a('array');
                    done();
                });
        });


        it('it should GET with error', (done) => {
            requester
                .get('/api/todos')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.be.true;
                    done();
                });
        });
    });

    describe('/Post todo', () => {
        it('it should Post a new todo', (done) => {
            requester
                .post('/api/todos')
                .send({name: 'test new todo'})
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.be.true;
                    expect(res.body.error).undefined;
                    expect(res.body.todo).exist;
                    expect(res.body.todo.name).is.equal('test new todo');
                    done();
                });
        });

        it('it should Post with error', (done) => {
            requester
                .post('/api/todos')
                .send()
                .then(function (res) {
                    expect(res).to.have.status(405);
                    expect(res.body.status).to.be.false;
                    done();
                });
        });
    });
});
