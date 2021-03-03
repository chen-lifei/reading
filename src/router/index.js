import Vue from 'vue'
import Router from 'vue-router'
import Reader from '@/views/reader/index'
import Writer from '@/views/writer/index'
import Children from '@/views/children/index'
import Life from '@/views/life/index'
import Science from '@/views/science/index'

import Masterpiece from '@/views/masterpiece/index'
import MasterpieceCategory from '@/views/masterpiece/category'

import Story from '@/views/story/index'
import StoryCategory from '@/views/story/category'

import Login from '@/views/login/login'
import Signup from '@/views/login/signup'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
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
            component: Masterpiece,
            children: [
                {
                    path: 'poem',
                    name: 'masPoem',
                    component: MasterpieceCategory
                },
                {
                    path: 'prose',
                    name: 'masProse',
                    component: MasterpieceCategory
                },
                {
                    path: 'story',
                    name: 'masStory',
                    component: MasterpieceCategory
                }
            ]
        },
        {
            path: '/story',
            name: 'story',
            component: Story,
            children: [
                {
                    path: 'classical',
                    name: 'classical',
                    component: StoryCategory
                },
                {
                    path: 'suspense',
                    name: 'suspense',
                    component: StoryCategory
                },
                {
                    path: 'inferential',
                    name: 'inferential',
                    component: StoryCategory
                },
                {
                    path: 'history',
                    name: 'history',
                    component: StoryCategory
                },
                {
                    path: 'scienceFiction',
                    name: 'scienceFiction',
                    component: StoryCategory
                },
                {
                    path: 'fantasy',
                    name: 'fantasy',
                    component: StoryCategory
                },
                {
                    path: 'romantic',
                    name: 'romantic',
                    component: StoryCategory
                },
                {
                    path: 'supernatural',
                    name: 'supernatural',
                    component: StoryCategory
                },
                {
                    path: 'martial',
                    name: 'martial',
                    component: StoryCategory
                },
                {
                    path: 'other',
                    name: 'other',
                    component: StoryCategory
                }
            ]
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
