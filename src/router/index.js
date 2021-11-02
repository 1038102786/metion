import Vue from 'vue'
import Router from 'vue-router'
import myInput from '@/myInput.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'myInput',
      component: myInput
    }
  ]
})
