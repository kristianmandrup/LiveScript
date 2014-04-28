# LiveScript
is a language which compiles to JavaScript. It has a straightforward mapping to JavaScript and allows you to write expressive code devoid of repetitive boilerplate. While LiveScript adds many features to assist in functional style programming, it also has many improvements for object oriented and imperative programming.

Check out **[livescript.net](http://livescript.net)** for more information, examples, usage, and a language reference.

### Build Status
[![Build Status](https://travis-ci.org/gkz/LiveScript.png?branch=master)](https://travis-ci.org/gkz/LiveScript)

### Install
Have Node.js installed. `sudo npm install -g LiveScript`

After, run `livescript` for more information.

### Source
[git://github.com/gkz/LiveScript.git](git://github.com/gkz/LiveScript.git)

## ES6 and harmony

This branch merges the *generators* branch with master.
`package.json` exposes `test-harmony` which runs tests in `node --harmony` mode.
The *generators* branch contains a generators test which will pass when run on a `node` version which support generators.

This branch aims to further support ES6 syntax by leveraging *traceur*, which compiles ES6 code to ES5 compatible code so it
can be run in ES5 javascript environments.

See [wiki](https://github.com/kristianmandrup/LiveScript/wiki) for more info.

For LiveScript in general:

The `src` folder contains all the source files which make up the LiveScript lexer and parser.
The `lib` folder contains the compiled javascript files for all the ls files in the source folder `src`

The experimental LiveScript for ES6 lives in the `es6` folder so as to be isolated and not to be "intrusive" to the rest of
the LiveScript project.

### Compile src files

Run the following, which watches, compiles and outputs ls files from `es6/src` and outputs compiles js files in `es6/lib`

`lsc -wco es6/lib es6/src`

## Script tasks

To add additional script tasks, edit the `scripts:` part of `package.json.ls`, then compile it with `lsc`

`lsc package.json.ls > package.json`

### Make file

The core script logic should be placed in the`scripts` folder.
LiveScript ES6 scripts are placed in `es6/scripts`.

To compile the executable scripts

`./bin/lsc -wcxo es6/scripts es6/scripts`

Notice the use of the new `-x` option to generate an executable js file ;)

## Customizing command and options

Add a new option to `options.ls`. Make changes in `command.ls`. Use `say` for debugging...
Compile:

`lsc -co lib src`

`./bin/lsc ...` to test. Make sure you have at least one positional argument unless you want to enter *stdin* mode
See [optionator](https://www.npmjs.org/package/optionator) for details on options parsing.

### Build parser

When the es6/src and es6/scripts have been compiled, you are ready to build:

`make build-es6`

## Node scripts

The `package.json` have the following new scripts

- compile-es6 (compile test files to es6 syntax)
- transpile-es6 (transpile test files to es5 by first compiling to es6 syntax)
- test-es6 (runs es6 tests by first transpiling)

Note: Each of these tasks are currently hardcoded (in the scripts) to only operate on `block_scoping.ls`
