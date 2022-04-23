<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
const query = queryContent(...[slug].flat())
const article = await query.findOne()
</script>

<template>
  <div>
    <article class="markdown">
      <Content :document="article" />
    </article>
    <Author />
  </div>
</template>

<style>
@import '~/styles/article.css';
</style>
