// tslint:disable:readonly-keyword
// tslint:disable:no-any

/// <reference path="node_modules/ts-nameof/ts-nameof.d.ts" />

declare module '*.scss' {
    const content: unknown;
    export default content;
}

declare const VERSION_HASH: string;
declare const SENTRY_ID: string;
declare const API_ENTRY: string;
declare const SUB_ENV: string;

declare function gtag(type: string, action: string, details: {}): void;