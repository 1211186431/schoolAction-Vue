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
					<p style="font-size: 20px;margin-left: 40%;">欢迎注册</p>
					<br />
					<br />
				</div>
				<div style="margin-left: 10%;">
					<el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" status-icon>
						<el-form-item label="用户名" prop="userName">
							<el-input v-model="ruleForm.userName" class="loginInput"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="pass">
							<el-input v-model="ruleForm.pass" autocomplete="off" class="loginInput"></el-input>
						</el-form-item>
						<el-form-item label="再次输入" prop="checkPass">
							<el-input v-model="ruleForm.checkPass" autocomplete="off" class="loginInput"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="ruleForm.email" class="loginInput"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="ruleForm.phone" class="loginInput"></el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="icode">
							<el-row>
								<el-col :span="8">
									<el-input v-model="iCode" placeholder="验证码" clearable size="medium" style="width: 100px;">
									</el-input>
								</el-col>
								<el-col :span="8">
									<img :src="this.HOST+'/getVerifiCode'" v-if="ImageCode" />
									<el-button type="text" @click="refashImage()" size="mini">换一张</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" round @click="validate" size="medium" style="width: 150px;margin-left: 15%;">注册</el-button>
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
			var validateEmail = (rule, value, callback) => {  //邮箱验证方式
				var t = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
				if (!(t.test(value))) {
					callback(new Error('请输入正确的邮箱'));

				} else {
					callback();
				}
			};
			var validatePhone = (rule, value, callback) => {  //手机验证方式
				var t = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
				if (!(t.test(value))) {
					callback(new Error('请输入正确的手机号'));
			
				} else {
					callback();
				}
			};
			var validateName = (rule, value, callback) => { //用户名验证
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => { //密码验证
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {  //密码再次验证
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {  //填写表单
					userName: '',
					email: '',
					phone: '',
					pass: '',
					checkPass: '',
				},
				userInfo: { //用户信息表单
					userId: null,
					userName: '',
					password: '',
					email: '',
					phone: '',
					createDate: new Date(),
					userState: 1,
					role: 'ROLE_user',
				},
				rules: { //验证规则配制
					userName: [{
						validator: validateName,
						trigger: 'blur'
					}],
					phone: [{ //手机验证
						validator: validatePhone,
						trigger: 'blur'
					}],
					email: [{ //邮箱验证
						validator: validateEmail,
						trigger: 'blur'
					}],
					pass: [{ //密码验证
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{ //密码再次验证
						validator: validatePass2,
						trigger: 'blur'
					}]
				},
				iCode: "", //验证码
				ImageCode: true, //验证码更新
				url: this.HOST + "/loadPic1.png", //图片
				fit: 'fill'
			}
		},
		methods: {
			register() { //注册
			    this.userInfo.email=this.ruleForm.email;
				this.userInfo.phone=this.ruleForm.phone;
				this.userInfo.password=this.ruleForm.pass;
				this.userInfo.userName=this.ruleForm.userName;
				this.userInfo.createDate=new Date();
				this.$axioss({
					method: "post",
					url: this.HOST + "/register",
					data: this.userInfo
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success("注册成功")
						this.$router.push({path: '/home'})   //登录后的跳转
					} else if(response.data.code == "400"){
						this.$message.error(response.data.msg)
						this.refashImage();
					}
				})

			},
			validate() { //验证数据
				this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						this.codeChecking();
					} else {
						this.$message.error("数据未填写正确")
						return false;
					}
				});
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
						this.register();
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
			toMain() { //返回
				this.$router.go(-1);
			}
		}
	}
</script>

<style>
	.loginInput{
		width: 300px;
	}
</style>
