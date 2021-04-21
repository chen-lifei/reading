import Vue from 'vue'
import Router from 'vue-router'
import Reader from '@/views/reader/index'
import Children from '@/views/children/index'
import Science from '@/views/science/index'

import Masterpiece from '@/views/masterpiece/index'
import Story from '@/views/story/index'

import Book from '@/components/Book/Book.vue'
import Read from '@/components/Read.vue'
import BookList from '@/components/Booklist.vue'

import Login from '@/views/login/login'
import Signup from '@/views/login/signup'

Vue.use(Router)

/* const originalPush = Router.prototype.replace
Router.prototype.replace = function replace (location) {
    return originalPush.call(this, location).catch(err => err)
} */

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            meta: { isAuth: true },
            redirect: '/masterpiece'
        },
        {
            path: '/reader',
            name: 'reader',
            meta: { isAuth: true },
            component: Reader
        },
        {
            path: '/masterpiece',
            name: 'masterpiece',
            meta: { isAuth: true },
            component: Masterpiece,
            children: [
                {
                    path: 'poem',
                    name: 'masPoem',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "masterpieceCategory" */'@/views/masterpiece/category')
                },
                {
                    path: 'prose',
                    name: 'masProse',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "masterpieceCategory" */'@/views/masterpiece/category')
                },
                {
                    path: 'story',
                    name: 'masStory',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "masterpieceCategory" */'@/views/masterpiece/category')
                }
            ]
        },
        {
            path: '/story',
            name: 'story',
            meta: { isAuth: true },
            component: Story,
            children: [
                {
                    path: 'classical',
                    name: 'classical',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "storyCategory" */'@/views/story/category')
                },
                {
                    path: 'suspense',
                    name: 'suspense',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "storyCategory" */'@/views/story/category')
                },
                {
                    path: 'inferential',
                    name: 'inferential',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "storyCategory" */'@/views/story/category')
                },
                {
                    path: 'history',
                    name: 'history',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "storyCategory" */'@/views/story/category')
                },
                {
                    path: 'scienceFiction',
                    name: 'scienceFiction',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "storyCategory" */'@/views/story/category')
                },
                {
                    path: 'fantasy',
                    name: 'fantasy',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "storyCategory" */'@/views/story/category')
                },
                {
                    path: 'romantic',
                    name: 'romantic',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "storyCategory" */'@/views/story/category')
                },
                {
                    path: 'supernatural',
                    name: 'supernatural',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "storyCategory" */'@/views/story/category')
                },
                {
                    path: 'martial',
                    name: 'martial',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "storyCategory" */'@/views/story/category')
                },
                {
                    path: 'other',
                    name: 'other',
                    meta: { isAuth: true },
                    component: () =>
                        import(/* webpackChunkName: "storyCategory" */'@/views/story/category')
                }
            ]
        },
        {
            path: '/children',
            name: 'children',
            meta: { isAuth: true },
            component: Children
        },
        {
            path: '/science',
            name: 'science',
            meta: { isAuth: true },
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
        },
        {
            path: '/book',
            name: 'book',
            meta: { isAuth: true },
            component: Book
        },
        {
            path: '/read',
            name: 'read',
            meta: { isAuth: true },
            component: Read
        },
        {
            path: '/booklist',
            name: 'booklist',
            meta: { isAuth: true },
            component: BookList
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        const token = localStorage.getItem('readingToken')
        if (token) {
            next()
        } else {
            next({
                name: 'login'
            })
        }
    } else {
        next()
    }
})

export default router
