<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const email = ref('')
const hasJoined = ref(false)
const joiningFailed = ref(false)
const onJoin = async () => {
  window.fathom?.trackGoal('2REIEMZT', 0)

  const response = await $fetch('/api/email', {
    method: 'post',
    body: {
      email: email.value,
    },
  })

  useStorage('email', '').value = email.value
  hasJoined.value = useStorage('hasJoined', false).value = response.success
  joiningFailed.value = !response.success
}

onMounted(() => {
  email.value = useStorage('email', '').value
  hasJoined.value = useStorage('hasJoined', false).value
})
</script>

<template>
  <section class="flex flex-col gap-2">
    <p class="lg:text-lg">Enjoy my latest posts delivered directly to your inbox</p>
    <form @submit.prevent="onJoin" class="flex gap-2" action="/api/email" method="POST" target="_blank">
      <input v-model="email" :class="{ 'text-gray-600 placeholder:text-gray-600': hasJoined }" class="bg-darkest p-2 rounded flex-grow" :disabled="hasJoined" placeholder="you@null.island" required type="email" />
      <button type="submit" class="px-4 py-2 rounded" :class="{ 'bg-darkest text-gray-600': hasJoined, 'bg-gray-800': !hasJoined }" :disabled="hasJoined">{{ hasJoined ? 'Subscribed' : 'Subscribe' }}</button>
    </form>
    <p v-if="joiningFailed" class="text-xs lg:text-sm text-red-600">An unexpected error has occurred. Please try again.</p>
  </section>
</template>
