<script lang="ts" setup>
import Giscus from '@giscus/vue'

const themeUrl = `${useRuntimeConfig().public.baseUrl}/assets/giscus.css`
</script>

<template>
  <Giscus
    category-id="DIC_kwDOEJxX1s4CPfTZ"
    category="Comments"
    emit-metadata="1"
    host="https://giscus.app"
    input-position="top"
    lang="en"
    loading="lazy"
    mapping="pathname"
    reactions-enabled="1"
    repo-id="MDEwOlJlcG9zaXRvcnkyNzg2ODE1NTg="
    repo="davidmyersdev/website"
    :theme="themeUrl"
  />
</template>
