#!/usr/bin/env node

// Generated by LiveScript 1.2.0
(function(){
  var optionator;
  optionator = require('optionator');
  module.exports = optionator({
    prepend: 'Usage: lsc [option]... [file]...\n\nUse \'lsc\' with no options to start REPL.',
    append: 'Version {{version}}\n<http://livescript.net/>',
    helpStyle: {
      maxPadFactor: 1.9
    },
    options: [
      {
        heading: 'Misc'
      }, {
        option: 'version',
        alias: 'v',
        type: 'Boolean',
        description: 'display version'
      }, {
        option: 'help',
        alias: 'h',
        type: 'Boolean',
        description: 'display this help message'
      }, {
        option: 'compile',
        alias: 'c',
        type: 'Boolean',
        description: 'compile to JavaScript and save as .js files'
      }, {
        option: 'eval',
        alias: 'e',
        type: 'code::String',
        description: 'pass as string from the command line as input'
      }, {
        option: 'prelude',
        alias: 'd',
        type: 'Boolean',
        description: 'automatically import prelude.ls in REPL'
      }, {
        option: 'stdin',
        alias: 's',
        type: 'Boolean',
        description: 'read stdin'
      }, {
        option: 'json',
        alias: 'j',
        type: 'Boolean',
        description: 'print/compile as JSON'
      }, {
        option: 'nodejs',
        alias: 'n',
        type: 'Boolean',
        description: 'pass options after this through to the \'node\' binary',
        restPositional: true
      }, {
        option: 'watch',
        alias: 'w',
        type: 'Boolean',
        description: 'watch scripts for changes, and repeat'
      }, {
        option: 'const',
        type: 'Boolean',
        description: 'compile all variables as constants'
      }, {
        heading: 'Output control'
      }, {
        option: 'output',
        alias: 'o',
        type: 'path::String',
        description: 'compile into the specified directory'
      }, {
        option: 'print',
        alias: 'p',
        type: 'Boolean',
        description: 'print the result to stdout'
      }, {
        option: 'bare',
        alias: 'b',
        type: 'Boolean',
        description: 'compile without the top-level function wrapper'
      }, {
        option: 'header',
        type: 'Boolean',
        description: 'add "Generated by" header, \'--no-header\' to suppress',
        'default': 'true'
      }, {
        option: 'lex',
        alias: 'l',
        type: 'Boolean',
        description: 'print the tokens the lexer produces'
      }, {
        option: 'tokens',
        alias: 't',
        type: 'Boolean',
        description: 'print the tokens the rewriter produces'
      }, {
        option: 'ast',
        alias: 'a',
        type: 'Boolean',
        description: 'print the syntax tree the parser produces'
      }
    ]
  });
}).call(this);
