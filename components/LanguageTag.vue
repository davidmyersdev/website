<script lang="ts" setup>
const props = defineProps<{ tag: string }>()

interface LanguageDefinition {
  aliases: string[],
  values: [number, number, number],
}

const colorMaps: Record<string, LanguageDefinition> = {
  css: {
    aliases: [],
    values: [122, 121, 194],
  },
  git: {
    aliases: [],
    values: [241, 78, 50],
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
const color = computed(() => {
  const lowerTag = props.tag.toLowerCase()
  const colorMap = colorMaps[lowerTag] || Object.values(colorMaps).find(map => map.aliases.includes(lowerTag)) || {
    values: [160, 160, 160],
  }

  return colorMap.values.join(', ')
})
const style = computed(() => {
  return {
    color: `rgb(${color.value})`,
    backgroundColor: `rgba(${color.value}, 0.2)`,
  }
})
</script>

<template>
  <span class="px-2 lg:text-lg text-[#a6accd] rounded" :style="style">
    {{ tag }}
  </span>
</template>
