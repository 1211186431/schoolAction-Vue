<template>
	<div>
		<el-container>
			<el-header>
				<myHeader :nowPath="'help'"></myHeader>
			</el-header>
			<el-main>
				<div style="margin-left: 20%;">
					<el-row>
						<el-col :span="4">
							<div style="height: 300px;">
								<el-steps :active="active" direction="vertical" finish-status="success">
									<el-step title="填写信息" icon="el-icon-edit"></el-step>
									<el-step title="上传视频" icon="el-icon-upload"></el-step>
									<el-step title="查看结果" icon="el-icon-picture"></el-step>
								</el-steps>
							</div>
							<el-button style="margin-top: 12px;" @click="next">下一步</el-button>
						</el-col>
						<el-col :span="6">
							<div v-show="active==0">
								<p>填写任务名称</p>
								<p>选择是否需要视频</p>
								<p>选择是否需要人物识别</p>
								<el-image style="width: 400px; height: 300px" :src="src1" :fit="fit"></el-image>
							</div>
							<div v-show="active==1">
								<p>上传需要检测的视频</p>
								<p>视频格式需要为MP4格式</p>
								<p>一次只能添加一个视频</p>
								<el-image style="width: 400px; height: 300px" :src="src2" :fit="fit"></el-image>
							</div>
							<div v-show="active==2">
								<p>按照任务进度选择</p>
								<p>检测中--检测完成</p>
								<p>查看检测结果</p>
								<el-image style="width: 400px; height: 300px" :src="src3" :fit="fit"></el-image>
							</div>
							<div v-show="active==3">
								<el-result icon="success" title="完成" subTitle="行为检测流程结束">
									<template slot="extra">
										<el-button type="primary" size="medium" @click="goload">添加任务</el-button>
									</template>
								</el-result>
							</div>
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

		},
		data() {
			return {
				active: 0,
				src1: this.HOST+"/upload1.png",
				src2: this.HOST+"/upload2.png",
				src3: this.HOST+"/detill.png",
				fit:"fill"
			}
		},
		methods: {
			next() {
				if (this.active++ > 2) this.active = 0;
			},
			goload(){
				this.$router.push("/taskUpload")
			}
		}
	}
</script>

<style>
</style>
