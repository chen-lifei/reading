import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index'
import Reader from '@/views/reader/index'
import Writer from '@/views/writer/index'
import Children from '@/views/children/index'
import Life from '@/views/life/index'
import Masterpiece from '@/views/masterpiece/index'
import Science from '@/views/science/index'
import Story from '@/views/story/index'
import StoryCategory from '@/views/story/category'
import Login from '@/views/login/login'
import Signup from '@/views/login/signup'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home
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
            component: Story,
            children: [
                {
                    path: 'martialArts',
                    name: 'martialArts',
                    component: StoryCategory
                },
                {
                    path: 'inferential',
                    name: 'inferential',
                    component: StoryCategory
                },
                {
                    path: 'suspense',
                    name: 'suspense',
                    component: StoryCategory
                },
                {
                    path: 'historical',
                    name: 'historical',
                    component: StoryCategory
                },
                {
                    path: 'military',
                    name: 'military',
                    component: StoryCategory
                },
                {
                    path: 'romantic',
                    name: 'romantic',
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
                    path: 'timeTravel',
                    name: 'timeTravel',
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
