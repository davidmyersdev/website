---
title: 'How to check if you are on the client or the server in Vue'
tags: [TypeScript, Vue]
createdAt: 2023-06-17T11:15:31.572Z
updatedAt: 2023-06-17T11:15:31.572Z
---

This is a quick tip for how to check if you are on the client or the server in a Vue project. Between supporting server-side rendering (SSR) and writing Vue libraries that work in all environments, there are some good reasons to consider using this.

<!-- more -->

Here is the implementation.

```ts [/src/helpers/environment.ts]
export const isClient = typeof window !== 'undefined'
export const isServer = typeof window === 'undefined'

export const onClient = (callback: () => void) => {
  if (isClient) {
    callback()
  }
}

export const onServer = (callback: () => void) => {
  if (isServer) {
    callback()
  }
}
```

There are a lot of useful things you can do with this, but one of the most common is to check if you are on the client before you try to access the `window` object.

```vue [/src/components/scroll-listener.vue]
<script lang="ts" setup>
import { onClient } from '/src/helpers/environment'

onClient(() => {
  window.addEventListener('scroll', () => {
    // do something on scroll
  })
})
</script>
```

Another use case is restricting a component to load only on the client or only on the server.

```vue [/src/components/client-only.vue]
<script lang="ts" setup>
import { isClient } from '/src/helpers/environment'
</script>

<template>
  <slot v-if="isClient" />
</template>
```

```vue [/src/components/server-only.vue]
<script lang="ts" setup>
import { isServer } from '/src/helpers/environment'
</script>

<template>
  <slot v-if="isServer" />
</template>
```

```vue [/src/components/conditional.vue]
<script lang="ts" setup>
import ClientOnly from '/src/components/client-only.vue'
import ServerOnly from '/src/components/server-only.vue'
</script>

<template>
  <section>
    <ClientOnly>
      <p>This will only be rendered on the client.</p>
    </ClientOnly>
    <ServerOnly>
      <p>This will only be rendered on the server.</p>
    </ServerOnly>
  </section>
</template>
```

For more examples of when you might want to perform checks like this, read the [Vue docs on SSR](https://vuejs.org/guide/scaling-up/ssr.html).

What are you using this for? I'd love to hear about it below. Thanks for reading, and happy coding. ✌️
