---
title: 'How to properly type Array.filter in TypeScript'
tags: [TIL, TypeScript]
createdAt: 2023-12-30T16:22:38.694Z
updatedAt: 2023-12-30T16:22:38.694Z
---

This is a quick tip on how to make sure your arrays are properly typed after performing a `.filter` operation.

<!-- more -->

Say you have an array of potential numbers that looks something like this:

```ts
const maybeNumbers = [1, 2, '3', undefined, 4, '5']
```

The type of the `maybeNumbers` array is `(string | number | undefined)[]`. Now, you want to filter the array to only contain numbers, so you do a standard `.filter` operation like so:

```ts{2-4}
const maybeNumbers = [1, 2, '3', undefined, 4, '5']
const numbers = maybeNumbers.filter((maybeNumber) => {
  return Number.isInteger(maybeNumber)
})
```

 This code definitely does what we want, and the non-integer values will be removed from the new `numbers`, array. The problem, however, is that the `numbers` array still has the type `(string | number | undefined)[]`. This is because _each item in the array_ has the union type `string | number | undefined`, and TypeScript cannot infer that a given type in the union would be removed by the filter operation.

 To help TypeScript out, we can use a type guard on the filter function to modify the type of each item:

```ts{2}
const maybeNumbers = [1, 2, '3', undefined, 4, '5']
const numbers = maybeNumbers.filter((maybeNumber): maybeNumber is number => {
  return Number.isInteger(maybeNumber)
})
```

Because this function runs against every item in the array, the end result is that the type of the array is modified to only contain the types that pass the type guard. In this case, that means the type of `numbers` is now `number[]`.

## Taking it further

That was a fairly simple example where you declare what the resulting type _will be_, but what if you want to filter out a specific type without knowing what the types will be ahead of time?

Let's invert our example above so that we keep everything _except_ numbers:

```ts{2-4}
const maybeNumbers = [1, 2, '3', undefined, 4, '5']
const notNumbers = maybeNumbers.filter((maybeNumber) => {
  return !Number.isInteger(maybeNumber)
})
```

Now, you might be tempted to use `maybeNumber is string | undefined` as a type guard, but that becomes difficult to maintain if the types in the array can change. Instead, you can use a [generic function](https://www.typescriptlang.org/docs/handbook/2/generics.html) to make the type guard more flexible.

```ts{2}
const maybeNumbers = [1, 2, '3', undefined, 4, '5']
const notNumbers = maybeNumbers.filter(<T>(maybeNumber: T | number): maybeNumber is T => {
  return !Number.isInteger(maybeNumber)
})
```

In this type signature, we are inferring the type of `maybeNumber` as `T | number`. This means that any types that are _not_ `number` will be represented by `T`. This allows us to use the type guard `maybeNumber is T` to remove the `number` type from the array while keeping the other types intact.

Thanks for reading, and happy coding. ✌️
