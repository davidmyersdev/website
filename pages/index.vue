<script lang="ts" setup>
const { public: { baseUrl }} = useRuntimeConfig()

useHead(() => ({
  link: [
    { rel: 'canonical', href: `${baseUrl}/blog` },
  ],
}))
</script>

<template>
  <PostPreviewList path="/" />
</template>
