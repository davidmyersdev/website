---
title: 'How to build a Code Editor with CodeMirror 6 and TypeScript: Introduction'
tags: [CodeMirror, TypeScript]
series: learn-codemirror
createdAt: 2023-01-30T19:18:55.866Z
updatedAt: 2023-01-30T19:18:55.866Z
---

I spend a lot of my spare time working on a web-based personal knowledge management tool called [Octo](https://octo.app). One of its core distinguishing features is a custom code editor that I have been working on for the past few years. I originally built it with CodeMirror 5, but I migrated it to CodeMirror 6 in early 2022.

Since then, I have learned a lot about CodeMirror 6, and now I want to share that accumulated knowledge with you. There is a lot to learn, so this article will be one of many in an ongoing series.

<!-- more -->

## Initialize the `code-editor` project

Create a new folder called `code-editor`, and make it your working directory.

```shell
mkdir code-editor && cd ./code-editor
```

Create `package.json` with `typescript` and `vite`.

```json[package.json]
{
  "name": "code-editor",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "^4.9.3",
    "vite": "^4.0.0"
  }
}
```

Create `tsconfig.json` with the default Vite settings.

```json[tsconfig.json]
{
  "compilerOptions": {
    "esModuleInterop": true,
    "isolatedModules": true,
    "lib": ["ESNext", "DOM"],
    "module": "ESNext",
    "moduleResolution": "Node",
    "noEmit": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ESNext",
    "useDefineForClassFields": true
  },
  "include": ["src"]
}
```

Create `index.html` with a script tag that loads the entrypoint.

```html[index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Code Editor</title>
  </head>
  <body>
    <div id="editor"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Create the entrypoint at `src/main.ts`.

```ts[src/main.ts]
const targetElement = document.querySelector('#editor')!
```

Once you have created those files, install your dependencies.

```shell
npm install
```

## Initialize CodeMirror

CodeMirror 6 is published as a set of packages under the `@codemirror` and `@lezer` scopes.

A starter package called `codemirror` is also available, and that is the one we will use for now. Marijn Haverbeke, the author of CodeMirror, describes the package as follows.

> \[The `codemirror`\] package depends on most of the core library packages and exports extension bundles to help set up a simple editor in a few lines of code.

Once you install the package, we can start implementing the editor.

```shell
npm install codemirror
```

After installing the package, add the following code to `src/main.ts`. This will get a minimal editor up and running.

```ts[src/main.ts]{1-3,5-12}
import { minimalSetup, EditorView } from 'codemirror'

const initialText = 'console.log("hello, world")'
const targetElement = document.querySelector('#editor')!

new EditorView({
  doc: initialText,
  extensions: [
    minimalSetup,
  ],
  parent: targetElement,
})
```

Save the file, and then start the dev server.

```shell
npm run dev
```

Navigate to http://localhost:5173 to see the editor in action. If all is well, you should see an editor similar to this one.

::lazy-code-mirror-minimal{doc='console.log("hello, world")'}
::

It is incredibly barebones, but click on the editor and play around with it for a second if you can. Before you start adding features, we should talk about what the current code is doing.

### A brief primer on the CodeMirror editor

At a high level, the CodeMirror editor can be broken down into two main components:

1. `EditorState` is a state object that maintains the data structures and modifications that make up your document.
2. `EditorView` is a display adapter that translates the state into something you can see and interact with, and it also translates those interactions into state updates.

Let's take another look at the code example from above.

```ts[src/main.ts]
import { minimalSetup, EditorView } from 'codemirror'

const initialText = 'console.log("hello, world")'
const targetElement = document.querySelector('#editor')!

new EditorView({
  doc: initialText,
  extensions: [
    minimalSetup,
  ],
  parent: targetElement,
})
```

The `codemirror` package provides `EditorView`, which you used above, but it does not provide `EditorState`. Instead, it provides two extension packs (`minimalSetup` and `basicSetup`) that are meant to get you started quickly by sacrificing a bit of configurability. Typically, the `extensions` property is supplied to `EditorState` directly, but you can pass it to `EditorView` as a shortcut when you do not have a separate state instance.

The additional properties, `doc` and `parent`, are used to initialize the editor with some default text and bind the editor to the DOM, respectively. The `doc` property is another one that is usually supplied to `EditorState`, but `parent` is managed by `EditorView` since it relates directly to how the state is _displayed_ to you.

### Getting the most out of the `codemirror` package

The `minimalSetup` module we used above is a good one to start with, because it only includes a few core extensions that you will likely need.

> A minimal set of extensions to create a functional editor. Only includes [the default keymap](https://codemirror.net/docs/ref/#commands.defaultKeymap), [undo history](https://codemirror.net/docs/ref/#commands.history), [special character highlighting](https://codemirror.net/docs/ref/#view.highlightSpecialChars), [custom selection drawing](https://codemirror.net/docs/ref/#view.drawSelection), and [default highlight style](https://codemirror.net/docs/ref/#language.defaultHighlightStyle).

If you want a fuller experience from the `codemirror` package, you should use the `basicSetup` module. Replace all references to `minimalSetup` with `basicSetup`.

```ts[src/main.ts]{1,9}
import { basicSetup, EditorView } from 'codemirror'

const initialText = 'console.log("hello, world")'
const targetElement = document.querySelector('#editor')!

new EditorView({
  doc: initialText,
  extensions: [
    basicSetup,
  ],
  parent: targetElement,
})
```

Your editor will then look something like this.

::lazy-code-mirror-basic
::

The `basicSetup` module really does come pre-configured with a lot of nifty features. The last thing you need to really tie it together is a language module. Language modules include parsers to tokenize your code, themes to style the tokens, and commands for shortcuts such as commenting out lines.

Install the JavaScript package.

```shell
npm install @codemirror/lang-javascript
```

Now, import the `javascript` module and add it to your `extensions` array.

```ts[src/main.ts]{1,11}
import { javascript } from '@codemirror/lang-javascript'
import { basicSetup, EditorView } from 'codemirror'

const initialText = 'console.log("hello, world")'
const targetElement = document.querySelector('#editor')!

new EditorView({
  doc: initialText,
  extensions: [
    basicSetup,
    javascript(),
  ],
  parent: targetElement,
})
```

With that addition, the editor is now a lot closer to what you might encounter in the real world. If you are on desktop, you can toggle a line comment with either `Cmd + /` or `Ctrl + /` (the default in many editors).

Check it out.

::lazy-code-mirror-basic-java-script
::

### Going beyond the `codemirror` package

The `basicSetup` module is nice, but it is not configurable.

> The idea is that, once you decide you want to configure your editor more precisely, you take this package's source (which is just a bunch of imports and an array literal), copy it into your own code, and adjust it as desired.

If you _really_ want your editor to stand out, you will likely need to customize it to fit the needs of you or your users.

Before we replace `basicSetup` with its associated modules, let's migrate to the `@codemirror/state` and `@codemirror/view` packages.

#### Using `EditorState` with `EditorView`

Install the following packages.

```shell
npm install @codemirror/state @codemirror/view
```

Replace the `EditorView` import with an import from `@codemirror/view` rather than `codemirror`. The initialization of `EditorView` is the same.

```ts[src/main.ts]{2,3}
import { javascript } from '@codemirror/lang-javascript'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'

const initialText = 'console.log("hello, world")'
const targetElement = document.querySelector('#editor')!

new EditorView({
  doc: initialText,
  extensions: [
    basicSetup,
    javascript(),
  ],
  parent: targetElement,
})
```

Next, import `EditorState` and pass an instance of it to `EditorView` under the `state` property. Unlike `EditorView`, `EditorState` has a private constructor, so you must initialize it with `EditorState.create`. Move the `doc` and `extensions` properties into the `EditorState` initializer while you are at it.

```ts[src/main.ts]{2, 11-17}
import { javascript } from '@codemirror/lang-javascript'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'

const initialText = 'console.log("hello, world")'
const targetElement = document.querySelector('#editor')!

new EditorView({
  parent: targetElement,
  state: EditorState.create({
    doc: initialText,
    extensions: [
      basicSetup,
      javascript(),
    ],
  }),
})
```

With `EditorState` configured, let's move on to replacing `basicSetup` with its associated modules.

#### Using the extensions that comprise `basicSetup`

Install the remaining packages that are used by `basicSetup`.

```shell
npm install @codemirror/autocomplete @codemirror/commands @codemirror/language @codemirror/lint @codemirror/search
```

Import the extensions and register them just as they are registered in the `basicSetup` module.

```ts[src/main.ts]{1-2,4-6,8,18-43}
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting } from '@codemirror/language'
import { lintKeymap } from '@codemirror/lint'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { EditorState } from '@codemirror/state'
import { crosshairCursor, drawSelection, dropCursor, EditorView, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, keymap, lineNumbers, rectangularSelection } from '@codemirror/view'

const initialText = 'console.log("hello, world")'
const targetElement = document.querySelector('#editor')!

new EditorView({
  parent: targetElement,
  state: EditorState.create({
    doc: initialText,
    extensions: [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
      ]),
      javascript(),
    ],
  }),
})
```

The result is quite a bit more verbose, but you now have full control over which of these extensions is enabled for your editor. If all is well, your editor should still work just as it did before these changes.

::lazy-code-mirror-basic-final
::

## Conclusion

If you made it this far, I hope you feel a little bit more comfortable with setting up an editor in CodeMirror now!

As this series continues, we will dig deeper into available extensions, configuring extensions on the fly, building custom extensions, styling the editor, implementing custom syntax highlighting, and more.

As always, I'd love to hear about what you're building in the comments below. Thanks for reading, and happy coding. ✌️
