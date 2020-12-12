<template lang="html">
<div class="switchContainer">
	<label class="switch">
		<input @click="sendToggleDarkMode()" type="checkbox" v-model="darkModeOn">
		<span class="slider round"></span>
	</label>
</div>

</template>


<script>
export default {
	name: 'ToggleSwitch',
	props: {
		darkModeOn: Boolean
	},
	// data: () => {
	// 	return {

	// 	}
	// },
	methods: {
		sendToggleDarkMode() {
			this.$emit('ToggleDarkMode')
		}
	},
	// mounted: function() {

	// },
	// computed: {

	// }
}

</script>


<style lang="scss" scoped>

.switchContainer {
	margin-top: 8px;
}

.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 30px;
}

.switch input { 
	opacity: 0;
	width: 0;
	height: 0;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	-webkit-transition: .2s;
	transition: .2s;
}

.slider:before {
	position: absolute;
	content: "";
	height: 24px;
	width: 24px;
	left: 5px;
	bottom: 3px;
	background-color: white;
	-webkit-transition: .2s;
	transition: .2s;
}

input:checked + .slider {
	background-color: #2196F3;
}

input:focus + .slider {
	box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
	border-radius: 34px;
}

.slider.round:before {
	border-radius: 50%;
}

</style>