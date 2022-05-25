<template>
	<div>
		<el-menu :default-active="isOver" @select="handleOpen" style="height: 500px;">
			<el-menu-item index="1">全部任务</el-menu-item>
			<el-menu-item index="2">未进行/进行中</el-menu-item>
			<el-menu-item index="3">已完成</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		computed: {
			userId() { //用户id
				return this.$store.state.userId;
			},
			isOver() { //菜单项
				return this.$route.query.list;
			}
		},
		data() {
			return {

			}
		},
		methods: {
			handleOpen(key) { //左侧菜单
				switch (key) {
					case "1":
						this.$router.push({
							path: "/record",
							query: {
								list: "1"
							}
						})
						break;
					case "2":
						this.$router.push({
							path: "/record",
							query: {
								list: "2"
							}
						})
						break;
					case "3":
						this.$router.push({
							path: "/record",
							query: {
								list: "3"
							}
						})
						break;
				}

			},
		},
	}
</script>

<style>
</style>
