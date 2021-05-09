<template lang="pug">
	div
		div.login-form
			div.card
				h3 Register

				form(@submit.prevent="submit")
					div.fieldContainer
						//- <span class="iconify" data-icon="gg:danger" data-inline="false" style="color:#ed4956;"></span>
						input.form-control(v-model='o.email', v-bind:class="{ 'is-invalid': invalidEmail }", v-on:blur="validateEmail", type='text', placeholder='Email')
						small 
							p.msg(v-if= "invalidEmail") email required

					div.fieldContainer
						div.multi-field
							input.form-control(v-model='o.firstName', v-bind:class="{ 'is-invalid': invalidName }", v-on:blur="validateName", type='email', placeholder='First Name')
							input.form-control(v-model='o.lastName', type='text', placeholder='Last Name')
						small 
							p.msg(v-if= "invalidName") first name required

					div.fieldContainer
						div.multi-field
							input.form-control(v-model='o.password', v-bind:class="{ 'is-invalid': invalidPassword }", type='password', placeholder='Password')
							input.form-control(v-model='o.confirmPassword', v-bind:class="{ 'is-invalid': invalidPassword }", v-on:blur="validatePassword" type='password', placeholder='Confirm password')
						small 
							p.msg(v-if= "invalidPassword") passwords don't match

				div.login-btns
					button.btn(type="button" @click="home()") Cancel
					button.btn.btn-primary(type="submit" v-on:click="submit") Sign up

				//- small.msg(v-if= "invalidForm")
				//- 	p please complete the required fields

				hr

				div.centerContainerBoth
					p.centerBoth.margin-bottom Already have an account?
					router-link(to='login').centerBoth Login

</template>

<script>
import axios from 'axios'

export default {
	name: 'Register',
	components: {

	},
	data: () => {
		return {
			o: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
			},

			invalidEmail: false,
			invalidName: false,
			invalidPassword: false,

			// invalidForm: false,

			items: []
		}
	},

	methods: {
		validateEmail() {
			const rgx = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
			this.invalidEmail = !rgx.test(this.o.email)
		},
		validateName() {
			this.invalidName = ( this.o.firstName.length == 0)
		},
		validatePassword() {
			this.invalidPassword = !(this.o.password.length > 0 && (this.o.password === this.o.confirmPassword))
		},

		async submit() {
			//final validation
			this.validateEmail()
			this.validateName()
			this.validatePassword()

			//if all fields are valid
			if (this.invalidEmail || this.invalidName || this.invalidPassword) {
				return
			}


			try {
				const userCopy = Object.assign({}, this.o)
				delete userCopy.confirmPassword //remove confirm password from request

				const register = await axios.post(`/user/register`, userCopy)
				if(register) {
					this.$router.push('/login')
				}
			}
			catch (err) {
				if (err.response.status === 401) {
					this.password = null
					this.confirmPassword = null
					this.items.push({ msg: 'Invalid field(s)', color: 'alert-danger'})
				}
			}

		},
		home() {
			this.$router.push('/')
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
	// width: 500px;
}

.multi-field {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}

.multi-field input:not(:last-child) {
	margin-right: 10px;
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
	margin: 0;
}

.msg > p {
	margin-top: 20px
}

.fieldContainer {
	height: 50px;
	// overflow: hidden;
}

// @media (min-width: 1920px) {
// 	font-size: var(--base-html-font-size-1920);
// }

</style>