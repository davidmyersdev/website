---
title: Detect the intersection of multiple ranges in JavaScript
tags: [JavaScript, Mathematics, TypeScript]
createdAt: 2022-06-20T23:04:29.863Z
updatedAt: 2022-06-20T23:04:29.863Z
---

Recently, while working on a feature for [Octo](https://octo.app), I had to figure out how to test the intersection of multiple ranges using JavaScript. Specifically, I needed to come up with a performant solution to detect when any text-selection ranges intersected with specific syntax node ranges in the editor. This was a fun problem to work on, so I hope you like the solution.

<!-- more -->

### How to compare ranges

A range can reasonably be represented by a starting point and an ending point. For the purpose of this post, we will assume the starting point is the **minimum** and the ending point is the **maximum**.

We will know multiple ranges are intersecting when the **maximal minimum** (the largest starting point) of the ranges is _less than or equal to_ the **minimal maximum** (the smallest ending point). We can make this abstract concept a little more concrete by plotting two ranges on a number line.

```ts
   [0, 1, 2, 3, 4]
//--0--1--2--3--4--5--6--7--8--9--->
         [2, 3, 4, 5, 6]
```

The minimums of the ranges are `[0, 2]`{lang=ts}, and the maximums of the ranges are `[4, 6]`{lang=ts}. The _maximal_ value of the minimums is `2`{lang=ts}, and the _minimal_ value of the maximums is `4`{lang=ts}. Since `2`{lang=ts} is _less than or equal to_ `4`{lang=ts}, we can safely say the two ranges intersect.

## Detect the intersection of **all** ranges

For these examples, we will use the following `range` function.

```ts
type NumberRange = { min: number, max: number }

const range = (min: number, max: number): NumberRange => {
  return { min, max }
}
```

The method we learned above works for any number of ranges as along as you want to assert that _all_ of the ranges intersect (more on that later). We can implement the logic from the previous example as a function that accepts any number of ranges.

```ts
const allIntersect = (...ranges: NumberRange[]) => {
  // Create separate arrays for the min and max values.
  const minimums = ranges.map(r => r.min)
  const maximums = ranges.map(r => r.max)

  // Extract the comparands.
  const maximalMinimum = Math.max(...minimums)
  const minimalMaximum = Math.min(...maximums)

  return maximalMinimum <= minimalMaximum
}
```

Then, we can use this function to detect whether the given ranges are intersecting.

```ts
allIntersect(range(0, 4), range(2, 6), range(4, 8))
// true
allIntersect(range(0, 4), range(2, 6), range(10, 14))
// false
```

## Detect the intersection of **some** ranges

The implementation above works well for checking whether _all_ of the ranges intersect, but it is sometimes necessary to check whether _some_ of the ranges intersect. We can create another function for that purpose which builds upon our original solution.

```ts
const someIntersect = (...ranges: NumberRange[]) => {
  return ranges.some((range1, index1) => {
    // Compare all ranges to all other ranges.
    return ranges.some((range2, index2) => {
      // Do not compare a range to itself.
      if (index1 === index2) {
        return false
      }

      return allIntersect(range1, range2)
    })
  })
}
```

```ts
someIntersect(range(0, 4), range(2, 6), range(4, 8))
// true
someIntersect(range(0, 4), range(2, 6), range(10, 14))
// true
someIntersect(range(0, 4), range(10, 14))
// false
```

This one might be a bit niche, but I would love to hear about your own use case. If you found this post helpful, you want to know more, you have a question, or you just want to say hi, please leave a comment down below!

Thanks for reading, and happy coding. ✌️
