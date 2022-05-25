<template>
	<div style="width: 100px;">
		<div v-if="islogin()">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-button type="text" @click="toUserHome" style="color: #000;">{{userName}}</el-button>
				</el-col>
				<el-col :span="8">
					<el-button type="text" @click="tologout">登出</el-button>
				</el-col>
			</el-row>
		</div>
		<div v-if="!islogin()">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-button type="text" @click="toLogin" style="color: #000;">登录</el-button>
				</el-col>
				<el-col :span="8">
					<el-button type="text" @click="toRegister">注册</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		computed: {
			userName() { //用户名
				return this.$store.state.userName;
			},
			userId() { //用户id
				return this.$store.state.userId;
			},

		},
		data() {
			return {

			}
		},
		methods: {
			islogin() { //判断是否登录
				if (this.userName != null) {
					return true;
				} else {
					return false;
				}
			},
			toLogin() { //转到登录界面
				this.$router.push("/login");
			},
			toRegister() { //转到注册界面
				this.$router.push("/register");
			},
			tologout() {
				var url = this.HOST + "/logout";
				this.$axioss({
					method: "post",
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					url: url
				}).then(response => {
					this.$store.commit('deleteUserInfo');
					this.$router.push('/login');
				});
			},
			toUserHome() {
				//this.$router.push('/userHome');
			}

		},
		mounted() {

		}

	}
</script>

<style>
</style>
