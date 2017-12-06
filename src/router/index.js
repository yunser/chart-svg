import Vue from 'vue'
import Router from 'vue-router'

const Editor = resolve => require(['@/components/Editor'], resolve)
const Help = resolve => require(['@/components/Help'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Editor
    },
    {
        path: '/help',
        component: Help,
        meta: {
            title: 'Shapes 手册'
        }
    }
]

export default new Router({
    mode: 'history',
    routes: routes
})
