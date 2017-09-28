// flow-typed signature: 6194f2fe4ddd84ffde038878325024e0
// flow-typed version: b43dff3e0e/type-is_v1.x.x/flow_>=v0.25.x

// @flow

declare module 'type-is' {
  declare module.exports: {
    // typeofrequest
    (req: mixed, types?: Array<string>): string|boolean|null,
    is: (value: string, types: Array<string>) => string|boolean,
    hasBody: (request: mixed) => boolean,
    normalize: (type: string) => false|string,
    match: (expected: string, actual: string) => boolean,
  }
}
