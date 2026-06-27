# StringBuilder

[![Known Vulnerabilities](https://snyk.io/test/github/halil/StringBuilder/badge.svg?targetFile=package.json)](https://snyk.io/test/github/halil/StringBuilder?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhalil%2FStringBuilder.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhalil%2FStringBuilder?ref=badge_shield)
[![NPM](https://nodei.co/npm/string-builder.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/string-builder/)

A fast, zero-dependency string builder for Node.js. Collects string parts in an array and joins them on `toString()` — avoiding the cost of repeated string concatenation.

## Installation

```sh
npm install string-builder
```

## Usage

### CommonJS

```js
const StringBuilder = require("string-builder");

const sb = new StringBuilder();
sb.append("hello").appendLine().appendFormat("{0} {1}", "world", "!");
console.log(sb.toString());
```

### ESM

```js
import StringBuilder from "string-builder";

const sb = new StringBuilder();
sb.append("hello").appendLine().appendFormat("{0} {1}", "world", "!");
console.log(sb.toString());
```

### TypeScript

```ts
import StringBuilder from "string-builder";

const sb = new StringBuilder();
sb.append("hello").appendLine().appendFormat("{0} {1}", "world", "!");
console.log(sb.toString());
```

## API

### `new StringBuilder(value?)`

Creates a new instance. Optionally accepts an initial value.

```js
const sb = new StringBuilder("initial");
```

---

### `.append(value)` → `this`

Appends any value. `null` and `undefined` are silently ignored. Falsy values like `0`, `false`, and `""` are accepted.

```js
sb.append("text").append(42).append(false).append(Buffer.from([0x30]));
```

---

### `.appendLine(value?)` → `this`

Appends a newline (`\n` on Unix, `\r\n` on Windows), then the optional value.

```js
sb.appendLine();          // just a newline
sb.appendLine("hello");   // newline + "hello"
```

---

### `.appendFormat(template, ...args)` → `this`

Positional placeholder interpolation using `{0}`, `{1}`, ... syntax. Also supports named placeholders with an object argument. Use `{{...}}` to escape braces.

```js
// positional
sb.appendFormat("{0} + {1} = {2}", 1, 2, 3);
// → "1 + 2 = 3"

// named
sb.appendFormat("Hello, {name}!", { name: "world" });
// → "Hello, world!"

// escaped braces
sb.appendFormat("{{0}} is a placeholder", "unused");
// → "{0} is a placeholder"
```

---

### `.clear()` → `void`

Clears the internal buffer.

```js
sb.clear();
sb.toString(); // ""
```

---

### `.toString()` → `string`

Returns the accumulated string.

```js
sb.append("a").append("b").append("c").toString(); // "abc"
```

---

## Chaining

All methods except `clear()` return `this`, so calls can be chained:

```js
const result = new StringBuilder()
  .append("name: ")
  .appendFormat("{0}", "Alice")
  .appendLine()
  .append("done")
  .toString();
```

## License

MIT © 2014 Halil İbrahim ŞAFAK

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhalil%2FStringBuilder.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhalil%2FStringBuilder?ref=badge_large)
