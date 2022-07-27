import Vue from 'vue'
import VueRouter from 'vue-router'
import Environment from '../views/environment.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'index',
        meta: {
            title: '高新·天谷雅舍智能监测大屏'
        },
        component: () =>
            import ('../views/index.vue'),
        children: [{
                path: '/',
                name: 'view',
                meta: {
                    index: 0
                },
                component: () =>
                    import ('../views/view.vue')
            },
            {
                path: '/Meter',
                name: 'Meter',
                meta: {
                    index: 0
                },
                component: () =>
                    import ('../views/Meter.vue')
            },
            {
                path: '/Environment',
                name: 'Environment',
                meta: {
                    index: 0
                },
                component: Environment
            }


        ]

    },

]
const router = new VueRouter({
    routes
})

export default router