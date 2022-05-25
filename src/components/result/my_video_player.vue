<template>
	<div>
		<el-container>
			<el-main>
				<vue-core-video-player :src="logourl" preload="metadata"></vue-core-video-player>
			</el-main>
			<el-aside width="200px">
				
			</el-aside>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'my_video_player',
		props: {
			videoUrl: String
		},
		data() {
			return {
				logourl: 'http://59.64.78.254:16224/python/'+this.videoUrl,
			}
		},
		methods: {
			
		},
		mounted() {
			//this.getfile()
		}
	}
</script>

<style>
</style>
