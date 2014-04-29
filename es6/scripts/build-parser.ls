#!/usr/bin/env node

result = require("../lib/grammar").generate!
  .replace /^[^]+?var (?=parser = {)/ \exports.
  .replace /\ncase \d+:\nbreak;/g ''
  .replace /return parser;[^]+/ ''
  .replace /(:[^]+?break;)(?=\ncase \d+\1)/g \:
  .replace /(:return .+)\nbreak;/g \$1

console.log result