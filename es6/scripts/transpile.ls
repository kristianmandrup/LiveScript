LiveScript  = require '../es6'
slurp       = require './base' .slurp
spit        = require './base' .spit
tweak       = require './base' .tweak

path            = require 'path'
compile-es6     = require './compile'

function traceur-transpile file-path
  source      = slurp filePath
  traceur     = require 'node-traceur'
  reporter    = new traceur.util.MutedErrorReporter()
  source-file = new traceur.syntax.SourceFile file-path, source
  tree        = traceur.codegeneration.Compiler.compileFile reporter, source-file, file-path
  TreeWriter  = traceur.outputgeneration.TreeWriter
  javascript  = TreeWriter.write tree, false

  transpiled-file = tweak file-path, '-es5.js'
  write-file transpiled-file, javascript

function transpile-es6
  compile-es6!
  files = dir \es6/test/

  # console.log 'process args', process.execArgv
  unless '--harmony' in process.execArgv or '--harmony-generators' in process.execArgv
    say "Missing --harmony node option"
    return

  files = ['block_scoping.ls'] # hard coded to only run block_scoping test for now

  for each file in files
    js-file = tweak file, '.js'
    filename = path.join \es6/test js-file
    transpile-traceur filename

module.exports = transpile-es6