<template lang="pug">
div
	div.Alphasort
		div.btnContainer(@click="activateAllBtn()" :class="{ active: this.allMode === true }" ) all
		
		div.btnContainer(
			v-for="letter in letters"
			:class="{ active: isActive(letter) }"
			@click="activateLetter(letter)"
		) {{ letter }}
		
	//- div.AlphaOverlay
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Alphasort',
	data: () => {
		return {
			letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		}
	},
	methods: {
		...mapActions('cState', {
			getContacts: 'getContacts',
			setAll: 'setAll'
		}),
		
		activateLetter(letter){
			this.getContacts(letter)
		},

		isActive: function(letter) {
			return letter === this.letter
		},

		activateAllBtn() {
			this.getContacts()
			this.setAll()
		},

	},
	computed: {
		...mapGetters('cState', {
			allMode: 'allMode',
			letter: 'letter'
		})
	},
	mounted: function() {
		// this.$store.dispatch('cState/getContacts')
		this.getContacts()
	}
}
</script>

<style lang="scss" scoped>
.Alphasort {
	height: auto;
	padding-bottom: 10px;
}
.dark-mode .Alphasort{
	background-color: #1c1e21;
}

.btnContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	transition: background-color 0.2s;
	cursor: pointer;

	color: var(--lm-button-primary-bg-color);
	font-size: 25px;
	margin: 0;
	text-align: center;
	width: 100%;
}
.btnContainer:hover {
	background-color: #eeeeee;
	font-size: 30px;
}
.dark-mode .btnContainer:hover {
	background-color: black;
}

.active {
	background-color: var(--lm-button-primary-bg-color);
	color: white;
	font-size: 30px;
}
.active:hover {
	background-color: var(--lm-button-primary-bg-color);
}
.dark-mode .active:hover {
	background-color: var(--lm-button-primary-bg-color);
}

</style>