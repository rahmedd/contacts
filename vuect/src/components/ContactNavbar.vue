<template lang="pug">
div
	nav.grid-container
		div.plusBtn
			button.btn.btn-primary(@click="newContact()") +
		div.search
			Search
		//- div.title
		//- 	p Contacts
		div.endBtns
			Navbar

</template>

<script>
import Search from './Search'
import Navbar from './Navbar'

export default {
	name: 'ContactNavbar',
	components: {
		Search,
		Navbar
	},
	methods: {
		newContact() {
			this.$root.$emit('Contact', 'new')
		}
	},
}
</script>

<style lang="scss" scoped>

.grid-container {
	display: grid;
	grid-template-columns: 100px 300px 1fr;
	grid-template-rows: 50px; //height
	gap: 0px 0px;
}

.plusBtn {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;
}

.plusBtn > button {
	width: 100%;
	padding-bottom: 34px; //to fix + vertical alignment
	margin-left: 10px;
	margin-right: 10px;
}

.search {
	display: flex;
	justify-content: left;
	align-items: center;
}

// .title {
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	font-size: 1.75rem;
// 	color: #cccccc;
// 	padding-right: 50px;
// }
// .dark-mode .title {
// 	color: #7c7c7c;
// }

.endBtns {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-right: 10px;
}

</style>