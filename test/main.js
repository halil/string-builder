var StringBuilder = require("../src/StringBuilder");
var sb = new StringBuilder();

sb.append("normal text ");

sb.appendLine();

sb.appendFormat("formatted text {0},{1}", "format 1", "format 2");

sb.appendLine()
sb.append(12)
sb.appendLine()
sb.append(1)
sb.appendLine()
sb.append(0)
sb.appendLine()
sb.appendFormat("formatted text {0},{1}", 3.6745674, 12);
sb.appendLine(true)
sb.appendFormat("formatted text {0},{1}", 3.6745674, 1);

console.log(sb.toString());

/*
console =>
normal text
formatted text format 1,format 2
12
1
0
formatted text 3.6745674,12
formatted text 3.6745674,1
*/
