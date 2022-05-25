<template>
	<div>
		<el-container>
			<el-aside width="50%">
				<el-image style="height: 650px" :src="url" :fit="fit"></el-image>
			</el-aside>
			<el-main>
				<div>
					<el-page-header @back="toMain"></el-page-header>
				</div>
				<div>
					<p style="font-size: 20px;margin-left: 40%;">欢迎登录</p>
					<br />
					<br />
				</div>
				<div style="margin-left: 10%;">
					<el-form :model="userInfo" label-width="80px">
						<el-form-item label="用户名" prop="username">
							<el-input v-model="userInfo.userName" class="loginInput"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="userInfo.password" class="loginInput" show-password></el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="icode">
							<el-row>
								<el-col :span="8">
									<el-input v-model="iCode" placeholder="验证码" clearable size="medium"
										style="width: 120px;">
									</el-input>
								</el-col>
								<el-col :span="8">
									<img :src="this.HOST+'/getVerifiCode'" v-if="ImageCode" />
									<el-button type="text" @click="refashImage()" size="mini">换一张</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<div style="margin-left: 15%;">
								<el-row>
									<el-button type="primary" round @click="codeChecking" size="medium" style="width: 150px;">登录</el-button>
								</el-row>
								<el-row>
									<el-button type="text" @click="gotoRegister" style="margin-left: 100px;">注册</el-button>
								</el-row>
							</div>	
						</el-form-item>
					</el-form>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		components: {},
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
				iCode: "", //验证码
				ImageCode: true, //验证码更新
				url: this.HOST + "/loadPic1.png", //图片
				fit: 'fill'
			}
		},
		methods: {
			userlogin() { //登录
				this.$axioss({
					method: "post",
					url: this.HOST + "/login",
					params: {
						userName: this.userInfo.userName,
						password: this.userInfo.password
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success("登录成功")
						this.$store.commit("addUserInfo", response.data.data)
						sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state));
						this.$router.push({
							path: '/main'
						}) //登录后的跳转
					} else {
						this.$message.error("登录失败")
						this.userInfo.password = '';
						this.refashImage();
					}
				})
			},
			codeChecking() { //验证验证码
				var url = this.HOST + "/checkCode";
				this.$axioss({
					method: "get",
					url: url,
					params: {
						imageCode: this.iCode
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.userlogin();
					} else {
						this.$message.error("验证码错误")
						this.refashImage();
					}
				});
			},
			refashImage() { //刷新
				this.ImageCode = false;
				this.$nextTick(() => {
					this.ImageCode = true
				})
			},
			gotoRegister() { //跳转注册界面
				this.$router.push({
					path: '/register'
				}) //登录后的跳转
			},
			toMain() { //返回
				this.$router.push({
					path: '/main'
				});
			}
		}
	}
</script>

<style>
	.loginInput{
		width: 300px;
	}
</style>
