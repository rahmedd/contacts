<template lang="pug">
.div
	div(v-if="showModal" id="myModal" class="modal")
		div.modal-content
			p {{ modalText }}
			div.buttonBar
				button.btn(@click="setResult(false)") Cancel
				button.btn.btn-danger(@click="setResult(true)") Confirm
	
</template>

<script>
export default {
	name: 'Modal',
	props: {
		showModal: Boolean,
		modalText: String
	},
	data: () => {
		return {
			confirm: null
		}
	},
	methods: {
		setResult(status) {
			this.$emit('modalStatus', status)
		}
	},
}
</script>

<style lang="scss" scoped>
.modal {
	// display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0,0,0); /* Fallback color */
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 500px;
}

.buttonBar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}
</style>