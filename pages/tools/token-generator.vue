<script lang="ts" setup>
const token = ref('')
const length = ref(32)

const { copy: copyToClipboard } = useClipboard()
const { isShowing: isCopyHintShowing, show: showCopyHint } = useToast()

const copy = async () => {
  await copyToClipboard(token.value)

  showCopyHint()
}

const generate = async () => {
  const { nanoid } = await import('nanoid')

  token.value = nanoid(length.value)
}

onMounted(async () => {
  await generate()
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <div>
      <h1 class="text-2xl mb-2">Token Generator</h1>
      <p>A simple utility for generating secure URL-safe tokens in your browser.</p>
    </div>
    <div
      class="bg-transparent border rounded my-4 overflow-x-auto text-center"
    >
      <div class="p-4 inline-block">
        {{ token }}
      </div>
    </div>
    <div>
      <label class="flex flex-col items-start gap-1">
        <span>Token length</span>
        <input v-model="length" type="number" min="8" class="bg-transparent border rounded px-2 py-1">
      </label>
    </div>
    <div class="flex gap-2">
      <button class="bg-blue-500 rounded px-2 py-1" @click="generate">
        <div class="text-gray-900 inline-flex gap-2 items-center">
          <span>Regenerate</span>
        </div>
      </button>
      <button class="bg-current rounded px-2 py-1" @click="copy">
        <div class="text-gray-900 inline-flex gap-2 items-center">
          <span v-if="isCopyHintShowing">Copied!</span>
          <span v-else>Copy</span>
        </div>
      </button>
    </div>
  </div>
</template>
