import { Stream } from 'stream';

declare class StringBuilder extends Stream {
    constructor(v?: any);

    readonly length: number;
    readonly isEmpty: boolean;

    append(v: any): this;
    appendLine(v?: any): this;
    appendFormat(template: string, ...args: any[]): this;
    appendFormat(template: string, args: Record<string, any>): this;
    clear(): void;
    toString(): string;
}

export = StringBuilder;
