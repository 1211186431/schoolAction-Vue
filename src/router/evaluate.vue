<template>
	<div>
		<el-container>
			<el-header>
				<myHeader :nowPath="'evaluate'"></myHeader>
			</el-header>
			<el-main>
				<div style="margin-left: 25%;">
					<resultEvaluate></resultEvaluate>
				</div>
				
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import myHeader from '../components/header/header.vue'
	import resultEvaluate from '../components/record/result_evaluate.vue'
	export default {
		components: {
			myHeader,
			resultEvaluate
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

