<template lang="pug">
div.SearchContainer
	input.input.form-control(v-model="query", placeholder="Search")

</template>

<script>
import _ from 'lodash'

export default {
	name: 'Search',
	data: () => {
		return {
			query: null,
		}
	},
	methods: {
		sendSearch() {
			this.$root.$emit('ContactsList', 'search', this.query)
		},
	
		sendGetAll() {
			this.$root.$emit('ContactsList')
			console.log('searchcomponetn')
		},
		
		//clear search input when AlphaSort is used
		recieveQuery() {
			this.$root.$on('ContactsList', (queryType, query) => {
				if (queryType === 'alphasort') {
					this.query = null
				}
			})
		},
	},
	watch: {
		query: _.debounce(function () {
			if (this.query && this.query.length > 0) {
				this.sendSearch()
			}
			else if (this.query === ''){
				this.sendGetAll()
			}
		}, 500)
	},
	mounted: function() {
		this.recieveQuery()
	}
}
</script>

<style lang="scss" scoped>

.SearchContainer {
	width: 100%;
	margin-left: 20px;
	margin-right: 20px;
}

</style>