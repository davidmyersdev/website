<script lang="ts" setup>
const slug = useRoute().params.slug
const path = `/til/${slug}`
</script>

<template>
  <div class="flex flex-col gap-8">
    <PostFull :path="path" />
  </div>
</template>
