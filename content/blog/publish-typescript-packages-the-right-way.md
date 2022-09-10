---
title: Publish TypeScript packages the right way
tags: [javascript, oss, typescript]
createdAt: 2022-12-22T16:29:29.863Z
updatedAt: 2022-12-22T16:29:29.863Z
wip: true
---

I absolutely love using TypeScript for my JavaScript projects, but it does present challenges specific to its ecosystem at times. Publishing types with your packages is a great example of this, so I want to take you through the process of properly supporting multiple [`moduleResolution`](https://www.typescriptlang.org/tsconfig#moduleResolution) configurations.

<!-- more -->

### Optional prerequisites

To help you follow along, I created a project called [typescript-example](https://github.com/voracious/typescript-example). You are welcome to continue without it, but I will be referencing various snippets from it throughout this article.

```bash
# Clone the repository
git clone https://github.com/voracious/typescript-example.git

# Navigate into the project folder
cd typescript-example

# Install dependencies (and build project)
npm install
```

## Understanding the `moduleResolution` field in TypeScript

> Module resolution is the process the compiler uses to figure out what an import refers to. ([source](https://www.typescriptlang.org/docs/handbook/module-resolution.html))

In TypeScript, this process is used to determine where the _types_ for an imported module reside. The strategy used is dependent on the configuration of the project that is consuming your package, but it attempts to mimic Node's [module resolution](https://nodejs.org/api/modules.html#modules_all_together) as closely as possible. I will focus on the `Node` and `Node16` strategies.

### The `Node` strategy

This strategy directs TypeScript to resolve imports as [CommonJS modules](https://nodejs.org/api/modules.html#modules-commonjs-modules) via the `main` field of the imported package. Although the name is `Node`, it does not support all resolution strategies that Node supports, such as the `exports` field. Without consideration of this difference, your types might not resolve correctly in some project configurations.

An example of this strategy is the [`examples/app-node`](https://github.com/voracious/typescript-example/blob/fd5d97027e54542eff6ccc1b644a48ed41b419ab/examples/app-node) package. In [`src/index.ts`](https://github.com/voracious/typescript-example/blob/fd5d97027e54542eff6ccc1b644a48ed41b419ab/examples/app-node/src/index.ts#L1), it imports a module from a package called`lib` that can be found at [`examples/lib`](https://github.com/voracious/typescript-example/blob/fd5d97027e54542eff6ccc1b644a48ed41b419ab/examples/lib).

```ts
// ./examples/app-node/src/index.ts#L1
import { doTheThing } from 'lib'
```

The `lib` package defines `main` as `./cjs/dist/index.js`, and if you hover over the `'lib'` import in an editor with TypeScript intellisense, you will see that it resolves as such.

#### Subpath exports

In that same `src/index.ts` file, [the next line](https://github.com/voracious/typescript-example/blob/fd5d97027e54542eff6ccc1b644a48ed41b419ab/examples/app-node/src/index.ts#L2) imports a module from a _subpath_ of the `lib` package.

```ts
// ./examples/app-node/src/index.ts#L2
import { doSomethingElse } from 'lib/subpath'
```

In modern versions of Node, packages can define an `exports` field to specify exactly what can be imported. In packages that do not define the `exports` field and in versions of Node that do not support it, any resolvable path can be imported. Because the `Node` strategy does not recognize the `exports` field, all subpaths must exist as real paths in the package. For the statement above, Node will attempt to resolve the subpath as `lib/subpath.js`, `lib/subpath/cjs/dist/index.js` (appending the value of its `main` field), or `lib/subpath/index.js`. In this case, it resolves with the second option. As before, you can hover over the `'lib/subpath'` import to verify.

### The `Node16` and `NodeNext` strategies

The `Node16` strategy, as it sounds, brings support for the resolution features available in Node 16. Similarly, the `NodeNext` strategy brings support for the latest stable Node release. These features include ECMAScript (ES) modules, subpath patterns, and conditional exports, among other things. Additionally, if a package exports both ES modules and CommonJS modules, `Node16` will prefer ES modules.

The example for this strategy can be found at [`examples/app-node-next`](https://github.com/voracious/typescript-example/blob/fd5d97027e54542eff6ccc1b644a48ed41b419ab/examples/app-node-next). It also imports modules from the `lib` package in [`src/index.ts`](https://github.com/voracious/typescript-example/blob/fd5d97027e54542eff6ccc1b644a48ed41b419ab/examples/app-node-next/src/index.ts#L1), but these modules are resolved as ES modules via the `exports` field in `lib` instead of CommonJS modules via the `main` field.

## Building a package that works with multiple configurations

The amount of work it takes to build a universal package, one that works in most configurations, varies based on the needs of your project and your preferences as a maintainer. That said, we will work with the following assumptions in mind to cover some common scenarios.

1. The package provides exports for both CommonJS and ES modules
2. The package includes one or more subpaths

To help you get started, there are boilerplate packages available in the [typescript-example]() repository under the `starter-app` and `starter-lib` directories.
