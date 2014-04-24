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

This branch aims to further support ES6 syntax by leveraging the traceur transpiler, which compiles ES6 code to ES5 compatible code so it
can be run in ES5 javascript environments.

See [wiki](https://github.com/kristianmandrup/LiveScript/wiki) for more info.

The `src` folder contains all the source files which make up the LiveScript lexer and parser.
The `lib` folder contains the compiled javascript files for all the ls files in the source folder `src`

### Compile src files

Run the following, which watches, compiles and outputs ls files from `src` and outputs compiles js files in `lib`

`lsc -wco lib src`

### Build ES6 parser

To build the ES6 "experimental" parser run:

`$ slake build-es6:parser`

### Slake file

`slake` is a simplified version of [Make](http://www.gnu.org/software/make/)
([Rake](http://rake.rubyforge.org/), [Jake](http://github.com/280north/jake)) for LiveScript.


Tasks have been added to the `Slakefile` for ES6. These tasks target the es6 specific source and destination folders.

- compile-es6

See the `lib/slake.js` file.

More slake utils:

- [node-slake-lsc](https://github.com/ppvg/node-slake-lsc)
- [slake-build-utils](https://www.npmjs.org/package/slake-build-utils)
- [node-slake-mocha](https://github.com/ppvg/node-slake-mocha)

The tests can all be found in the `test` folder. Tests for ES6 are in the sub-folder `test/es6`.

`$ node --harmony lib/slake.js test-es6`

## Node scripts

The package.json have the following new scripts
- compile-es6 (compile test files to es6 syntax)
- transpile-es6 (transpile test files to es5 by first compiling to es6 syntax)
- test-es6 (runs es6 tests by first transpiling)

Note that each of these are currently hardcoded to only operate on `block_scoping.ls`


```LieScript
# Slakefile

files = ['es6/block_scoping.ls'] # hard coded to only run block_scoping test for now
```