import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import seller from '@/components/seller/seller'
import goods from '@/components/goods/goods'
import ratings from 'components/ratings/ratings'
import test from 'components/test/test'
import test2 from 'components/test2/test2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/seller'
    },
    {
      path:"/seller",
      component:seller
    },
    {
      path:"/goods",
      component:goods
    },
    {
      path:"/ratings",
      component:ratings
    },
    {
      path:"/test",
      component:test
    },
    {
      path:"/test2",
      component:test2
    }
  ],
  "linkActiveClass":"active"
})
