'use strict';
let should = require('should');

describe('sign up', function () {
    it('should not sign up an user when loginname is empty', function (done) {
        request.post('/signup')
            .send({
                loginname: '',
                password: password
            })
            .expect(200, function (err, res) {
                should.not.exist(err);
                res.text.should.containEql('用户名或密码不能为空');
                done();
            });
    });
    it('should not sign up an user when it is exist', function (done) {
        request.post('/signup')
            .send({
                loginname: loginname,
                password: password
            })
            .expect(200, function (err, res) {
                should.not.exist(err);
                res.text.should.containEql('用户已经存在');
                done();
            });
    });
});