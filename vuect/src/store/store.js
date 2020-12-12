import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		status: '',
		login: false,
		user: {}
	},
	mutations: {
		auth_request(state) {
            state.status = 'loading'
		},
        auth_success(state) {
            state.status = 'success'
			state.login = true
        },
        auth_error(state) {
			state.status = 'error'
			state.login = false
        },
        logout(state) {
            state.status = ''
			state.login = false
        },
	},
	actions: {

	},
	getters: {
		isLoggedIn: state => state.login,
		authStatus: state => state.status,
	},
	plugins: [createPersistedState()]
})