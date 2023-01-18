---
title: How to convert an array of values into a union type with TypeScript
tags: [til, typescript]
series: til
createdAt: 2023-01-17T22:55:10.363Z
updatedAt: 2023-01-17T22:55:10.363Z
---

<!-- more -->

In my codebase, I have a module with a hard-coded list of values similar to this.

```ts
export const values = ['hello', 'world']
```

In that module, I also have a function that accepts one of those values as a parameter.

```ts
export const useValue = (value: 'hello' | 'world') => {
  // use the value
}
```

To ensure the type is always kept up-to-date with the `values` array, I was considering the following approach.

```ts
export type AllowedValue = 'hello' | 'world'
export const values: AllowedValue[] = ['hello', 'world']
```

While this approach works just fine, it still requires specifying the string literals in multiple places, which is... not ideal.

After a bit of reading, I realized I could narrow the type of the array from `string[]`{lang=ts} to `('hello' | 'world')[]`{lang=ts} by using a [const assertion](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#readonly-and-const).

```ts
// ('hello' | 'world')[]
export const values = ['hello', 'world'] as const
```

Combine that with an index of the type `number`, and you have your union type.

```ts
// 'hello' | 'world'
export type AllowedValue = typeof values[number]
```

Goodbye, repetition!
