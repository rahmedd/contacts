<template lang="pug">
	div
		ContactNavbar

		div.bodyContainer
			Alphasort.leftContainer
			Contactslist.middleContainer
			Contact.rightContainer
</template>

<script>
import Alphasort from '../components/Alphasort.vue'
import Contactslist from '../components/Contactslist.vue'
import Contact from '../components/Contact.vue'
import Search from '../components/Search'
import ContactNavbar from '../components/ContactNavbar'

import axios from 'axios'

export default {
	name: 'Contacts',
	components: {
		Alphasort,
		Contactslist,
		Contact,
		Search,
		ContactNavbar
	},
	data: () => {
		return {
			msg: 'some message',
			items: [
				{ id: 2, msg: 'successfully logged in', color: 'alert-success'},
				{ id: 3, msg: 'login expired, please log in', color: 'alert-secondary'},
				{ id: 1, msg: 'invalid login', color: 'alert-danger'}
			],
			contacts: []
		}
	},
}
</script>

<style lang="scss" scoped>

.bodyContainer {
	display: grid;
	// grid-template-columns: 1fr 2fr 3fr;
	grid-template-columns: 100px 300px 500px;
	grid-template-rows: 1fr;
	gap: 0px 0px;
	height: calc(100vh - 50px);
}

.leftContainer, .rightContainer, .middleContainer {
	overflow-y: scroll;	
	//border: solid yellow 2px;
	// box-shadow: 0 0 16px rgba(0,0,0,.2);
}

//scroll bar stuff
.bodyContainer > div::-webkit-scrollbar {
	width: 5px;
}
.bodyContainer > div{
	scrollbar-width: none; //scrollbar bug - fix this for firefox
	scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}

.bodyContainer > div::-webkit-scrollbar-track {
	background: #f8f8f8;
}
.dark-mode .bodyContainer > div::-webkit-scrollbar-track {
	background: #212427;
}

.bodyContainer > div::-webkit-scrollbar-thumb {
	background-color: #dddddd;
	border-radius: 6px;
}
.dark-mode .bodyContainer > div::-webkit-scrollbar-thumb {
	background-color: #6f6f70;
}

</style>