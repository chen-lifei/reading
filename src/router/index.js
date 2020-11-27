import Vue from 'vue'
import Router from 'vue-router'
import Reader from '@/views/reader/index'
import Writer from '@/views/writer/index'
import Children from '@/views/children/index'
import Life from '@/views/life/index'
import Masterpiece from '@/views/masterpiece/index'
import Science from '@/views/science/index'
import Story from '@/views/story/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/masterpiece'
    },
    {
      path: '/reader',
      name: '作者专区',
      component: Reader
    },
    {
      path: '/writer',
      name: '读者专区',
      component: Writer
    },
    {
      path: '/masterpiece',
      name: '名著区域',
      component: Masterpiece
    },
    {
      path: '/story',
      name: '小说区域',
      component: Story
    },
    {
      path: '/children',
      name: '儿童区域',
      component: Children
    },
    {
      path: '/life',
      name: '生活区域',
      component: Life
    },
    {
      path: '/science',
      name: '科普区域',
      component: Science
    }
  ]
})
