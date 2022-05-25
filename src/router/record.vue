<template>
	<div>
		<el-container>
			<el-header>
				<myHeader :nowPath="'record'"></myHeader>
			</el-header>
			<el-main>
				<taskRecord></taskRecord>
			</el-main>
		</el-container>

	</div>
</template>

<script>
	import taskRecord from '../components/record/task_record.vue'
	import myHeader from '../components/header/header.vue'
	export default {
		props: {

		},
		components: {
			taskRecord,
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
