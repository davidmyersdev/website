<script lang="ts" setup>
const { series } = defineProps({ series: String })
const posts = await queryContent('/blog')
  .only(['_path', 'createdAt', 'excerpt', 'series', 'tags', 'title', 'updatedAt'])
  .where({ series: { slug: series } })
  .sort({ createdAt: -1 })
  .find()
</script>

<template>
  <div class="flex flex-col gap-16 lg:gap-24">
    <PostPreview v-for="post of posts" :key="post._path" :post="post" />
  </div>
</template>
