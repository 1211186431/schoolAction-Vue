<template>
	<div style="margin-bottom: 2%;">
		<el-card shadow="hover" style="width: 90%;"> 
			<el-row>
				<el-col :span="6">
					<div>
						<el-image style="width: 150px; height: 150px" :src="imgPath">
						</el-image>
					</div>
				</el-col>
				<el-col :span="18">
					<div style="padding: 14px;">
						<el-row>
							<el-col :span="8"><span>任务名称：{{taskInfo.taskName}}</span></el-col>
							<el-col :span="12"><span>创建时间：{{createDate}}</span></el-col>
						</el-row>
						<br />
						<el-row>
							<el-col :span="8"><span>状态：</span>
								<el-tag :type="stateType">{{stateText}}</el-tag>
							</el-col>
							<el-col :span="8"><span>结果：</span>
								<el-tag :type="dangerType">{{dangerText}}</el-tag>
							</el-col>
							<el-col :span="8"><span>评价：</span>
								<el-tag :type="evalType">{{evalText}}</el-tag>
							</el-col>
						</el-row>
						<el-button type="text" class="button" @click="getResult">查看详细信息</el-button>
					</div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	import * as dateUtils from '../util/myDate.js'
	export default {
		props: {
			taskInfo: Object
		},
		components: {},
		computed: {
			stateText() { //任务进度标签文字
				switch (this.taskInfo.taskState) {
					case 0:
						return "未处理";
					case 1:
						return "等待中";
					case 2:
						return "处理中";
					case 3:
						return "已完成";
				}
				return "已完成";
			},
			stateType() { //任务进度标签颜色
				switch (this.taskInfo.taskState) {
					case 0:
						return "info";
					case 1:
						return "";
					case 2:
						return "";
					case 3:
						return "success";
				}
				return "success";
			},
			dangerText() { //是否有危险行为文字
				switch (this.taskInfo.isDanger) {
					case 0:
						return "未检测";
					case -1:
						return "没有危险";
					case 1:
						return "有危险";
				}
				return "未检测";
			},
			dangerType() { //是否有危险行为
				switch (this.taskInfo.isDanger) {
					case 0:
						return "info";
					case -1:
						return "success";
					case 1:
						return "danger";
				}
				return "danger";
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
			},
			evalType() { //是否评价
				switch (this.taskInfo.isRight) {
					case 0:
						return "info";
					case 1:
						return "success";
					case -1:
						return "danger";
				}
				return "danger";
			},
			imgPath() { //图片路径
				if (this.taskInfo.imgPath != null && this.taskInfo.imgPath != "") {
					var url = this.taskInfo.imgPath.split('/')
					return 'http://59.64.78.254:16224/python/' + url[url.length - 1]
				}
				return ""
			},
			createDate() { //日期
				let d = new Date(this.taskInfo.createDate);
				return dateUtils.formatDate(d, 'yyyy-MM-dd hh:mm:ss');
			}
		},
		data() {
			return {

			}
		},
		methods: {
			getResult() {
				this.$router.push({
					path: '/action',
					query: {
						taskId: this.taskInfo.taskId
					}
				});
			}
		}
	}
</script>

<style>
</style>
