<script lang="ts" setup>
import { DateTime } from 'luxon'

const { post } = defineProps<{ post: Record<string, any> }>()
const createdAt = DateTime.fromISO(post.createdAt)
const _updatedAt = DateTime.fromISO(post.updatedAt)
</script>

<template>
  <article class="flex flex-col gap-4">
    <p v-if="post.series">
      <NuxtLink :to="post.series.path">
        <span class="bg-darkest rounded p-2 lg:text-lg">{{ post.series.name }} (Series)</span>
      </NuxtLink>
    </p>
    <h2 class="text-2xl lg:text-5xl font-semibold"><NuxtLink :to="post._path">{{ post.title }}</NuxtLink></h2>
    <p v-if="createdAt.isValid" class="text-gray-400">
      <span>Published on {{ createdAt.toLocaleString(DateTime.DATE_HUGE) }}</span>
    </p>
    <div v-if="post.tags" class="flex flex-wrap gap-2">
      <LanguageTag v-for="tag in post.tags.sort()" :key="tag" :tag="tag" />
    </div>
    <!-- <section class="text-gray-400 leading-6 flex flex-col gap-4">
      <ContentRendererMarkdown :value="post" :excerpt="true" class="markdown" />
    </section> -->
  </article>
</template>
