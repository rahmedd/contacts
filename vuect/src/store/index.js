import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import localStore from './modules/localStore'
import cState from './modules/cState'

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
		localStore,
		cState,
	},
	
	plugins: [ createPersistedState({
		paths: ['localStore'],
	}) ],

	strict: process.env.NODE_ENV !== 'production'
});