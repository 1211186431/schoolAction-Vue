<template>
	<div>
		<el-container>
			<el-aside style="width: 200px;">
				<taskMenu></taskMenu>
			</el-aside>
			<el-main>
				<div v-if="isRecord">
					<div>
						<el-input placeholder="请输入名称" prefix-icon="el-icon-search" v-model="input2" clearable
							style="width: 250px;margin-right: 2%;margin-bottom: 1%;"></el-input>
						<el-radio-group v-model="radio" size="mini">
							<el-radio-button :label="1">降序</el-radio-button>
							<el-radio-button :label="2">升序</el-radio-button>
						</el-radio-group>
						<el-checkbox v-model="checked1" style="margin-left: 2%;">危险行为</el-checkbox>
						<el-checkbox v-model="checked2">安全行为</el-checkbox>
						<el-checkbox v-model="checked3">已评价</el-checkbox>
						<el-checkbox v-model="checked4">未评价</el-checkbox>
					</div>

					<div v-show="this.allTask.length!=0">
						<overAction v-for="item in this.allTask" :taskInfo="item" :key="item.taskId"></overAction>
						<el-pagination layout="prev, pager, next" :total="this.pageAllSize*10"
							@current-change="PageChage" style="margin-left: 30%;">
						</el-pagination>
					</div>

					<div v-show="this.allTask.length==0">
						<span>暂无任务信息</span>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import overAction from './over_action.vue'
	import taskMenu from './task_menu.vue'
	export default {
		components: {
			overAction,
			taskMenu
		},
		computed: {
			userId() { //用户id
				return this.$store.state.userId;
			},
			isOver() { //菜单项
				return this.$route.query.list;
			}
		},
		data() {
			return {
				allTask: [], //所有任务列表
				pageAllSize: 0, //总页数
				isRecord: true, //刷新
				showNum: 2, //一页显示的个数
				radio: 1,
				input2: "",
				checked1: false,
				checked2: false,
				checked3: false,
				checked4: false,
			}
		},
		methods: {
			getAllTask(pageNum, pageSize) { //获取用户全部任务
				this.$axioss({
					method: "get",
					url: this.HOST + "/getTaskByUserId",
					params: {
						userId: this.userId,
						pageNum: pageNum,
						pageSize: pageSize,
						radio: this.radio,
						taskName: this.input2,
						checked1: this.checked1,
						checked2: this.checked2,
						checked3: this.checked3,
						checked4: this.checked4
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.allTask = response.data.data.data;
						this.pageAllSize = response.data.data.totalPages;
					} else {
						this.$message.error("获取失败")
					}

				})
			},
			getNotOverTask(pageNum, pageSize) { //获取未完成
				this.$axioss({
					method: "get",
					url: this.HOST + "/getNotOverTaskByUserId",
					params: {
						userId: this.userId,
						pageNum: pageNum,
						pageSize: pageSize,
						radio: this.radio,
						taskName: this.input2,
						checked1: this.checked1,
						checked2: this.checked2,
						checked3: this.checked3,
						checked4: this.checked4
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.allTask = response.data.data.data;
						this.pageAllSize = response.data.data.totalPages;
					} else {
						this.$message.error("获取失败")
					}

				})
			},
			getOverTask(pageNum, pageSize) { //获取已完成
				this.$axioss({
					method: "get",
					url: this.HOST + "/getOverTaskByUserId",
					params: {
						userId: this.userId,
						pageNum: pageNum,
						pageSize: pageSize,
						radio: this.radio,
						taskName: this.input2,
						checked1: this.checked1,
						checked2: this.checked2,
						checked3: this.checked3,
						checked4: this.checked4
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.allTask = response.data.data.data;
						this.pageAllSize = response.data.data.totalPages;
					} else {
						this.$message.error("获取失败")
					}

				})
			},
			PageChage(x) { //换页
				if (this.isOver == "1") {
					this.getAllTask(x, this.showNum);
				} else if (this.isOver == "2") {
					this.getNotOverTask(x, this.showNum)
				} else if (this.isOver == "3") {
					this.getOverTask(x, this.showNum)
				}
			},
			getTask(n) { //按情况获取任务
				switch (n) {
					case "1":
						this.getAllTask(0, this.showNum);
						break;
					case "2":
						this.getNotOverTask(0, this.showNum);
						break;
					case "3":
						this.getOverTask(0, this.showNum);
						break;
				}
			},

		},
		mounted() {
			this.getTask(this.isOver)
		},
		watch: {
			isOver(n, o) {
				this.getTask(n)
			},
			radio(n, o) {
				this.getTask(this.isOver)
			},
			input2(n, o) {
				this.getTask(this.isOver)
			},
			checked1(n, o) {
				this.getTask(this.isOver)
			},
			checked2(n, o) {
				this.getTask(this.isOver)
			},
			checked3(n, o) {
				this.getTask(this.isOver)
			},
			checked4(n, o) {
				this.getTask(this.isOver)
			}

		}
	}
</script>

<style>
</style>
