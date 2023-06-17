<script lang="ts" setup>
const series = useRoute().params.slug as string

useHead({
  meta: [
    {
      property: 'og:image',
      content: `https://cdn.davidmyers.dev/og/content/${series}.png`,
    },
  ],
})
</script>

<template>
  <PostPreviewList :series="series" />
</template>
