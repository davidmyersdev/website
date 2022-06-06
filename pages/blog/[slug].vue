<script lang="ts" setup>
import Giscus from '@giscus/vue'
const slug = useRoute().params.slug
</script>

<template>
  <div class="flex flex-col gap-8">
    <article class="markdown w-full">
      <ContentDoc :path="slug" />
    </article>
    <Author />
    <Giscus
      category-id="DIC_kwDOEJxX1s4CPfTZ"
      category="Comments"
      emit-metadata="1"
      input-position="top"
      lang="en"
      mapping="pathname"
      reactions-enabled="1"
      repo-id="MDEwOlJlcG9zaXRvcnkyNzg2ODE1NTg="
      repo="voraciousdev/website"
      theme="transparent_dark"
    />
  </div>
</template>

<style>
@import '~/styles/article.css';
</style>
