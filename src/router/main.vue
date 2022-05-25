<template>
	<div>
		<el-container>
			<el-header>
				<myHeader :nowPath="'main'"></myHeader>
			</el-header>
			<el-main>
				<div class="main_top_center" style="">
					<el-carousel height="450px" :interval="20000">
						<el-carousel-item v-for="item in urls" :key="item">
							<el-image :src="item" :fit="fit" style="object-fit: contain;"></el-image>
						</el-carousel-item>
					</el-carousel>
				</div>
				<div>
					<el-row :gutter="40" style="margin-top: -5px;z-index:999;margin-left: 10px;margin-right: 10px;">
						<el-col :span="8">
							<el-card shadow="always" style="background-color: aliceblue;">
								<el-row>
									<el-col :span="12">
										<div @click="userClick(0)"><span style="font-size: 25px;">系统优势</span><br /><br /><span>模型介绍>></span>
										</div>
									</el-col>
									<el-col :span="12">
										<div style="font-size: 55px;">
											<i class="el-icon-trophy"></i>
										</div>
									</el-col>
								</el-row>
							</el-card>
						</el-col>
						<el-col :span="8">
							<el-card shadow="always" style="background-color: aliceblue;">
								<el-row>
									<el-col :span="12">
										<div @click="userClick(1)"><span style="font-size: 25px;">使用方法</span><br /><br /><span>帮助指南>></span>
										</div>
									</el-col>
									<el-col :span="12">
										<div style="font-size: 55px;">
											<i class="el-icon-tickets"></i>
										</div>
									</el-col>
								</el-row>
							</el-card>
						</el-col>
						<el-col :span="8">
							<el-card shadow="always" style="background-color: aliceblue;" >
								<el-row>
									<el-col :span="12">
										<div @click="userClick(2)"><span style="font-size: 25px;">快速开始</span><br /><br /><span>上传视频>></span>
										</div>
									</el-col>
									<el-col :span="12">
										<div style="font-size: 55px;color: #000;">
											<i class="el-icon-finished"></i>
										</div>
									</el-col>
								</el-row>
							</el-card>
						</el-col>
					</el-row>

				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import myHeader from '../components/header/header.vue'
	export default {
		components: {
			myHeader
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
				urls: [
					// this.HOST + "/mainPic.png",
					this.HOST + "/mainPic2.png",
					this.HOST + "/mainPic3.png",
				],
				fit: "fill"
			}
		},
		methods: {
			handleClick(tab, event) {
				//console.log(tab, event);
			},
			userClick(n){
				switch(n){
					case 0:this.$router.push("/introduce");break;
					case 1:this.$router.push("/help");break;
					case 2:this.$router.push("/taskUpload");break;
				}
				
			}
		},
		mounted() {
			// //输出当前窗口的宽
			// var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
			// console.log(windowWidth);

			// //输出当前窗口的高
			// var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			// console.log(windowHeight);
		}
	}
</script>

<style>
	.main_top_center {
		background-color: #ffffff;
		margin-top: 10px;
		z-index: 1
	}
</style>
