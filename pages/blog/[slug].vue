<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
const query = queryContent(`/blog/${slug}`)
const article = await query.findOne()
</script>

<template>
  <div text-xl>
    <Content :document="article" />
  </div>
</template>
