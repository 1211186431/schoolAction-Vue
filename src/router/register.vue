<template>
	<div>
		<userRegister></userRegister>
	</div>
</template>

<script>
	import userRegister from '../components/login/user_register.vue'
	export default {
		props: {

		},
		components: {
			userRegister
		},
		computed: {

		},
		data() {
			return {

			}
		},
		methods: {
			toMain() {
				this.$router.push({
					path: '/main'
				}) //登录后的跳转
			}
		}
	}
</script>

<style>
</style>
