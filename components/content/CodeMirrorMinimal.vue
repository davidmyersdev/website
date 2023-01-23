<script lang="ts" setup>
import { minimalSetup, EditorView } from 'codemirror'

const doc = 'console.log(\n  "hello, world"\n)'
const parent = ref<HTMLElement>()

onMounted(() => {
  new EditorView({
    doc,
    extensions: [
      minimalSetup,
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
