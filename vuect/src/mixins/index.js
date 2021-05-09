import store from '../store'
import router from '../router'

export default {
	handleError: function (err) {
		console.error(err)
		if (err.response && err.response.status === 401) {
			store.dispatch('localStore/authError')
			router.push('/login').catch(()=>{});
		}
	}
}