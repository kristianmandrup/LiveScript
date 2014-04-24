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
The main `src` folder is for LiveScript that is *ES5* compatible.
The sub-folder `src/es6` contains the source files for *ES6* (harmony) LiveScript, currently under development.

The `lib` folder contains the compiled javascript files for all the ls files in the source folder `src` including for ES6
which are compiled to `lib/es6`.

In order to change the src files and have them reflected in lib:
Run the following, which watches, compiles and outputs ls files from `src` and outputs compiles js files in `lib`

`lsc -wco lib src`

To build the ES6 "experimental" parser run:

`$ slake build-es6:parser`

See the `Slakefile`. Tasks have been added for ES6 that target the es6 specific source and destination folders

`slake` is a simplified version of [Make](http://www.gnu.org/software/make/)
([Rake](http://rake.rubyforge.org/), [Jake](http://github.com/280north/jake)) for LiveScript.

See the `lib/slake.js` file.

More slake utils:

- [node-slake-lsc](https://github.com/ppvg/node-slake-lsc)
- [slake-build-utils](https://www.npmjs.org/package/slake-build-utils)
- [node-slake-mocha](https://github.com/ppvg/node-slake-mocha)

The tests can all be found in the `test` folder. Tests for ES6 are in the sub-folder `test/es6`.

`$ node --harmony lib/slake.js test-es6`
