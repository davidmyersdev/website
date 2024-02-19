<script setup>
const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <nav class="flex flex-col justify-between bg-darkest mb-12 gap-2 lg:mb-20 lg:gap-8 lg:flex-row sticky top-0 z-10">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <NuxtLink class="p-4" to="/">David Myers | Dev</NuxtLink>
      </div>
      <button class="flex items-center p-4 lg:hidden" @click="toggleMenu">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <div :class="{ 'hidden': !showMenu }" class="flex flex-col items-center gap-2 pb-4 lg:flex lg:flex-row lg:pb-0">
      <a class="p-4" href="https://github.com/davidmyersdev" rel="noopener" target="_blank">GitHub</a>
      <a class="p-4" href="https://linkedin.com/in/davidmyersdev" rel="noopener" target="_blank">LinkedIn</a>
      <a class="p-4" href="https://octo.app" rel="noopener" target="_blank">Octo</a>
      <a class="m-2 px-2 py-1 inline-flex items-center gap-2 bg-[#FF5E5B] rounded text-white" href="https://ko-fi.com/davidmyersdev" rel="noopener" target="_blank">
        <img src="/assets/kofi-logo.png" class="h-[1em]" />
        <span>Support me on Ko-fi</span>
      </a>
    </div>
  </nav>
  <main class="px-5 pb-24 text-sm max-w-[75ch] w-full mx-auto lg:text-base">
    <NuxtPage />
  </main>
</template>

<style>
@import '~/styles/fonts.css';
@import '~/styles/main.css';
@import '~/styles/markdown.css';
</style>
