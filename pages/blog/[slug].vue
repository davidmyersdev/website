<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
</script>

<template>
  <div text-xl>
    {{ slug }}
  </div>
</template>
