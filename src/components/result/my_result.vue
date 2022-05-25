<template>
	<div>
		<el-page-header @back="goBack" content="详情页面"></el-page-header>
		<el-descriptions title="检测结果">
			<el-descriptions-item label="任务名称">{{taskName}}</el-descriptions-item>
			<el-descriptions-item label="视频名称">{{fileName}}</el-descriptions-item>
			<el-descriptions-item label="上传时间">{{createDate}}</el-descriptions-item>
			<el-descriptions-item label="检测结果">
				<el-tag size="medium" :type="isDanger2">{{isDanger}}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item label="行为名称" v-if="dangerShow">
				{{tableData[0].topName}}
			</el-descriptions-item>
			<el-descriptions-item label="行为置信率" v-if="dangerShow">
				{{tableData[0].topAcc}}
			</el-descriptions-item>
			<el-descriptions-item label="评价">
				{{evalText}}
			</el-descriptions-item>

		</el-descriptions>
		<div>
			<el-row>
				<el-col :span="8">
					<div>
						<el-timeline style="margin-top: 5%;">
							<el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
								:type="activity.type" :color="activity.color" :size="activity.size"
								:timestamp="activity.timestamp">
								{{activity.content}}
							</el-timeline-item>
						</el-timeline>
					</div>
				</el-col>
				<el-col :span="14">
					<div v-show="haveResult">
						<el-table :data="tableData" style="400px" v-if="dangerShow">
							<el-table-column prop="top" label="top" width="100">
							</el-table-column>
							<el-table-column prop="topName" label="行为名称" width="150">
							</el-table-column>
							<el-table-column prop="topAcc" label="置信率" width="150">
							</el-table-column>
						</el-table>
						<br />
						<el-button @click="playVideo" v-show="videoShow">播放视频</el-button>
						<el-button @click="evaluate">评价</el-button>
					</div>
					<div v-show="!haveResult">
						<p>未检测完成</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<myVideoPlayer v-if="play" :videoUrl="videoUrl"></myVideoPlayer>
	</div>
</template>

<script>
	import * as dateUtils from '../util/myDate.js'
	import myVideoPlayer from './my_video_player.vue'
	export default {
		props: ["taskId"],
		computed: {
			fileName() { //文件名称
				if (this.taskInfo != null) {
					var name1 = this.taskInfo.filePath.split('/')
					return name1[name1.length - 1]
				}
				return ""
			},
			taskName() { //任务名称
				if (this.taskInfo != null)
					return this.taskInfo.taskName
				return ""
			},
			createDate() { //创建日期
				if (this.taskInfo != null) {
					let d = new Date(this.taskInfo.createDate);
					return dateUtils.formatDate(d, 'yyyy-MM-dd hh:mm:ss');
				}
				return ""
			},
			isDanger() { //是否有危险
				if (this.taskInfo != null) {
					switch (this.taskInfo.isDanger) {
						case 0:
							return "未检测"
						case -1:
							return "无危险行为"
						case 1:
							return "有危险行为"
					}

				}
				return ""
			},
			isDanger2() { //是否有危险
				if (this.taskInfo != null) {
					switch (this.taskInfo.isDanger) {
						case 0:
							return "info"
						case -1:
							return "success"
						case 1:
							return "danger"
					}
			
				}
				return ""
			},
			evalText() { //是否评价
				switch (this.taskInfo.isRight) {
					case 0:
						return "未评价";
					case -1:
						return "结果错误";
					case 1:
						return "结果正确";
				}
				return "未检测";
			}

		},
		components: {
			myVideoPlayer
		},
		data() {
			return {
				taskInfo: null, //任务信息
				resultInfo: null, //检测结果
				play: false,
				videoUrl: "", //视频播放地址
				haveResult: false, //是否检测完成
				activities: [{
					content: '创建成功',
					timestamp: "",
					size: 'normal ',
					color: ''
				}, {
					content: '队列中',
					timestamp: '',
					size: 'normal ',
					color: ''
				}, {
					content: '检测中',
					timestamp: '',
					size: 'normal ',
					color: ''
				}, {
					content: '已完成',
					timestamp: '',
					size: 'normal ',
					color: ''
				}],
				tableData: [{top:"",topName:"",topAcc:""}],
				dangerShow:false,
				videoShow:false
			}
		},
		methods: {
			getTaskInfo() { //获取任务信息
				this.$axioss({
					method: "get",
					url: this.HOST + "/getTaskByTaskId",
					params: {
						taskId: this.taskId,
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.taskInfo = response.data.data;
						if (this.taskInfo.resultPath != "") {
							var url = this.taskInfo.resultPath.split('/')
							this.videoUrl = url[url.length - 1]
							this.videoShow=true
						}
						if (this.taskInfo.taskState == 3) {
							this.getResultInfo();
							if(this.taskInfo.isDanger==1){
								this.dangerShow=true
							}
							this.haveResult = true
						}
						this.setTimeline()
					} else {
						this.$message.error("获取失败")
					}
				})
			},
			getResultInfo() { //获取结果信息
				this.$axioss({
					method: "get",
					url: this.HOST + "/getResultByTaskId",
					params: {
						taskId: this.taskId,
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.resultInfo = response.data.data;
						var alltop=this.resultInfo.top1+";"+this.resultInfo.top2+";"+this.resultInfo.top3+";"+this.resultInfo.top4+";"+this.resultInfo.top5
						alltop=alltop.split(";")
						this.tableData.pop();
						for(let i=1;i<=5;i++){
							let top={
								top:'top'+i,
								topName:alltop[i-1].split(',')[0],
								topAcc:alltop[i-1].split(',')[1].slice(0,7)
							}
							this.tableData.push(top)
						}
						
					} else {
						this.$message.error("获取失败")
					}

				})
			},
			playVideo() { //播放视频
				this.play = true
			},
			goBack() {
				this.$router.go(-1);
			},
			setTimeline() {
				let d = new Date(this.taskInfo.createDate);
				this.activities[0].timestamp = dateUtils.formatDate(d, 'yyyy-MM-dd hh:mm:ss');

				let d2 = new Date(this.taskInfo.updateDate);
				this.activities[this.taskInfo.taskState].timestamp = dateUtils.formatDate(d2, 'yyyy-MM-dd hh:mm:ss');
				this.activities[this.taskInfo.taskState].color = '#0bbd87'
			},
			evaluate() {
				this.$router.push({
					path: "/evaluate",
					query: {
						taskId: this.taskInfo.taskId,
					}
				})
			}


		},
		mounted() {
			this.getTaskInfo();
		}
	}
</script>

<style>
</style>
