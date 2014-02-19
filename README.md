# StringBuilder

CurrentVersion: `0.1.3`

# Installation

`npm install string-builder`


# Example

## Use In NodeJS

### Initialize string-builder

```
var sb = require("string-builder");

sb.append("normal text ");
sb.appendFormat("formatted text {0},{1}", "format 1", "format 2");

console.log(sb.toString());

//console => normal text formatted text format 1,format 2

```


# The MIT License (MIT)

Copyright © 2014 Halil İbrahim ŞAFAK

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/hibrahimsafak/stringbuilder/trend.png)](https://bitdeli.com/free "Bitdeli Badge")