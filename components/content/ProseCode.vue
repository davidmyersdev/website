<script lang="ts" setup>
import { CheckCircleIcon, ClipboardIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  code?: string,
  filename?: string,
  highlights?: number[],
  language?: string,
  meta?: string,
}>()

const { copy } = useClipboard()
const { isShowing: isCopyHintShowing, show: showCopyHint } = useToast()

const copyCode = async () => {
  if (props.code) {
    await copy(props.code)

    showCopyHint()
  }
}
</script>

<template>
  <section class="bg-darkest flex flex-col mb-8 relative rounded" :class="{ 'has-highlights': !!highlights }">
    <div class="flex gap-2 items-center justify-between leading-none pt-4 px-4 text-slate-400">
      <div class="flex items-center">
        <small v-if="filename">{{ filename }}</small>
        <small v-else-if="language">{{ language }}</small>
      </div>
      <div class="flex gap-4 items-center">
        <small v-if="isCopyHintShowing">copied to clipboard</small>
        <button @click="copyCode" class="flex items-center p-1 rounded-sm transform scale-[2]">
          <CheckCircleIcon v-if="false" class="h-2" />
          <ClipboardIcon v-else class="h-2" />
        </button>
      </div>
    </div>
    <div class="overflow-x-auto p-4">
      <slot />
    </div>
  </section>
</template>
