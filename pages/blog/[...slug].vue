<script lang="ts" setup>
const slug = [useRoute().params.slug].flat().join('/')
const path = `/blog/${slug}`

useHead({
  meta: [
    {
      property: 'og:image',
      content: `https://cdn.voracious.dev/og/content/${slug}.png`,
    },
  ],
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <PostFull :path="path" />
  </div>
</template>
