<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
const query = queryContent(`/blog/${slug}`)
const article = await query.findOne()
</script>

<template>
  <article class="markdown">
    <Content :document="article" />
  </article>
</template>

<style>
@import '~/styles/article.css';
</style>
