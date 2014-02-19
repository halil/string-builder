var sb = require("../src/StringBuilder");

sb.append("normal text ");
sb.appendFormat("formatted text {0},{1}", "format 1", "format 2");

console.log(sb.toString());

//console => normal text formatted text format 1,format 2