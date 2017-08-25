'use strict';
require('should');
var analysis = require('../utils/analysis'),
    fs = require('fs'),
    File = require('vinyl'),
    path = require('path');

const TEST_DIR = path.join(process.cwd(), 'test');
var config = require('./Lich.rules.config');

describe('Analysis test include js-local.', function () {
    it('Test include single js-local', function () {
        let tmpPath = path.join(TEST_DIR, 'test-js-local/test-local1.html'),
            LichAnalysis = new analysis(config, {}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file);

        result.should.eql('<script src="../src/js/test.js" type="text/javascript"></script>');
    });

    it('Test include multiple js-local', function () {
        let tmpPath = path.join(TEST_DIR, 'test-js-local/test-local2.html'),
            LichAnalysis = new analysis(config, {}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file),
            successResult = `<script src="../src/js/test.js" type="text/javascript"></script>
<script src="../src/js/test1.js" type="text/javascript"></script>
<script src="../src/js/test2.js" type="text/javascript"></script>`;
        result.should.eql(successResult);
    });
});

describe('Analysis test include js-npm.', function () {
    it('Test include single js-npm', function () {
        let tmpPath = path.join(TEST_DIR, 'test-js-npm/test-npm1.html'),
            LichAnalysis = new analysis(config, {}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file);
        result.should.eql('<script src="../../node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>');
    });

    it('Test include multiple js-npm', function () {
        let tmpPath = path.join(TEST_DIR, 'test-js-npm/test-npm2.html'),
            LichAnalysis = new analysis(config, {}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file),
            successResult = `<script src="../../node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
<script src="../../node_modules/lodash/lodash.min.js" type="text/javascript"></script>`;
        result.should.eql(successResult);
    });
});

describe('Analysis test include css-local.', function () {
    it('Test include single css-local', function () {
        let tmpPath = path.join(TEST_DIR, 'test-css-local/test-local1.html'),
            LichAnalysis = new analysis(config, {}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file);
        result.should.eql('<link rel="stylesheet" href="../src/css/test1.css"/>');
    });

    it('Test include multiple css-local', function () {
        let tmpPath = path.join(TEST_DIR, 'test-css-local/test-local2.html'),
            LichAnalysis = new analysis(config, {}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file),
            successResult = `<link rel="stylesheet" href="../src/css/test1.css"/>
<link rel="stylesheet" href="../src/css/dmoo.css"/>`;
        result.should.eql(successResult);
    });
});

describe('Analysis test include tpl.', function () {
    it('Test include single tpl', function () {
        let tmpPath = path.join(TEST_DIR, 'test-tpl/test1.html'),
            LichAnalysis = new analysis(config, {}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file);
        result.should.eql('<h1>hello, this is template\'s content.</h1>');
    });

    it('Test include multiple tpl', function () {
        let tmpPath = path.join(TEST_DIR, 'test-tpl/test2.html'),
            LichAnalysis = new analysis(config, {}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file),
            successResult = `<h1>hello, this is template's content.</h1>
<h2>hello, this is test2 template content.</h2>`;
        result.should.eql(successResult);
    });
});

describe('Analysis test include rule.', function () {
    it('Test include single rule', function () {
        let tmpPath = path.join(TEST_DIR, 'test-rule/test1.html'),
            LichAnalysis = new analysis(config, {}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file),
            successResult = `<script src="../src/js/test.rule.js" type="text/javascript"></script>
<script src="../src/js/test1.rule.js" type="text/javascript"></script>
<script src="../../node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>`;
        result.should.eql(successResult);
    });

    it('Test include multiple rule', function () {
        let tmpPath = path.join(TEST_DIR, 'test-rule/test2.html'),
            LichAnalysis = new analysis(config, {}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file),
            successResult = `<script src="../src/js/test.rule.js" type="text/javascript"></script>
<script src="../src/js/test1.rule.js" type="text/javascript"></script>
<script src="../../node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="../src/css/test1.css"/>
<link rel="stylesheet" href="../src/css/test2.css"/>
<link rel="stylesheet" href="../../node_modules/animate.css/animate.css"/>`;
        result.should.eql(successResult);
    });
});

describe('Analysis test full.', function () {
    it('Test a full use case', function () {
        let tmpPath = path.join(TEST_DIR, 'src/test.html'),
            LichAnalysis = new analysis(config, {env: 'test', name: 'anjo'}),
            file = new File({
                path: tmpPath,
                contents: fs.readFileSync(tmpPath)
            }),
            result = LichAnalysis.execute(file),
            successResult = `<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/test1.css"/>
    <link rel="stylesheet" href="css/anjo.css"/>
    <link rel="stylesheet" href="../../node_modules/animate.css/animate.css"/>
</head>
<body>

<h1>hello, this is template's content.</h1>
<h2>hello, this is test2 template content.</h2>
<script src="js/test.rule.js" type="text/javascript"></script>
<script src="js/test1.rule.js" type="text/javascript"></script>
<script src="../../node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
<script src="../../node_modules/lodash/lodash.min.js" type="text/javascript"></script>
<script src="js/test.js" type="text/javascript"></script>
<script src="js/test1.js" type="text/javascript"></script>
</body>
</html>`;
        result.should.eql(successResult);
    });
});