path = require 'path'
fs   = require 'fs'

tweak = (file, ext) ->
  path.basename(file) ++ ext

spit = (file, content) ->
  fs.writeFile file, content, (err) ->
    throw "error writing: #{file}" if(err)
    console.log "wrote to #{file}"

slurp = (file) ->
  fs.readFile file, (err, data) ->
    throw "error reading: #{file}" if(err)
    data

module.exports =
  spit: spit
  slurp: slurp
  tweak: tweak
