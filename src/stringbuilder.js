"use strict";

const { Stream } = require('stream');

function _applySpec(val, spec) {
    const str = String(val);
    switch (spec) {
        case 'U': return str.toUpperCase();
        case 'L': return str.toLowerCase();
        case 'n': {
            const num = parseFloat(val);
            return isNaN(num) ? str : num.toLocaleString();
        }
        default: return str;
    }
}

class StringBuilder extends Stream {
    constructor(v) {
        super();
        this.s = [];
        this.newline = process.platform === 'win32' ? '\r\n' : '\n';
        this.append(v);
    }

    append(v) {
        if (v != null) {
            this.s.push(v);
        }

        return this;
    }

    appendLine(v) {
        this.s.push(this.newline);

        if (v != null) {
            this.s.push(v);
        }

        return this;
    }

    appendFormat() {
        const p = /({?){([^}]+)}(}?)/g;
        let a = arguments, v = a[0], o = false;

        if (a.length === 2) {
            if (typeof a[1] == 'object' && a[1].constructor !== String) {
                a = a[1];
                o = true;
            }
        }

        const s = v.split(p);
        const r = [];

        for (let i = 0; i < s.length; i += 4) {
            r.push(s[i]);

            if (s.length > i + 3) {
                if (s[i + 1] === '{' && s[i + 3] === '}') {
                    r.push(s[i + 1], s[i + 2], s[i + 3]);
                } else {
                    const token = s[i + 2];
                    const colon = token.indexOf(':');
                    const key = colon === -1 ? token : token.slice(0, colon);
                    const spec = colon === -1 ? null : token.slice(colon + 1);
                    let val = a[o ? key : parseInt(key, 10) + 1];
                    if (spec !== null && val != null) val = _applySpec(val, spec);
                    r.push(s[i + 1], val, s[i + 3]);
                }
            }
        }

        this.s.push(r.join(''));

        return this;
    }

    prepend(v) {
        if (v != null) {
            this.s.unshift(v);
        }

        return this;
    }

    replace(search, replacement) {
        if (this.s.length > 0) {
            this.s = [this.s.join('').replace(search, String(replacement))];
        }

        return this;
    }

    replaceAll(search, replacement) {
        if (this.s.length > 0) {
            const str = this.s.join('');
            if (typeof search === 'string') {
                this.s = [str.split(search).join(String(replacement))];
            } else {
                const re = search.flags.includes('g')
                    ? search
                    : new RegExp(search.source, search.flags + 'g');
                this.s = [str.replace(re, String(replacement))];
            }
        }

        return this;
    }

    appendJoin(arr, sep = '') {
        if (arr != null) {
            this.s.push(arr.join(sep));
        }

        return this;
    }

    get length() {
        return this.s.reduce((sum, part) => sum + String(part).length, 0);
    }

    get isEmpty() {
        return this.s.length === 0;
    }

    clear() {
        this.s.length = 0;
    }

    toString() {
        return this.s.length === 0 ? '' : this.s.join('');
    }
}

module.exports = StringBuilder;
