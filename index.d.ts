import { Stream } from 'stream';

declare class StringBuilder extends Stream {
    constructor(v?: any);

    readonly length: number;
    readonly isEmpty: boolean;

    prepend(v: any): this;
    append(v: any): this;
    appendJoin(arr: any[], sep?: string): this;
    replace(search: string | RegExp, replacement: any): this;
    replaceAll(search: string | RegExp, replacement: any): this;
    appendLine(v?: any): this;
    appendFormat(template: string, ...args: any[]): this;
    appendFormat(template: string, args: Record<string, any>): this;
    clear(): void;
    toString(): string;
}

export = StringBuilder;
