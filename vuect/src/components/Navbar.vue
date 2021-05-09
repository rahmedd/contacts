<template lang="pug">
div.navContainer
	//- router-link.btn(to= "/login") Sign Out
	div.toggleSwitcher
		<span class="iconify" data-icon="bx:bx-sun" data-inline="false" style="color: orange;"></span>
		ToggleSwitch(@ToggleDarkMode = "toggleDarkMode" :darkModeOn="darkModeOn")
		<span class="iconify" data-icon="bi:moon" data-inline="false" style="color: orange;"></span>

	//- button.btn(@click="toggleDarkMode()") {{darkModeEmoji}}
	button.btn(v-if="isLoggedin" @click="logout()") Sign Out
	button.btn(v-else @click="login()") Login

</template>


<script>
import ToggleSwitch from './ToggleSwitch'

export default {
	name: 'Navbar',
	components: {
		ToggleSwitch,
	},
	data: () => {
		return {
			darkModeOn: false,
			emojis: ['☀️','🌙'],
			// isLoggedin: false
		}
	},
	methods: {
		login() {
			this.$router.push('/login')
		},
		logout() {
			// store.commit('logout')
			this.$toast.warning("Logged out!")
			this.$router.push('/login')
		},
		toggleDarkMode: function() {
			if (document.body.classList.contains("dark-mode")) {
				document.body.classList.remove("dark-mode");
				this.darkModeOn = false;
				this.createCookie("halfmoon_preferredMode", "light-mode", 365);
			} else {
				document.body.classList.add("dark-mode");
				this.darkModeOn = true;
				this.createCookie("halfmoon_preferredMode", "dark-mode", 365);
			}
		},
		createCookie: function(name, value, days) {
			let expires;
			if (days) {
				let date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			else {
				expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		},
		readCookie: function(name) {
			let nameEQ = name + "=";
			let ca = document.cookie.split(";");
			for(let i=0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) === " ") {
					c = c.substring(1, c.length);
				}
				if (c.indexOf(nameEQ) === 0) {
					return c.substring(nameEQ.length,c.length);
				}
			}
			return null;
		},
		getPreferredMode: function() {
			if (this.readCookie("halfmoon_preferredMode")) {
				return this.readCookie("halfmoon_preferredMode");
			} else {
				return "not-set";
			}
		}
	},
	mounted: function() {
		if (this.getPreferredMode() === 'dark-mode') {
			this.toggleDarkMode()
		}
	},
	computed: {
		darkModeEmoji: function () {
			if(this.darkModeOn) {
				return '🌙'
			}
			else {
				return '☀️'
			}
		},
		isLoggedin: function() {
			// return this.$store.getters['isLoggedIn']
			return true
		}
	}
}

</script>


<style lang="scss" scoped>
.navContainer {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
}

.btn {
	margin-left: 10px;
}

.btn.active, .btn:focus {
	box-shadow: none;
	-webkit-box-shadow: none;
}

.dark-mode .btn.active, .dark-mode .btn:focus {
	box-shadow: none;
	-webkit-box-shadow: none;
}

.toggleSwitcher {
	display: flex;
	align-items: center;
	justify-content: center;
	// width: 100%;
}
.toggleSwitcher > svg {
	margin-right: 5px;
	margin-left: 5px;
	font-size: 20px;
}

</style>