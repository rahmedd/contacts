<template lang="pug">
	div
		div.login-form
			div.card
				h3 Login

				form(@submit.prevent="submit")
					input.form-control.margin-bottom(v-model='username', type='text', placeholder='Email')
					input.form-control.margin-bottom(v-model='password', type='password', placeholder='Password')

					div.login-btns
						button.btn(v-on:click="") Cancel
						button.btn.btn-primary Login

				small.msg(v-if= "incorrectAuth")
					p Incorrect username or password

				hr

				div.centerContainerBoth
					p.centerBoth.margin-bottom Don't have an account?
					router-link(to='register').centerBoth Sign up


</template>

<script>
import axios from 'axios'
import store from '../store/store'

export default {
	name: 'Login',
	components: {
		
	},
	data: () => {
		return {
			username: null,
			password: null,
			incorrectAuth: false,
			items: []
		}
	},
	methods: {
		async submit() {
			const formData = {
				username: this.username,
				password: this.password
			}

			try {
				const login = await axios.post(`/user/login`, formData)
				if(login) {
					store.commit('auth_success', login.data)
					this.$toast.success("Logged in successfully!")
					this.$router.push('/contacts')
				}
			}
			catch (err) {
				if (err.response.status === 401) {
					this.password = null
					this.items.push({ msg: 'Incorrect username or password', color: 'alert-danger'})
					this.incorrectAuth = true
					this.$toast.error("Incorrect username or password!")
				}
			}

		}
	}
}
</script>

<style lang="scss" scoped>

.login-form {
	position: fixed;
	top: 24vh;
	left: 50%;
	transform: translate(-50%);
	width: 400px;
}

.login-btns {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.login-btns > button:not(:last-child){
	margin-right: 10px;
}

hr {
	height: 2px;
	margin-top: 20px;
	margin-bottom: 20px;
}

.margin-bottom {
	margin-bottom: 10px;
}

.centerContainerBoth {
	height: 100%;
	display: grid;
}

.centerBoth {
	margin-left: auto;
	margin-right: auto;
	margin-top: 0;
}

.msg {
	color: rgb(237, 73, 86);
	text-align: center;
}

.msg > p {
	margin-top: 20px
}

</style>