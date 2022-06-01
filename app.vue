<script setup>
const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <nav class="flex flex-col justify-between bg-darkest mb-12 gap-4 lg:mb-20 lg:gap-8 lg:flex-row">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <NuxtLink class="p-4" to="/">The Voracious Developer</NuxtLink>
      </div>
      <button class="flex items-center p-4 lg:hidden" @click="toggleMenu">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <div :class="{ 'hidden': !showMenu }" class="flex flex-col items-center lg:flex lg:flex-row">
      <a class="p-4" href="https://twitter.com/voraciousdev" rel="noopener" target="_blank">Twitter</a>
      <a class="p-4" href="https://github.com/voraciousdev" rel="noopener" target="_blank">GitHub</a>
      <a class="p-4" href="https://octo.app" rel="noopener" target="_blank">Octo</a>
      <NuxtLink class="p-4" to="/sheets">Cheat Sheets</NuxtLink>
    </div>
  </nav>
  <main class="px-5 pb-24 text-sm max-w-[75ch] mx-auto lg:text-base">
    <NuxtPage />
  </main>
</template>

<style>
@import '~/styles/main.css';
</style>
