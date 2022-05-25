<template>
	<div>
		<el-container>
			<el-header>
				<myHeader :nowPath="'record'"></myHeader>
			</el-header>
			<el-main>
				<taskAction></taskAction>
			</el-main>
		</el-container>

	</div>
</template>

<script>
	import taskAction from '../components/record/task_action.vue'
	import myHeader from '../components/header/header.vue'
	export default {
		props: {

		},
		components: {
			taskAction,
			myHeader
		},
		computed: {

		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
