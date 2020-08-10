import Vue from 'vue'
import VBodyScrollLock from 'v-body-scroll-lock'

Vue.use(VBodyScrollLock, {
  bodyScrollOptions: {
    allowTouchMove: el => el.closest(['body-scroll-lock-ignore'])
  }
})
