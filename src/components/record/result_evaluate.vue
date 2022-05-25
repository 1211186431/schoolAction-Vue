<template>
	<div>
		<el-page-header @back="goBack" content="评价界面"></el-page-header>
		<el-form :model="evaluate">
			<el-form-item label="任务名称">
				<span>{{taskInfo.taskName}}</span>
			</el-form-item>
			<el-form-item label="检测结果">
				<div v-if="!isDanger">
					<el-tag type="success">安全</el-tag>
				</div>
				<div v-if="isDanger">
					<el-tag type="danger">有危险行为</el-tag>
				</div>
			</el-form-item>
			<el-form-item label="危险行为" v-if="isDanger">
				<span>{{top1}}</span>
			</el-form-item>
			<el-form-item label="准确率" v-if="isDanger">
				<span>{{acc}}</span>
			</el-form-item>
			<el-form-item label="是否正确">
				<el-radio v-model="evaluate.isTrue" :label="1">正确</el-radio>
				<el-radio v-model="evaluate.isTrue" :label="-1">错误</el-radio>
			</el-form-item>
			<el-form-item v-show="evaluate.isTrue!=1">
				<el-select v-model="evaluate.trueAction" placeholder="请选择">
					<el-option v-for="item in options" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="insertEval" v-show="evaluate.evaluateId==null">提交</el-button>
				<el-button type="primary" @click="updateEval" v-show="evaluate.evaluateId!=null">修改</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		props: {},
		components: {

		},
		computed: {
			userId() { //用户id
				return this.$store.state.userId;
			},
			taskId() { //认为id
				return this.$route.query.taskId;
			},
			isDanger() { //是否有危险行为
				if (this.taskInfo.isDanger == 1)
					return true;
				else
					return false
			},
			top1() {
				if (this.resultInfo.top1 != null) {
					var t = this.resultInfo.top1
					return t.split(",")[0]
				}
				return ""
			},
			acc() {
				if (this.resultInfo.top1 != null) {
					var t = this.resultInfo.top1
					return t.split(",")[1]
				}
				return ""
			}


		},
		data() {
			return {
				evaluate: { //评价表
					evaluateId: null,
					resultId: this.resultId,
					userId: this.userId,
					taskId: this.taskId,
					isTrue: 1,
					trueAction: "",
					createDate: null,
					taskName: "",
					state: 1
				},
				options: [
					"climbing tree",
					"crying",
					"drinking beer",
					"drop kicking",
					"wrestling",
					"smoking",
					"lunge",
					"punching person (boxing)",
					"pumping fist",
					"spraying",
				],
				taskInfo: {},
				resultInfo: {},
		
			}
		},
		methods: {
			getInfo(taskId) { //获取所有信息
				this.$axioss({
					method: "get",
					url: this.HOST + "/getEvaluateByTaskId",
					params: {
						taskId: taskId,
					}
				}).then(response => {
					if (response.data.code == "200") {
						console.log(response.data.data)
						this.resultInfo = response.data.data.ActionResult
						this.taskInfo = response.data.data.VideoTask
						var haveEval=response.data.data.haveEval
						if (haveEval == 1) {
							this.evaluate.evaluateId = response.data.data.ResultEvaluate.evaluateId;
							this.evaluate.resultId = response.data.data.ResultEvaluate.resultId;
							this.evaluate.userId = response.data.data.ResultEvaluate.userId;
							this.evaluate.taskId = response.data.data.ResultEvaluate.taskId;
							this.evaluate.isTrue = response.data.data.ResultEvaluate.isTrue;
							this.evaluate.trueAction = response.data.data.ResultEvaluate.trueAction;
							this.evaluate.createDate = response.data.data.ResultEvaluate.createDate;
							this.evaluate.state = response.data.data.ResultEvaluate.state;
							this.evaluate.taskName = response.data.data.ResultEvaluate.taskName;
						}else{
							this.evaluate.evaluateId =null
							this.evaluate.resultId = this.resultInfo.resultId
							this.evaluate.userId = this.taskInfo.userId
							this.evaluate.taskId = this.taskInfo.taskId;
							this.evaluate.isTrue = 1;
							this.evaluate.trueAction = "";
							this.evaluate.createDate = null;
							this.evaluate.state = 1;
							this.evaluate.taskName = this.taskInfo.taskName;
						}
					} else {
						this.$message.error("获取失败")
					}

				})
			},
			insertEval() { //添加评价记录
				this.evaluate.createDate = new Date()
				if (this.evaluate.isTrue == 1) {
					this.evaluate.trueAction = this.top1
				}
				this.$axioss({
					method: "post",
					url: this.HOST + "/insertEvaluate",
					data: this.evaluate
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success("创建成功")
					} else {
						this.$message.error("获取失败")
					}
				})
			},
			updateEval() { //更新
				this.$axioss({
					method: "post",
					url: this.HOST + "/updateEvaluate",
					data: this.evaluate
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success("创建成功")
					} else {
						this.$message.error("获取失败")
					}
				})
			},
			goBack() {
				this.$router.go(-1);
			},


		},
		mounted() {
			this.getInfo(this.taskId);

		},
		watch: {

		}
	}
</script>

<style>
</style>
