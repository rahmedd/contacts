import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Contacts from '../views/Contacts.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {requiresAuth: false}
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	},
	{
		path: '/contacts',
		name: 'Contacts',
		component: Contacts,
		meta: {requiresAuth: true}
	},

	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: function () {
			return import(/* webpackChunkName: "about" */ '../views/About.vue')
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => 
{
    let currentUser = store.getters['localStore/isLoggedIn']
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);


    if (requiresAuth && !currentUser) {
        next('/login')
    } 

    else {
        next()
    }

})

export default router
