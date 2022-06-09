<script lang="ts" setup>
import Giscus from '@giscus/vue'
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
          <div v-if="doc.tags" class="flex gap-2">
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
    <Author />
    <Giscus
      category-id="DIC_kwDOEJxX1s4CPfTZ"
      category="Comments"
      emit-metadata="1"
      input-position="top"
      lang="en"
      mapping="pathname"
      reactions-enabled="1"
      repo-id="MDEwOlJlcG9zaXRvcnkyNzg2ODE1NTg="
      repo="voraciousdev/website"
      theme="transparent_dark"
    />
  </div>
</template>

<style>
@import '~/styles/article.css';
</style>
