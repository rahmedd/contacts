<template lang="pug">
div.container
	div.btn.ctContainer(v-if="contactList == 0")
		p No contacts found.
	div.btn.ctContainer(
		v-for="contact in contactList"
		:class="{ active: isActive(contact.id) }"
		@click="activateContact(contact.id)"
	)
		// img( :src="`static/${contact.photo}`" class="rounded")
		p {{ `${contact.firstName} ${contact.lastName}` }}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Contactslist',
	data: () => {
		return {}
	},
	methods: {
		...mapActions('cState', [
			'setContact'
		]),

		activateContact(id) {
			this.setContact(id)
		},

		isActive: function(id) {
			return id === this.contactId
		},
	},
	computed: {
		...mapGetters('cState', {
			contactList: 'contactList',
			contactId: 'contactId',
		}),
	}
}
</script>

<style lang="scss" scoped>

.ctContainer {
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 50px;
	width: auto;
	padding-left: 20px;
	padding-right: 5px;
	border: none;
	border-radius: 0;
	box-shadow: none;
	background-color: transparent;
}
.ctContainer:hover {
	background-color: #eeeeee;
}
.dark-mode .ctContainer:hover {
	background-color: black;
	color: white;
}

.ctContainer > img {
	height: 40px;
}

.ctContainer > p {
	font-size: 15px;
	margin-left: 10px;
}

.active {
	background-color: var(--lm-button-primary-bg-color);
	color: white;
}
.dark-mode .active {
	background-color: var(--lm-button-primary-bg-color);
	color: white;
}
.active:hover {
	background-color: var(--lm-button-primary-bg-color);
	color: white;
}
.dark-mode .active:hover {
	background-color: var(--lm-button-primary-bg-color);
	color: white;
}

</style>