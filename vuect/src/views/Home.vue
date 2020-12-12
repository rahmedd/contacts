<template lang="pug">
	div.home
		//- Navbar

		div.mainContainer
			h1.title contacts
			div.buttonContainer
				button.btn.btn-lg.btn-primary(@click="login()") Login
				p or
				button.btn.btn-lg.btn-primary(@click="register()") Sign Up

		div.screenContainer
			h3 Screenshots
			h4 Light Mode
			<img src="/images/laptopLight.png">
			p
			h4 Dark Mode
			<img src="/images/laptopDark.png">
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '../components/Navbar'

export default {
	name: 'Home',
	components: {
		Navbar
	},
	methods: {
		login() {
			this.$router.push('/login')
		},
		register() {
			this.$router.push('/register')
		}
	}
}
</script>

<style lang="scss" scoped>
.mainContainer, .screenContainer {
	display: flex;
	align-items: center;
	flex-direction: column;
}

.mainContainer {
	background-image: url(/images/undraw_contact_us_15o45.svg);
	background-position: center;
	background-repeat: no-repeat;
	background-position: 50% 70%;
	padding-top: 12vh;
	height: 40vh;
}

.title {
	font-size: 7rem;
	letter-spacing: 0.3rem;
}

.screenContainer {
	padding-bottom: 50px;
	margin-left: 50px;
	margin-right: 50px;
	color: #888;
}

.screenContainer > img {
	max-width: 100%;
	height: auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.buttonContainer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 250px;
}
</style>
