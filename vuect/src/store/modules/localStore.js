const state = () => ({
	status: '',
	login: false,
	user: {}
})

const mutations = {
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
}

const actions = {
	authError({ commit }) {
		console.log('autherror commit debug run')
		commit('auth_error')
	}
}

const getters = {
	isLoggedIn: state => state.login,
	authStatus: state => state.status,
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}