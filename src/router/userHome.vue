<template>
	<div>
		<el-container>
			<el-header>
				<myHeader :nowPath="'userHome'"></myHeader>
			</el-header>
			<el-main>
				<userInfo></userInfo>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import myHeader from '../components/header/header.vue'
	import userInfo from '../components/user/user_home.vue'
	export default {
		components: {
			myHeader,
			userInfo
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			},
			userId() {
				return this.$store.state.userId;
			},
		},
		data() {
			return {
	
			}
		},
		methods: {
			handleClick(tab, event) {
				//console.log(tab, event);
			}
		}
	}
</script>

<style>
</style>
