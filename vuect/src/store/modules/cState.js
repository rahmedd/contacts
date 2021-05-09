import axios from 'axios'
import mixins from '@/mixins/index'

const state = () => ({
	allMode: true, // all OR some
	viewMode: false, // view OR new
	letter: null,
	searchQuery: null,
	contactId: null, // 0-new, null-none, n > 0 - valid contact ID
	contactList: []
})

const mutations = {
	search(state, query) {
		//defaults
		state.allMode = false
		state.letter = null
		//changes
		state.searchQuery = query
	},
	
	all(state) {
		//defaults
		state.letter = null
		state.searchQuery = null
		//changes
		state.allMode = true
	},

	setContact(state, contactId) {
		//defaults
		// state.letter = null
		// state.searchQuery = null
		//changes
		// state.allMode = true
		state.viewMode = true
		state.contactId = contactId
	},

	setNewContact(state) {
		state.contactId = 0
		state.viewMode = false
	},

	setList(state, list) {
		//changes
		state.contactList = list
	},

	setLetter(state, letter) {
		//defaults
		state.searchQuery = null
		// state.contactId = null
		//changes
		state.allMode = false
		state.letter = letter
	}
}

const actions = {
	async getContacts({ commit }, query) {
		// debugger
		let contacts = {}
		try {
			if (query) {
				if (query.length > 1) { // search
					commit('search', query)
				}
				else { // alphabet
					commit('setLetter', query)
				}

				const res = await axios.get(`/api/contacts/${query}`)
				contacts = res.data.o
			}
			//all
			else {
				commit('all')
				const res = await axios.get(`/api/contacts`)
				contacts = res.data.o
			}

			contacts.sort(
				function(a, b) {
					if (a.firstName) {
						return a.firstName.localeCompare(b.firstName)
					}
					return a.lastName.localeCompare(b.firstName)
				}
			)

			commit('setList', contacts)
		}
		catch (err) {
			mixins.handleError(err)
		}		
	},

	async refreshContacts({ dispatch, state }) {
		// current letter
		if (state.letter) {
			dispatch('getContacts', state.letter)
		}
		// current searchQuery
		else if (state.searchQuery) {
			dispatch('getContacts', state.searchQuery)
		}
		// otherwise, refresh all
		else {
			dispatch('getContacts')
		}
	},

	setContact({ commit }, contactId) {
		commit('setContact', contactId)
	},

	setAll({ commit }) {
		commit('all')
	},

	setNewContact({ commit }) {
		commit('setNewContact')
	}

}

const getters = {
	allMode: state => state.allMode,
	viewMode: state => state.viewMode,
	letter: state => state.letter,
	contactId: state => state.contactId,
	contactList: state => state.contactList,
	searchQuery: state => state.searchQuery,

	// search(query) {
	// 	if (query.length > 0) {
			
	// 	}
	// },
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}