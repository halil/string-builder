# StringBuilder

[![Known Vulnerabilities](https://snyk.io/test/github/halil/StringBuilder/badge.svg?targetFile=package.json)](https://snyk.io/test/github/halil/StringBuilder?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhalil%2FStringBuilder.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhalil%2FStringBuilder?ref=badge_shield)
[![NPM](https://nodei.co/npm/string-builder.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/string-builder/)

A fast, zero-dependency string builder for Node.js. Collects string parts in an array and joins them on `toString()` — avoiding the cost of repeated string concatenation.

## Installation

```sh
npm install string-builder
```

## Import

### CommonJS

```js
const StringBuilder = require("string-builder");
```

### ESM

```js
import StringBuilder from "string-builder";
```

### TypeScript

```ts
import StringBuilder from "string-builder";
```

---

## Examples

### Building a plain text report

```js
const StringBuilder = require("string-builder");

const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob",   role: "editor" },
  { name: "Carol", role: "viewer" },
];

const sb = new StringBuilder("User Report")
  .appendLine()
  .appendLine("============");

for (const user of users) {
  sb.appendFormat("- {name} ({role})", user).appendLine();
}

sb.appendLine("============")
  .appendFormat("Total: {0} users", users.length);

console.log(sb.toString());
// User Report
// ============
// - Alice (admin)
// - Bob (editor)
// - Carol (viewer)
// ============
// Total: 3 users
```

---

### Building an HTML string

```js
const sb = new StringBuilder();

const items = ["Home", "About", "Contact"];

sb.append("<ul>").appendLine();

for (const item of items) {
  sb.appendFormat('  <li>{0}</li>', item).appendLine();
}

sb.append("</ul>");

console.log(sb.toString());
// <ul>
//   <li>Home</li>
//   <li>About</li>
//   <li>Contact</li>
// </ul>
```

---

### Building a CSV

```js
const rows = [
  { id: 1, name: "Alice", score: 95.5 },
  { id: 2, name: "Bob",   score: 87.0 },
  { id: 3, name: "Carol", score: 91.3 },
];

const sb = new StringBuilder("id,name,score").appendLine();

for (const row of rows) {
  sb.appendFormat("{id},{name},{score}", row).appendLine();
}

console.log(sb.toString());
// id,name,score
// 1,Alice,95.5
// 2,Bob,87
// 3,Carol,91.3
```

---

### Building a SQL query dynamically

```js
function buildQuery({ table, fields, limit }) {
  return new StringBuilder("SELECT ")
    .append(fields.join(", "))
    .appendFormat(" FROM {0}", table)
    .appendFormat(" LIMIT {0}", limit)
    .toString();
}

console.log(buildQuery({ table: "users", fields: ["id", "name", "email"], limit: 10 }));
// SELECT id, name, email FROM users LIMIT 10
```

---

### Reusing the buffer with `.clear()`

```js
const sb = new StringBuilder();

for (const id of [1, 2, 3]) {
  sb.appendFormat("Processing item {0}...", id);
  console.log(sb.toString());
  sb.clear();
}
// Processing item 1...
// Processing item 2...
// Processing item 3...
```

---

### Appending mixed types

```js
const buf = Buffer.from([0x41, 0x42, 0x43]); // "ABC"

const result = new StringBuilder()
  .append("string: ").append("hello").appendLine()
  .append("number: ").append(42).appendLine()
  .append("float:  ").append(3.14).appendLine()
  .append("bool:   ").append(false).appendLine()
  .append("buffer: ").append(buf).appendLine()
  .append("zero:   ").append(0)
  .toString();

console.log(result);
// string: hello
// number: 42
// float:  3.14
// bool:   false
// buffer: ABC
// zero:   0
```

---

### Named vs positional placeholders in `appendFormat`

```js
const sb = new StringBuilder();

// Positional — arguments in order
sb.appendFormat("{0} is {1} years old.", "Alice", 30).appendLine();
// → Alice is 30 years old.

// Named — object argument
sb.appendFormat("{name} is {age} years old.", { name: "Bob", age: 25 }).appendLine();
// → Bob is 25 years old.

// Escaped braces — {{ and }} render as literal { }
sb.appendFormat("Use {{0}} for the first placeholder.").appendLine();
// → Use {0} for the first placeholder.

console.log(sb.toString());
```

---

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
sb.appendFormat("{0} + {1} = {2}", 1, 2, 3);       // positional
sb.appendFormat("Hello, {name}!", { name: "world" }); // named
sb.appendFormat("{{0}} is literal");                 // escaped → {0}
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

Returns the accumulated string by joining all collected parts.

```js
sb.append("a").append("b").append("c").toString(); // "abc"
```

---

## Chaining

All methods except `clear()` return `this`:

```js
const result = new StringBuilder()
  .append("name: ")
  .appendFormat("{0}", "Alice")
  .appendLine()
  .append("role: ")
  .appendFormat("{0}", "admin")
  .toString();
```

---

## License

MIT © 2014 Halil İbrahim ŞAFAK

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhalil%2FStringBuilder.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhalil%2FStringBuilder?ref=badge_large)
