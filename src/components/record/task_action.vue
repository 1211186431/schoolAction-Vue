<template>
	<div>
		<el-container>
			<el-aside style="width: 200px;">
				<taskMenu></taskMenu>
			</el-aside>
			<el-main>
				<div>
					<myResult :taskId="taskId"></myResult>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import myResult from '../result/my_result.vue'
	import taskMenu from './task_menu.vue'
	export default {
		components: {
			myResult,
			taskMenu
		},
		computed: {
			userId() { //用户id
				return this.$store.state.userId;
			},
			taskId() {
				return this.$route.query.taskId;
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {

		},
		watch: {

		}
	}
</script>

<style>
</style>
