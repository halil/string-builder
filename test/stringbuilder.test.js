"use strict";

const StringBuilder = require("../src/stringbuilder");
const { Stream } = require("stream");

describe("StringBuilder", () => {
    describe("constructor", () => {
        it("creates an empty instance", () => {
            const sb = new StringBuilder();
            expect(sb.toString()).toBe("");
        });

        it("accepts an initial value", () => {
            expect(new StringBuilder("hello").toString()).toBe("hello");
        });

        it("ignores null as initial value", () => {
            expect(new StringBuilder(null).toString()).toBe("");
        });

        it("extends Stream", () => {
            expect(new StringBuilder()).toBeInstanceOf(Stream);
        });

        it("exposes pipe from Stream", () => {
            expect(typeof new StringBuilder().pipe).toBe("function");
        });
    });

    describe("append", () => {
        it("appends a string", () => {
            expect(new StringBuilder().append("hello").toString()).toBe("hello");
        });

        it("appends multiple values", () => {
            const sb = new StringBuilder();
            sb.append("a").append("b").append("c");
            expect(sb.toString()).toBe("abc");
        });

        it("appends numbers", () => {
            expect(new StringBuilder().append(42).toString()).toBe("42");
        });

        it("appends zero without skipping", () => {
            expect(new StringBuilder().append(0).toString()).toBe("0");
        });

        it("appends false without skipping", () => {
            expect(new StringBuilder().append(false).toString()).toBe("false");
        });

        it("appends a Buffer", () => {
            const buf = Buffer.from([0x30, 0x31, 0x32]);
            expect(new StringBuilder().append(buf).toString()).toBe("012");
        });

        it("ignores null", () => {
            expect(new StringBuilder().append(null).toString()).toBe("");
        });

        it("ignores undefined", () => {
            expect(new StringBuilder().append(undefined).toString()).toBe("");
        });

        it("returns this for chaining", () => {
            const sb = new StringBuilder();
            expect(sb.append("x")).toBe(sb);
        });
    });

    describe("appendLine", () => {
        it("appends a newline", () => {
            const sb = new StringBuilder().appendLine();
            expect(sb.toString()).toBe(sb.newline);
        });

        it("appends newline then value", () => {
            const sb = new StringBuilder("a").appendLine("b");
            expect(sb.toString()).toBe("a" + sb.newline + "b");
        });

        it("ignores null value but still adds newline", () => {
            const sb = new StringBuilder().appendLine(null);
            expect(sb.toString()).toBe(sb.newline);
        });

        it("returns this for chaining", () => {
            const sb = new StringBuilder();
            expect(sb.appendLine()).toBe(sb);
        });
    });

    describe("appendFormat", () => {
        it("replaces positional placeholders", () => {
            const sb = new StringBuilder().appendFormat("{0} + {1} = {2}", 1, 2, 3);
            expect(sb.toString()).toBe("1 + 2 = 3");
        });

        it("replaces named placeholders with object", () => {
            const sb = new StringBuilder().appendFormat("hello {name}!", { name: "world" });
            expect(sb.toString()).toBe("hello world!");
        });

        it("handles escaped braces {{...}}", () => {
            const sb = new StringBuilder().appendFormat("{{0}}", "ignored");
            expect(sb.toString()).toBe("{0}");
        });

        it("accepts float values", () => {
            const sb = new StringBuilder().appendFormat("{0}", 3.14);
            expect(sb.toString()).toBe("3.14");
        });

        it("returns this for chaining", () => {
            const sb = new StringBuilder();
            expect(sb.appendFormat("{0}", "x")).toBe(sb);
        });

        it("applies :U specifier (uppercase)", () => {
            expect(new StringBuilder().appendFormat("{0:U}", "hello").toString()).toBe("HELLO");
        });

        it("applies :L specifier (lowercase)", () => {
            expect(new StringBuilder().appendFormat("{0:L}", "WORLD").toString()).toBe("world");
        });

        it("applies :n specifier (thousand separator)", () => {
            const result = new StringBuilder().appendFormat("{0:n}", 1234567).toString();
            expect(result).toBe((1234567).toLocaleString());
        });

        it("applies specifier with named placeholder", () => {
            expect(new StringBuilder().appendFormat("{name:U}", { name: "alice" }).toString()).toBe("ALICE");
        });

        it("leaves value unchanged for unknown specifier", () => {
            expect(new StringBuilder().appendFormat("{0:z}", "test").toString()).toBe("test");
        });
    });

    describe("appendJoin", () => {
        it("joins array with separator", () => {
            expect(new StringBuilder().appendJoin(["a", "b", "c"], ", ").toString()).toBe("a, b, c");
        });

        it("joins with empty separator by default", () => {
            expect(new StringBuilder().appendJoin(["a", "b", "c"]).toString()).toBe("abc");
        });

        it("works with numbers", () => {
            expect(new StringBuilder().appendJoin([1, 2, 3], "-").toString()).toBe("1-2-3");
        });

        it("ignores null array", () => {
            expect(new StringBuilder().appendJoin(null).toString()).toBe("");
        });

        it("returns this for chaining", () => {
            const sb = new StringBuilder();
            expect(sb.appendJoin(["x"])).toBe(sb);
        });
    });

    describe("length", () => {
        it("returns 0 for empty builder", () => {
            expect(new StringBuilder().length).toBe(0);
        });

        it("returns correct character count", () => {
            expect(new StringBuilder("hello").append(" world").length).toBe(11);
        });

        it("counts numbers and booleans correctly", () => {
            expect(new StringBuilder().append(42).append(false).length).toBe(7);
        });

        it("updates after clear", () => {
            const sb = new StringBuilder("hello");
            sb.clear();
            expect(sb.length).toBe(0);
        });
    });

    describe("isEmpty", () => {
        it("returns true for empty builder", () => {
            expect(new StringBuilder().isEmpty).toBe(true);
        });

        it("returns false after append", () => {
            expect(new StringBuilder("x").isEmpty).toBe(false);
        });

        it("returns true after clear", () => {
            const sb = new StringBuilder("hello");
            sb.clear();
            expect(sb.isEmpty).toBe(true);
        });
    });

    describe("clear", () => {
        it("empties the buffer", () => {
            const sb = new StringBuilder("hello");
            sb.clear();
            expect(sb.toString()).toBe("");
        });

        it("allows appending after clear", () => {
            const sb = new StringBuilder("hello");
            sb.clear();
            sb.append("world");
            expect(sb.toString()).toBe("world");
        });
    });

    describe("toString", () => {
        it("returns empty string when empty", () => {
            expect(new StringBuilder().toString()).toBe("");
        });

        it("joins all parts correctly", () => {
            const sb = new StringBuilder("a").append("b").append("c");
            expect(sb.toString()).toBe("abc");
        });
    });

    describe("chaining", () => {
        it("chains all methods together", () => {
            const sb = new StringBuilder();
            const result = sb
                .append("hello")
                .appendFormat(" {0}", "world")
                .appendLine()
                .append("done")
                .toString();
            expect(result).toBe("hello world" + sb.newline + "done");
        });
    });
});
