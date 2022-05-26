<script lang="ts" setup>
const slug = useRoute().params.slug
</script>

<template>
  <div>
    <article class="markdown">
      <ContentDoc :path="slug" />
    </article>
    <Author />
  </div>
</template>

<style>
@import '~/styles/article.css';
</style>
