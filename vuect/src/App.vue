<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

html, body, * {
	box-sizing: border-box;
	font-family: 'Lato', sans-serif;
}

//scroll stuff
html {
	--scrollbarBG: #ffffff;
	--thumbBG: #a7a7a7;
}

</style>
