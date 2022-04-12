<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
</script>

<template>
  <div>
    <div text-xl>
      {{ slug }}
    </div>

    <div>
      <NuxtLink
        class="btn m-3 text-sm"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
