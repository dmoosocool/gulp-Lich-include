# gulp-lich-include
[![diaozhatian](http://progressed.io/bar/100?title=%E5%B1%8C%E7%82%B8%E5%A4%A9)](http://github.com/dmoosocool/gulp-Lich-include)
[![npm version](https://badge.fury.io/js/gulp-lich-include.svg)](https://badge.fury.io/js/gulp-lich-include)
[![GitHub version](https://badge.fury.io/gh/dmoosocool%2Fgulp-lich-include.svg)](https://badge.fury.io/gh/dmoosocool%2Fgulp-lich-include)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Build Status](https://travis-ci.org/dmoosocool/gulp-Lich-include.svg?branch=master)](https://travis-ci.org/dmoosocool/gulp-Lich-include)
[![Coverage Status](https://coveralls.io/repos/github/dmoosocool/gulp-Lich-include/badge.svg?branch=master)](https://coveralls.io/github/dmoosocool/gulp-Lich-include?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/dmoosocool/gulp-Lich-include/badges/dependencies.svg)](https://www.bithound.io/github/dmoosocool/gulp-Lich-include/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/dmoosocool/gulp-Lich-include/badges/devDependencies.svg)](https://www.bithound.io/github/dmoosocool/gulp-Lich-include/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/dmoosocool/gulp-Lich-include/badges/code.svg)](https://www.bithound.io/github/dmoosocool/gulp-Lich-include)
[![Analytics](https://ga-beacon.appspot.com/UA-105257469-1/gulp-lich-include)](https://github.com/dmoosocool/gulp-Lich-include)
[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

```
Lich.js dynamic include static resource gulpjs plugin.
```
# Instructions.
## Define a config file. Like `Lich.rules.config.js`

```javascript
module.exports = {
    // developer directory.
    dev_dir: path.resolve(__dirname, 'src'),

    // template extension.
    tplExtension: '.swig',

    // javascript extension.
    jsExtension: '.js',

    // css extension.
    cssExtension: '.css',

    // command name.
    command: 'Lich',

    // declare rules.
    rules: {
        commonScripts: [{
            type: 'js-local',
            list: [
                'js/test.rule',
                'js/test1.rule'
            ]
        }, {
            type: 'js-npm',
            list: [
                'jquery/dist/jquery.min'
            ]
        }],
        commonStyles: [{
            type: 'css-local',
            list: [
                'css/test1',
                'css/test2'
            ]
        }, {
            type: 'css-npm',
            list: [
                'animate.css/animate'
            ]
        }]
    }
};
```

## Local javascript include.
```HTML
<!--Lich js-local="path/to/script" -->
<!--Lich js-local="path/to/script,path/to/other" -->
```

## Npm javascript include.
```HTML
<!-- Lich js-npm="path/tp/script"-->
<!-- Lich js-npm="path/to/script,path/to/other"-->
```

## Local style include.
```HTML
<!--Lich css-local="path/to/style" -->
<!--Lich css-local="path/to/style,path/to/other" -->
```

## Template include.
```HTML
<!--Lich tpl="path/to/tpl"-->
```

## Rule include.
```HTML
<!--Lich rule="rule"-->
```