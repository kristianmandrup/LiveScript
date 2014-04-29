path = require 'path'
fs   = require 'fs'

tweak = (file, ext) ->
  path.basename(file) ++ ext

spit = (file, content) ->
  fs.writeFile file, content, (err) ->
    throw "error writing: #{file}" if(err)
    console.log "wrote to #{file}"

slurp = (file) ->
  var content
  read-content file, ((err, data) -> content = data)
  content

!function read-content file, cb
  fs.readFile file, (err, data) ->
    cb err if err
    cb null, data

module.exports =
  spit: spit
  slurp: slurp
  tweak: tweak
