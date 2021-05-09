<template lang="pug">
div.SearchContainer
	input.input.form-control(v-model="query", placeholder="Search")

</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Search',
	data: () => {
		return {}
	},
	methods: {
		...mapActions('cState', [
			'getContacts',
			'search'
		]),
	},
	computed: {
		...mapGetters('cState', {
			storeQuery: 'searchQuery'
		}),
		query: {
			get() {
				return this.$store.state.cState.searchQuery
			},
			set: _.debounce(function(value) {
				if (value && value.length > 0) {
					this.getContacts(value)
					return
				}
				else { //if search field is empty
					this.getContacts()
				}
			}, 500)
		}
	},
}
</script>

<style lang="scss" scoped>

.SearchContainer {
	width: 100%;
	margin-left: 20px;
	margin-right: 20px;
}

</style>