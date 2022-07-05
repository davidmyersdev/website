<script lang="ts" setup>
const slug = useRoute().params.slug
const path = `/til/${slug}`

useHead({
  meta: [
    {
      hid: 'og:image',
      property: 'og:image',
      content: `/og/content/${slug}.png`,
    },
  ],
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <PostFull :path="path" />
  </div>
</template>
