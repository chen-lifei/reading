import Vue from 'vue'
import Router from 'vue-router'
import Reader from '@/views/reader/index'
import Writer from '@/views/writer/index'
import Children from '@/views/children/index'
import Life from '@/views/life/index'
import Masterpiece from '@/views/masterpiece/index'
import Science from '@/views/science/index'
import Story from '@/views/story/index'
import Login from '@/views/login/login'
import Signup from '@/views/login/signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/masterpiece'
    },
    {
      path: '/reader',
      name: 'reader',
      component: Reader
    },
    {
      path: '/writer',
      name: 'writer',
      component: Writer
    },
    {
      path: '/masterpiece',
      name: 'masterpiece',
      component: Masterpiece
    },
    {
      path: '/story',
      name: 'story',
      component: Story
    },
    {
      path: '/children',
      name: 'children',
      component: Children
    },
    {
      path: '/life',
      name: 'life',
      component: Life
    },
    {
      path: '/science',
      name: 'science',
      component: Science
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
