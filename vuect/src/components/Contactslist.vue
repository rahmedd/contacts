<template lang="pug">
div.container
	div.btn.ctContainer(v-if="noContactsFound")
		p No contacts found.
	div.btn.ctContainer(
		v-for="contact in contacts"
		:class="{ active: isActive(contact.id) }"
		@click="activateContact(contact.id)"
	)
		// img( :src="`static/${contact.photo}`" class="rounded")
		p {{ `${contact.firstName} ${contact.lastName}` }}

</template>

<script>
import axios from 'axios'

export default {
	name: 'Contactslist',
	data: () => {
		return {
			contacts: [],
			active: null,
			searchMode: false
		}
	},
	methods: {
		contactSort() {
			this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName))
		},

		activateContact(id) {
			this.active = id
			this.$root.$emit('Contact', 'view', id) //emit event to contact with id
		},

		isActive: function(id) {
			if(id === this.active) {
				return true
			}
			return false
		},

		async getAllContacts() {
			try {
				const contacts = await axios.get(`/api/contacts`)
				this.contacts = contacts.data.o
				this.contactSort()
			}
			catch (err) {
				this.handleError(err)
			}
		},
		
		async getContactsSearch(searchQuery) {
			try {
				const contacts = await axios.get(`/api/contacts/${searchQuery}`)
				this.contacts = contacts.data.o
			}
			catch (err) {
				this.handleError(err)
			}
		},

		recieveQuery() {
			this.$root.$on('ContactsList', (queryType, query) => {
				//search
				if (queryType === 'search') {
					this.searchMode = true
					this.getContactsSearch(query)
				}

				//single letter (alphabetically)
				else if (queryType === 'alphasort') {
					this.searchMode = false
					this.active = null
					this.getContactsSearch(query)
				}

				//select id
				else if (queryType === 'selectId') {
					this.active = query
				}

				//get all
				else {
					if (this.searchMode === false) {
						this.getAllContacts()
					}
				}
			})
		},
	},
	computed: {
		noContactsFound: function() {
			if (this.contacts && this.contacts.length === 0) {
				return true
			}
			return false
		},
	},
	mounted: async function() {
		this.recieveQuery()
		await this.getAllContacts()
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