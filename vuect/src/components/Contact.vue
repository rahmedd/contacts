<template lang="pug">
div.contactContainer
	Modal(
	:showModal="showDeleteModal" 
	:modalText=" `Are you sure you want to delete this contact?` "
	@modalStatus="deleteModalStatus"
	)

	div(v-if="contact")
		div.blockContainer
			// labels
			div.labelContainer
				small First Name
				small Last Name
			// Name input fields
			div.doubleContainer
				input.form-control(
					v-if="contact.firstName !== null"
					v-model="contact.firstName"
					placeholder='First Name'
				)

				input.form-control(
					v-if="contact.lastName !== null"
					v-model="contact.lastName"
					placeholder='Last Name'
				)

		div.blockContainer
			// number/label labels
			div.labelContainer
				small Number
				small Label
			// number input fields
			div.doubleContainer(v-for="number in contact.number")
				input.form-control(
					v-model="number.number"
					placeholder='Number'
				)
				input.form-control(
					v-model="number.label"
					placeholder='Label'
				)
				div(@click="deleteNumber(number)")
					iconify-icon.destroy(data-icon="eva:close-circle-fill" data-width="24")

			a(@click="addNumber()") + Add Number
				
		div.blockContainer
			div.labelContainer
				small Email
			div.singleContainer(
					v-for="email in contact.email"
				)
				input.form-control(	
					v-model="email.email"
					placeholder='Email'
				)
				div(@click="deleteEmail(email)")
					iconify-icon.destroy(data-icon="eva:close-circle-fill" data-width="24")
			a(@click="addEmail()") + Add Email

		div.buttonBar(v-if="editMode")
			div
				button.btn.btn-danger(@click="showDeleteModal = true") Delete
			div
				//- button.btn(@click="editMode = false") Cancel
				button.btn.btn-primary(@click="saveContact()") Save
		div(v-else).buttonBar
			div
				//- button.btn Share
			div
				button.btn.btn-primary(@click="editMode = true") Edit


				
	div(v-else)
		h3 Select a contact

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import Modal from './Modal'

export default {
	name: 'Contact',
	components: {
		Modal,
	},
	data: () => {
		return {
			contact: null,
			// updateObj: null, //use when update route is seperate
			deleteObj: {
				id: null,
				number: [],
				email: [],
				photo: '0'
			},
			editMode: true, //change when edit mode is added
			showDeleteModal: false,
		}
	},
	methods: {
		...mapActions('cState', [
			'getContacts',
			'refreshContacts',
			'setContact'
		]),
		
		//refresh ContactList & currently loaded contact
		refresh(refreshType) {
			// this.$root.$emit('ContactsList')
			this.deleteObj = {
				id: null,
				number: [],
				email: [],
				photo: '0'
			}
			if (refreshType === 'reset') { // no contact obj - "select a contact"
				this.contact = null
			}
			else if (refreshType === 'new') { //new "blank" contact obj
				this.contact = {
					id: null,
					email: [],
					number: [],
					photo: '0'
				}
				this.addNumber()
				this.addEmail()
			}
			else { //refresh currently viewed contact
				this.getContact(this.contact.id)
				this.$root.$emit('ContactsList', 'selectId', this.contact.id)
			}
		},

		async getContact(id) {
			try {
				const contact = await axios.get(`/api/contact/${id}`)
				this.contact = contact.data.o

			}
			catch (err) {
				this.handleError(err)
			}
		},

		async saveContact() {
			try {
				if (this.contact.id) { // update
					const res = await axios.put(`/api/contact/`, this.contact)
				}
				else { // create
					try {
						const res = await axios.post(`/api/contact/`, this.contact)
						this.contact.id = res.data.o.id
						this.setContact(this.contact.id) // sets vuex contactId to component contactId
					}
					catch(err) {
						this.handleError(err)
					}
				}
				// delete field(s)
				if (this.deleteObj.email.length > 0 || this.deleteObj.number.length > 0) {
					this.deleteObj.id = this.contact.id

					try {
						await axios.post(`/api/contact/fields`, this.deleteObj)
					}
					catch(err) {
						this.handleError(err)
					}
				}

				this.$toast.success("Saved")

				this.refreshContacts() // refresh contacts list with currently selected letter or query
			}
			catch (err) {
				this.handleError(err)
				this.$toast.error("Error saving!")
			}
			finally {
				this.refresh()
			}
		},

		async deleteContact() {
			try {
				if(this.contact.id) {
					await axios.delete(`/api/contact/${ this.contact.id }`)
					// this.$root.$emit('ContactsList') //refresh contact list
					this.refresh('reset')
				}
				this.$toast.warning("Contact deleted")
			}
			catch(err) {
				this.handleError()
				this.$toast.error("Error deleting contact!")
			}
			finally {
				this.refreshContacts()
			}
		},

		addNumber() {
			const numbers = this.contact.number
			const lastNumField = numbers[numbers.length - 1]
			
			//if last number field in array exists and (if last numberfield or label are not empty)
			if (lastNumField && (lastNumField.number.length > 0 || lastNumField.label.length > 0) ){
				this.contact.number.push( { number: "", label: "" } )
			}
			else if (numbers.length === 0) { //if there are no number fields at all
				this.contact.number.push( { number: "", label: "" } )
			}
		},

		addEmail() {
			const emails = this.contact.email
			const lastEmailField = emails[emails.length - 1]

			//if last email field in array exists and if last email field is not empty
			if (lastEmailField && lastEmailField.email.length > 0) {
				this.contact.email.push( { email: "" } )
			}
			else if (emails.length === 0) { //if there are no email fields at all
				this.contact.email.push( { email: "" } )
			}
		},

		deleteNumber(num) {
			if (num.id) {
				this.deleteObj.number.push(num)
			}
			this.contact.number.splice(this.contact.number.indexOf(num), 1)
		},

		deleteEmail(email) {
			if (email.id) {
				this.deleteObj.email.push(email)
			}
			this.contact.email.splice(this.contact.email.indexOf(email), 1)
		},

		deleteModalStatus(status) {
			if (status === true) {
				this.deleteContact()
			}
			this.showDeleteModal = false
		},
	},

	computed: {
		...mapGetters('cState', {
			contactId: 'contactId',
			allMode: 'allMode',
			viewMode: 'viewMode',
		})
	},

	watch: {
		contactId: function () {
			if (this.contactId === 0 && !this.viewMode) {
				this.refresh('new')
			}
			else if (this.contactId && this.viewMode) {
				this.getContact(this.contactId)
			}
		},

		// viewMode: function() {
		// 	if (!this.viewMode && this.contactId === null) {
		// 		this.refresh('new')
		// 	}
		// }
	},
}
</script>

<style lang="scss" scoped>
.contactContainer {
	padding-left: 20px;
}

.singleContainer {
	display: grid;
	grid-template-columns: 1fr 50px;
	grid-auto-rows: auto;
	gap: 0px 0px;
	margin-bottom: 10px;
}

// .singleContainer > input{
// 	margin-bottom: 10px;
// }

.doubleContainer, .labelContainer {
	display: grid;
	grid-template-columns: 1fr 1fr 50px;
	grid-auto-rows: auto;
	gap: 0px 0px;
}

.doubleContainer {
	margin-bottom: 10px;
}

.doubleContainer > * , .singleContainer > * {
	width: auto;
	margin-right: 8px;
}

.labelContainer > small{
	margin-left: 2px;
	font-size: 1.7rem;
	margin-bottom: 2px;
}

.blockContainer {
	margin-bottom: 25px;
}

a:hover {
	cursor: pointer;
	text-decoration: none;
}

.destroy {
	margin-top: 4px;
	color: #ff4d4f;
}
.destroy:hover {
	cursor: pointer;
	color: #ff7375;
}
.destroy:active {
	color: #d33f42;
}

.buttonBar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 10px;
}

.buttonBar > div > button {
	margin-right: 10px;
}

.btn {
	-moz-box-shadow: none;
	-webkit-box-shadow: none;
	box-shadow: none;
}



// edit mode to be added
// .form-control.disabled, .form-control.disabled:hover, .form-control:disabled, .form-control:disabled:hover {
//	 opacity: 1;
//	 color: var(--lm-input-text-color-disabled);
//	 background-color: transparent;
//	 border: none;
// 	padding-left: 0;
// }

</style>