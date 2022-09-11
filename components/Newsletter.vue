<template>
  <section class="flex flex-col gap-2">
    <p class="lg:text-lg">Stay current in the evolving world of web development.</p>
    <form class="flex gap-2" action="https://www.getrevue.co/profile/voracious/add_subscriber" method="POST" target="_blank">
      <input class="bg-darkest p-2 rounded flex-grow" name="member[email]" placeholder="hello@voracious.dev" type="email" />
      <button type="submit" class="bg-gray-800 px-4 py-2 rounded">Join</button>
    </form>
    <p class="text-xs lg:text-sm text-gray-500">I use Revue for my newsletter. See their <a class="underline" href="https://www.getrevue.co/terms" target="_blank">terms of service</a> and <a class="underline" href="https://www.getrevue.co/privacy" target="_blank">privacy policy</a>.</p>
  </section>
</template>
