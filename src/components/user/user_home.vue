<template>
	<div>
		<el-descriptions title="用户信息">
			<el-descriptions-item label="用户名">{{userInfo.userName}}</el-descriptions-item>
			<el-descriptions-item label="手机号">{{userInfo.phone}}</el-descriptions-item>
			<el-descriptions-item label="邮箱">{{userInfo.email}}</el-descriptions-item>
			<el-descriptions-item label="创建时间">
				{{createDate}}
			</el-descriptions-item>
		</el-descriptions>
		<el-form :model="userInfo" label-width="80px">
			<el-form-item label="手机号">
				<el-input v-model="userInfo.phone" style="width: 200px;"></el-input>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input v-model="userInfo.email" style="width: 200px;"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="updateInfo">修改</el-button>
			</el-form-item>
			<el-button v-show="this.userInfo.role=='ROLE_user'" @click="toAdmin">进入管理</el-button>
		</el-form>
	</div>
</template>

<script>
	import * as dateUtils from '../util/myDate.js'
	export default {
		computed: {
			userName() { //用户名
				return this.$store.state.userName;
			},
			userId() { //用户id
				return this.$store.state.userId;
			},
			createDate() { //创建日期
				let d = new Date(this.userInfo.createDate);
				return dateUtils.formatDate(d, 'yyyy-MM-dd hh:mm:ss');
			},
		},
		data() {
			return {
				userInfo: { //用户信息
					userId: null,
					userName: '',
					password: '',
					email: '',
					phone: '',
					createDate: '',
					userState: '',
					role: '',
				},
			}
		},
		methods: {
			getUserInfo() { //查询信息
				this.$axioss({
					method: "get",
					url: this.HOST + "/getUserByUserId",
					params: {
						userId: this.userId
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.userInfo = response.data.data;
					} else {
						this.$message.error("获取失败")
					}

				})
			},
			updateInfo() { //更新用户信息
				this.$axioss({
					method: "post",
					url: this.HOST + "/updateUser",
					params: {
						userId: this.userId,
						email: this.userInfo.email,
						phone: this.userInfo.phone,
						userState: this.userInfo.userState
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success("更新成功")
					} else {
						this.$message.error("更新失败")
					}

				})
			},
			toAdmin(){
				this.$router.push("/admin")
			}
			

		},
		mounted() {
			if (this.userId != -1) {
				this.getUserInfo()
			}
		}
	}
</script>

<style>
</style>
