LiveScript  = require '../lib'
slurp       = require './base' .slurp
spit        = require './base' .spit
tweak       = require './base' .tweak

compile-es6 = ->
  files = dir \es6/test

  # console.log 'process args', process.execArgv
  unless '--harmony' in process.execArgv or '--harmony-generators' in process.execArgv
    say "Missing --harmony node option"
    return
  files = ['block_scoping.ls']

  files.forEach (file) ->
    return unless /\.ls$/i.test file
    filename = path.join \es6/test file
    code = slurp filename
    LiveScript.run code, {filename}, ->
      # write code to js file
      js-file = tweak file, '.js'
      spit js-file code
      # traceur-transpile js-file

module.exports = compile-es6