<script lang="ts" setup>
const { tag } = defineProps({ tag: String })

const colorMaps = {
  css: {
    aliases: [],
    values: [122, 121, 194],
  },
  javascript: {
    aliases: ['js'],
    values: [241, 224, 90],
  },
  linux: {
    aliases: [],
    values: [233, 84, 32],
  },
  powershell: {
    aliases: ['windows'],
    values: [0, 103, 184],
  },
  ruby: {
    aliases: ['rb'],
    values: [204, 52, 45],
  },
  shell: {
    aliases: ['bash', 'zsh'],
    values: [137, 224, 81],
  },
  til: {
    aliases: [],
    values: [166, 172, 205],
  },
  typescript: {
    aliases: ['ts'],
    values: [43, 116, 137],
  },
  vue: {
    aliases: [],
    values: [65, 184, 131],
  },
}
const colorMap = colorMaps[tag] || Object.values(colorMaps).find(map => map.aliases.includes(tag)) || {
  values: [160, 160, 160],
}
const color = colorMap.values.join(', ')
const style = {
  color: `rgb(${color})`,
  backgroundColor: `rgba(${color}, 0.2)`,
}
</script>

<template>
  <span class="px-2 lg:text-lg text-[#a6accd] rounded" :style="style">
    {{ tag }}
  </span>
</template>
