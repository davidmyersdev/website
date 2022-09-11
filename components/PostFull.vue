<script lang="ts" setup>
import { DateTime } from 'luxon'

const { path } = defineProps({ path: String })
</script>

<template>
  <div class="flex flex-col gap-8">
    <ContentDoc :path="path" v-slot="{ doc }">
      <p v-if="doc.series">
        <NuxtLink :to="doc.series.path" class="no-underline">
          <span class="bg-darkest rounded p-2 text-lg">{{ doc.series.name }} (Series)</span>
        </NuxtLink>
      </p>
      <article class="article markdown w-full">
        <header class="flex flex-col gap-4">
          <h1>{{ doc.title }}</h1>
          <p class="text-gray-400">Published on {{ DateTime.fromISO(doc.createdAt).toLocaleString(DateTime.DATE_HUGE) }}</p>
          <div v-if="doc.tags" class="flex flex-wrap gap-2">
            <LanguageTag v-for="tag in doc.tags.sort()" :key="tag" :tag="tag" />
          </div>
        </header>
        <p v-if="doc.banner">
          <a :href="doc.banner.url">
            <img :src="doc.banner.url" :alt="doc.banner.alt">
          </a>
        </p>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
    <Newsletter />
    <Comments />
  </div>
</template>

<style>
@import '~/styles/article.css';
</style>
