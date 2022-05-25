<template>
	<div>
		<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
			<el-menu-item>
				<el-button type="text" @click="toMain" style="font-size: 15px;font-family:黑体;">校园行为分析</el-button>
			</el-menu-item>
			<el-menu-item index="main" style="margin-left:15%">首页</el-menu-item>
			<el-menu-item index="taskUpload">行为检测</el-menu-item>
			<el-menu-item index="record">任务列表</el-menu-item>
			<el-menu-item index="evaluatelist">评价列表</el-menu-item>
			<el-submenu index="wordhelp">
			    <template slot="title">文档帮助</template>
			    <el-menu-item index="introduce">系统介绍</el-menu-item>
			    <el-menu-item index="help">使用指南</el-menu-item>
			  </el-submenu>
			<el-menu-item index="userHome" style="margin-left:10%">
				用户中心
			</el-menu-item>
			<el-menu-item>
				<userHeader></userHeader>
			</el-menu-item>
		</el-menu>

	</div>
</template>

<script>
	import userHeader from './user_header.vue'
	export default {
		props: {
			nowPath: String //当前界面
		},
		components: {
			userHeader
		},
		computed: {
			userName() { //获取用户名
				return this.$store.state.userName;
			},
			userId() { //获取用户id
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				activeIndex: this.nowPath //初始界面显示
			}
		},
		methods: {
			handleSelect(key, keyPath) { //根据菜单跳转界面
				if (keyPath == "record") {
					this.$router.push({
						path: "/record",
						query: {
							list: "1"
						}
					})
				} else if (keyPath.length == 2) {
					this.$router.push("/" + keyPath[1]);
				} else if (keyPath[0] == null) {
					return
				} else
					this.$router.push("/" + key);
			},
			toMain() { //转到注册界面
				this.$router.push("/main");
			}
		}
	}
</script>

<style>
	.el-row {
		/* margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		} */
	}

	.el-col {
		/* border-radius: 4px; */
	}
</style>
