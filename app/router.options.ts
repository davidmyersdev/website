import type { RouterOptions } from 'vue-router'

export default <RouterOptions>{
  scrollBehavior(to, from, _savedPosition) {
    // In-page navigation should not be altered.
    if (to.name === from.name && to.path === from.path && to.hash !== from.hash) { return }

    // Navigating to another page should start you at the top of the page.
    return {
      top: 0,
    }
  }
}
