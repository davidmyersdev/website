const blogPosts = [
  '/a-guide-to-customizing-the-zsh-shell-prompt',
  '/a-guide-to-installing-the-windows-subsystem-for-linux-wsl-and-windows-terminal',
  '/a-guide-to-web-development-on-the-windows-subsystem-for-linux-wsl',
  '/a-practical-cheat-sheet-for-css-flexbox',
  '/a-practical-guide-to-the-web-cryptography-api',
  '/an-introduction-to-vue-markdown-editor',
]

export default defineNuxtRouteMiddleware((to) => {
  if (blogPosts.includes(to.path)) {
    return '/blog' + to.path
  }
})
