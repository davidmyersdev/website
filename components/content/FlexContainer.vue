<template>
  <div class="embed container flex">
    <slot />
  </div>
</template>

<style>
  .container {
    --container-bg-color: rgb(68, 61, 89);
    --item-bg-color: rgb(130, 102, 131);
    --item-highlighted-bg-color: rgb(122, 121, 194);
    --text-color: #eee;

    background-color: var(--container-bg-color);
    border-radius: 0.25rem;
    color: var(--text-color);
    font-size: clamp(0.75rem, 2vw, 1rem);
    gap: 0.125em;
    overflow: scroll;
    padding: 0.25em;
    min-height: 6em;

    counter-reset: item;
  }

  .item {
    counter-increment: item;
  }
</style>
