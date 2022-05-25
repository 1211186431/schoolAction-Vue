<template>
	<div>
		<el-container>
			<el-header>
				<myHeader :nowPath="'taskUpload'"></myHeader>
			</el-header>
			<el-main>
				<div style="margin-left: 25%;">
					<taskUpload></taskUpload>
				</div>

			</el-main>
		</el-container>

	</div>
</template>

<script>
	import taskUpload from '../components/upload/my_upload.vue'
	import myHeader from '../components/header/header.vue'
	export default {
		props: {

		},
		components: {
			taskUpload,
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
