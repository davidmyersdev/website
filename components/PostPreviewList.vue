<script lang="ts" setup>
const { path } = defineProps({ path: String })
const posts = await queryContent(path)
  .only(['_path', 'createdAt', 'excerpt', 'series', 'tags', 'title', 'updatedAt'])
  .sort({ createdAt: -1 })
  .find()
</script>

<template>
  <div class="flex flex-col gap-16 lg:gap-24">
    <PostPreview v-for="post of posts" :key="post._path" :post="post" />
  </div>
</template>
