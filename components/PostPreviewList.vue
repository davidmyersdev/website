<script lang="ts" setup>
const { series } = defineProps({ series: String })
const posts = await queryContent('/blog')
  .only(['_path', 'body', 'createdAt', 'excerpt', 'series', 'tags', 'title', 'updatedAt'])
  // @ts-ignore
  .where({ series: { slug: series } })
  .sort({ createdAt: -1 })
  .find()
</script>

<template>
  <div class="flex flex-col gap-16 lg:gap-24">
    <Newsletter v-if="false" />
    <PostPreview v-for="post of posts" :key="post._path" :post="post" />
  </div>
</template>
