console.log require("../es6/lib/grammar" .generate!
  .replace /^[^]+?var (?=parser = {)/ \exports.
  .replace /\ncase \d+:\nbreak;/g ''
  .replace /return parser;[^]+/ ''
  .replace /(:[^]+?break;)(?=\ncase \d+\1)/g \:
  .replace /(:return .+)\nbreak;/g \$1