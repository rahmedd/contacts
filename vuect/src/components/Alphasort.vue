<template lang="pug">
div
	div.Alphasort
		div.btnContainer(@click="activateAllBtn()" :class="{ active: this.active === null }") all
		
		div.btnContainer(
			v-for="letter in letters"
			:class="{ active: isActive(letter) }"
			@click="activateLetter(letter)"
		) {{ letter }}
		
	//- div.AlphaOverlay
</template>

<script>
export default {
	name: 'Alphasort',
	data: () => {
		return {
			letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
			active: null
		}
	},
	methods: {
		activateLetter(letter){
			this.active = letter
			this.$root.$emit('Contact', 'reset') //reset contact
			this.$root.$emit('ContactsList', 'alphasort', letter) //to alphabetically query list
		},

		activateAllBtn() {
			this.active = null
			this.$root.$emit('ContactsList')
			console.log('alphacomponetn')
		},

		isActive: function(letter) {
			if(letter === this.active) {
				return true
			}
			return false
		},

		//reset to all when search is used
		recieveQuery() {
			this.$root.$on('ContactsList', (queryType, query) => {
				if (queryType === 'search') {
					this.active = null
				}
			})
		},

	},
	mounted: function() {
		this.recieveQuery()
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