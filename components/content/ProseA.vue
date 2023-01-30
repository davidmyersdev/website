<script setup lang="ts">
const props = defineProps<{ href?: string, target?: string }>()
const isExternal = computed(() => /^(\w+\:)?\/\//.test(`${props.href}`))
const target = computed(() => isExternal.value ? '_blank' : props.target)
</script>

<template>
  <a v-if="isExternal" :href="href" :target="target"><slot /></a>
  <NuxtLink v-else :href="href" :target="target"><slot /></NuxtLink>
</template>
