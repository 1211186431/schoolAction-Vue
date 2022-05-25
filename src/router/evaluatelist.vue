<template>
	<div>
		<el-container>
			<el-header>
				<myHeader :nowPath="'evaluatelist'"></myHeader>
			</el-header>
			<el-main>
				<mylist></mylist>
			</el-main>
		</el-container>

	</div>
</template>

<script>
	import myHeader from '../components/header/header.vue'
	import mylist from '../components/evaluate/evaluate_list.vue'
	export default {
		props: {

		},
		components: {
			myHeader,
			mylist
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
