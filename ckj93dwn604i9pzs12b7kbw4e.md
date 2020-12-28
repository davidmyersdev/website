## An alternative Markdown editor component for Vue

[![](https://raw.githubusercontent.com/voraciousdev/octo/master/lib/vue-markdown-editor/images/screenshot.png)](https://github.com/voraciousdev/octo/tree/master/lib/vue-markdown-editor)

One of the biggest challenges I faced while building [Octo](https://github.com/voraciousdev/octo) was the Markdown editor. When it comes to implementing a Markdown text input, there is usually one way to go about it: a **plain text** input field with an optional **preview** mode. This approach obviously works, but the experience can be a bit clunky when writing larger bodies of content. In this article, we will cover an alternative approach that - while being a bit heavier - offers a smoother user experience for the author. This will be accomplished with a standalone Vue component called [vue-markdown-editor](https://github.com/voraciousdev/octo/tree/master/lib/vue-markdown-editor) (MIT-licensed) which was extracted from the core of [Octo](https://github.com/voraciousdev/octo).

## Create a new Vue project

To kick things off, we need to create a new Vue project. We will create a _bare_ project with the `-b` flag and use the _default_ presets with the `-d` flag.

```shell
# create and open the project
vue create -b -d playground && cd playground
```

## Install the editor component

Next, we will install the Markdown editor component.

```shell
# yarn is the default preset
yarn add @voraciousdev/vue-markdown-editor
```

## Implement the editor

Implementation is pretty straightforward. We just need to import, register, and then use the new component. This is no different than importing another component from a relative path. Note the use of `v-model` on the `MarkdownEditor` component. This is the simplest way to bind our own data to the component.

```vue
<!-- src/App.vue -->
<template>
  <div class="app">
    <h1>Playground</h1>
    <!-- use -->
    <MarkdownEditor v-model="markdown" class="editor" />
  </div>
</template>

<script>
// import
import MarkdownEditor from '@voraciousdev/vue-markdown-editor'

export default {
  name: 'App',
  components: {
    // register
    MarkdownEditor,
  },
  data() {
    return {
      markdown: '# Hello, World!\n\nHow are you today?',
    }
  },
}
</script>

<style>
body {
  background-color: #111;
  color: #aaa;
  font-family: sans-serif;
}

.app {
  margin: auto;
  max-width: 50rem;
  width: 100%;
}

.editor {
  background-color: #050505;
  border-radius: 0.25em;
  padding: 1em;
}
</style>
```

## Run the app

All we have to do now is run the app and play around with the editor!

```shell
yarn serve
```

## Final result

[![](https://j.gifs.com/4Q1DNJ.gif)](https://youtu.be/LfhkoCAK6aA)

This component was designed to be as simple to use as a `textarea`. Content is kept in plain text, so we can copy from or paste into the editor whenever we want!

## Closing

This example project is on [GitHub](https://github.com/voraciousdev/octo/tree/master/lib/vue-markdown-editor/examples/playground).

All in all, this article was pretty simple, but I really wanted to show off this new Vue component. It's open source and now available for anyone to use. I will continue to work on and improve this component because it powers my open source Markdown editor [Octo](https://github.com/voraciousdev/octo) (which I used to write this article). Both are MIT-licensed and available for anyone to use. I would greatly appreciate any feedback, and I hope you have a fantastic day!