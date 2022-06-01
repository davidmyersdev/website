<template>
  <div class="item"></div>
</template>

<style>
  .item {
    --container-bg-color: rgb(68, 61, 89);
    --item-bg-color: rgb(130, 102, 131);
    --item-highlighted-bg-color: rgb(122, 121, 194);
    --text-color: #eee;

    background-color: var(--item-bg-color);
    border-radius: 0.25rem;
    padding: 0.5em 1em;
    text-transform: uppercase;

    display: inline-flex;
    align-items: center;
  }

  .item.highlighted {
    background-color: var(--item-highlighted-bg-color);
  }

  .item::before {
    content: counter(item);
  }
</style>
