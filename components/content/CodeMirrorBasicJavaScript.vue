<script lang="ts" setup>
import { javascript } from '@codemirror/lang-javascript'
import { basicSetup, EditorView } from 'codemirror'

const doc = 'console.log(\n  "hello, world"\n)'
const parent = ref<HTMLElement>()

onMounted(() => {
  new EditorView({
    doc,
    extensions: [
      basicSetup,
      javascript(),
    ],
    parent: parent.value,
  })
})
</script>

<template>
  <InteractiveEditor>
    <div ref="parent"></div>
  </InteractiveEditor>
</template>
