<template>
	<div>
		<div>
			<p>上传视频</p>
			<el-form ref="videoTask" :model="videoTask" label-width="80px" style="width: 400px;" :rules="rules">
				<el-form-item label="任务名称" prop="taskName">
					<el-input v-model="videoTask.taskName"></el-input>
				</el-form-item>
				<el-form-item label="默认输出">
					<el-checkbox v-model="output_default" disabled>文字</el-checkbox>
					<el-checkbox v-model="output_default" disabled>准确率</el-checkbox>
				</el-form-item>
				<el-form-item label="额外输出">
					<el-radio-group v-model="videoTask.needVideo">
						<el-radio :label="0">无</el-radio>
						<el-radio :label="1">需要视频</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="人物检测" v-show="videoTask.needVideo==1">
					<el-radio-group v-model="videoTask.needDet">
						<el-radio :label="0">无</el-radio>
						<el-radio :label="1">需要人物检测</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="紧急程度">
					<el-radio-group v-model="videoTask.priority">
						<el-radio-button :label="0">一般</el-radio-button>
						<el-radio-button :label="1">紧急</el-radio-button>
						<el-radio-button :label="2">立刻</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-upload class="upload-demo" :action="videoUrl" :data="videoData" :file-list="fileList"
					:before-remove="beforeRemove" :auto-upload="false" ref="upload" :on-success="onUpload"
					:on-error="uploadError" :limit="1" :on-exceed="fileExceed" :on-progress="fileProgress"
					:before-upload="beforeAvatarUpload">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<div slot="tip" class="el-upload__tip">支持上传mp4，avi等格式</div>
				</el-upload>
				<el-form-item>
					<el-button type="primary" @click="submitUpload">立即创建</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-dialog title="创建成功" :visible.sync="dialogVisible" width="30%" @closed="closeDialog">
			<span>任务创建成功！！</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="toResult">查看结果</el-button>
				<el-button @click="dialogVisible=false">继续添加</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed: {
			userId() { //用户id
				return this.$store.state.userId;
			},
		},
		data() {
			var validateTask = (rule, value, callback) => { //用户名验证
				if (value === '') {
					callback(new Error('请输入项目名'));
				} else {
					callback();
				}
			};
			return {
				fileList: [], //视频列表
				output_default: true, //默认输出提示
				videoUrl: this.HOST2 + "/uploadVideo", //视频上传地址
				videoData: { //视频上传参数
					testId: 11
				},
				videoTask: { //任务信息
					taskId: null,
					taskName: '',
					userId: -1,
					needVideo: 0,
					needDet: 0,
					priority: 0,
					taskState: 0,
					filePath: '',
					resultPath: '',
					createDate: '',
					updateDate: '',
					isRight: 0,
					state: 1,
					isDanger: 0
				},
				dialogVisible: false, //上传成功弹窗
				rules: { //验证规则
					taskName: [{
						validator: validateTask,
						trigger: 'blur'
					}],
				}
			};
		},
		methods: {
			insertTask() { //上传任务
				this.videoTask.userId = this.userId;
				this.videoTask.createDate = new Date();
				this.videoTask.updateDate = new Date();
				this.$axioss({
					method: "post",
					url: this.HOST + "/insertTask",
					data: this.videoTask
				}).then(response => {
					if (response.data.code == "200") {
						this.dialogVisible = true;
					} else {
						this.$message.error("失败")
					}
				})
			},
			submitUpload() { //上传文件
				this.$refs['videoTask'].validate((valid) => {
					if (valid) {
						this.$refs.upload.submit();
					} else {
						this.$message.error("数据格式错误")
						return false;
					}
				});

			},
			beforeRemove(file, fileList) { //提示删除
				//return this.$confirm(`确定移除 ${ file.name }？`);
			},
			onUpload(response, file, fileList) { //成功上传
				this.videoTask.filePath = response; //返回文件路径
				this.videoTask.userId = this.userId
				this.insertTask();
			},
			uploadError(err, file, fileList) { //上传失败
				this.$message.error("上传失败请重试")
			},
			fileExceed(files, fileList) { //上传文件超过限制
				this.$message.error("一次只能上传一个文件")
			},
			fileProgress(event, file, fileList) { //上传时的钩子，暂时未用

			},
			beforeAvatarUpload(file) { //检测文件格式
				if (file.type == "video/mp4")
					return true
				else{
					this.$message.error("只能上传MP4文件")
				}
				return false
			},
			toResult() { //跳转到结果界面
				this.$router.push({
					path: "/record",
					query: {
						list: "1"
					}
				})
			},
			closeDialog() { //继续添加任务
				this.fileList = [];
				this.videoTask = { //任务信息
					taskId: null,
					taskName: '',
					userId: -1,
					needVideo: 0,
					needDet: 0,
					priority: 0,
					taskState: 0,
					filePath: '',
					resultPath: '',
					createDate: '',
					updateDate: '',
					isRight: 0,
					state: 1,
					isDanger: 0
				}
			}

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h3 {
		margin: 40px 0 0;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
