var StringBuilder = require("../src/StringBuilder");
var sb = new StringBuilder();

sb.append("normal text ");

sb.appendLine();

sb.appendFormat("formatted text {0},{1}", "format 1", "format 2");

var buffer = Buffer.from([0x30, 0x31, 0x32]);

sb.appendLine()
sb.append(12)
sb.appendLine()
sb.append(1)
sb.appendLine()
sb.append(0)
sb.appendLine()
sb.appendFormat("formatted text {0},{1}", 3.6745674, 12);
sb.appendLine()
sb.appendLine(true)
sb.appendLine(false)
sb.append(buffer)
sb.appendLine()
sb.append(undefined);
sb.appendLine()
sb.append(null);
sb.appendLine()

sb.appendFormat("formatted text {0},{1}", 3.6745674, 1);

console.log("======")
console.log(sb.toString());
console.log("======")

/*
======
normal text
formatted text format 1,format 2
12
1
0
formatted text 3.6745674,12

true
false012


formatted text 3.6745674,1
======

*/
