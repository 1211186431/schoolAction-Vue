<template>
	<div>
		<div>
			<el-row class="Header">
				<el-col :span="10">
					<div>
						<p>管理员后台管理Beta</p>
					</div>
				</el-col>
				<el-col :span="4">
					<el-button type="text" @click="$router.back(-1)">返回</el-button>
				</el-col>
			</el-row>
		</div>
		<el-divider></el-divider>

		<el-tabs tab-position="left" style="height: 500px;">
			<el-tab-pane label="所有任务">
				<div>
					<el-table :data="allTask" style="width: 100%">
						<el-table-column prop="taskId" label="任务Id" width="180">
						</el-table-column>
						<el-table-column prop="userId" label="用户Id" width="180">
						</el-table-column>
						<el-table-column prop="taskState" label="任务进度">
						</el-table-column>
						<el-table-column prop="createDate" label="创建日期">
						</el-table-column>
					</el-table>
					<el-pagination layout="prev, pager, next" :total="this.pageAllSize1*10" @current-change="PageChage"
						style="margin-left: 30%;">
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="所有评价">
				<div>
					<el-table :data="allEval" style="width: 100%">
						<el-table-column prop="taskId" label="任务Id" width="180">
						</el-table-column>
						<el-table-column prop="userId" label="用户Id" width="180">
						</el-table-column>
						<el-table-column prop="isTrue" label="是否正确">
						</el-table-column>
						<el-table-column prop="createDate" label="创建日期">
						</el-table-column>
					</el-table>
					<el-pagination layout="prev, pager, next" :total="this.pageAllSize2*10" @current-change="PageChage2"
						style="margin-left: 30%;">
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="错误视频">
				<div>
					<el-table :data="allVideo" style="width: 100%">
						<el-table-column prop="taskId" label="任务Id" width="180">
						</el-table-column>
						<el-table-column prop="filePath" label="任务进度">
						</el-table-column>
						<el-table-column prop="createDate" label="创建日期">
						</el-table-column>
					</el-table>
					<el-pagination layout="prev, pager, next" :total="this.pageAllSize3*10" @current-change="PageChage3"
						style="margin-left: 30%;">
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="修改模型">
				<div>
					<p>当前模型准确率</p>
					<el-table :data="tableAcc" style="width: 100%">
						<el-table-column prop="Kinetics" label="测试数据集">
						</el-table-column>
						<el-table-column prop="top1" label="top1">
						</el-table-column>
						<el-table-column prop="top5" label="top5">
						</el-table-column>
					</el-table>
					<br />
					<el-upload class="upload-demo" drag :action="videoUrl" multiple>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					</el-upload>
				</div>
			</el-tab-pane>
		</el-tabs>

	</div>
</template>

<script>
	export default {
		components: {

		},
		computed: {

		},
		data() {
			return {
				allTask: [], //全部任务列表
				allEval: [],
				allVideo: [],
				pageAllSize1: 0, //总页数1
				pageAllSize2: 0, //总页数2
				pageAllSize3: 0, //总页数3
				tableAcc: [{
					Kinetics: "Kinetics400（测试集）",
					top1: "93.93%",
					top5: "100.00%"
				},{
					Kinetics: "Kinetics600（训练集）",
					top1: "91.98%",
					top5: "99.73%"
				},{
					Kinetics: "Kinetics600（测试集）",
					top1: "88.05%",
					top5: "99.60%"
				},{
					Kinetics: "自定义数据集",
					top1: "80.68%",
					top5: "94.62%"
				},
				],
				videoUrl: this.HOST2 + "/uploadModel", //视频上传地址
			}
		},
		methods: {
			getTask(pageNum, pageSize) {
				var url = this.HOST + "/admin/getAllTask";
				this.$axioss({
					method: "get",
					url: url,
					params: {
						pageNum: pageNum,
						pageSize: pageSize
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.allTask = response.data.data.data;
						this.pageAllSize1 = response.data.data.totalPages;
					}
				});
			},
			getEval(pageNum, pageSize) {
				var url = this.HOST + "/admin/getAllEvaluate";
				this.$axioss({
					method: "get",
					url: url,
					params: {
						pageNum: pageNum,
						pageSize: pageSize
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.allEval = response.data.data.data;
						this.pageAllSize2 = response.data.data.totalPages;
					}
				});
			},
			getVideo(pageNum, pageSize) {
				var url = this.HOST + "/admin/getAllVideo";
				this.$axioss({
					method: "get",
					url: url,
					params: {
						pageNum: pageNum,
						pageSize: pageSize
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.allVideo = response.data.data.data;
						this.pageAllSize3 = response.data.data.totalPages;
					}
				});
			},
			PageChage(x) { //换页
				this.getTask(x, 8)
			},
			PageChage2(x) { //换页
				this.getEval(x, 8)
			},
			PageChage3(x) { //换页
				this.getVideo(x, 8)
			}
		},
		mounted() {
			this.getTask(0, 8);
			this.getEval(0, 8);
			this.getVideo(0, 8);
		}
	}
</script>

<style>
</style>
