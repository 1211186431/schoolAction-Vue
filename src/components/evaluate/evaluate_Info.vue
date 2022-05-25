<template>
	<div>
		<el-card shadow="hover" style="width: 80%;margin-bottom: 2%;margin-left: 10%;">
			<div slot="header">
				<el-row>
					<el-col :span="8">
						<span >任务名称：</span>
						<span style="font-size: 20px;">{{evalInfo.taskName}}</span>
					</el-col>
					<el-col :span="8">
						<el-button type="text" @click="editInfo">修改</el-button>
					</el-col>
				</el-row>

			</div>
			<el-row>
				<el-col :span="8">
					<div><span>评价时间：{{createDate}}</span></div>
				</el-col>
				<el-col :span="6">
					<div><span>是否正确：{{isTrue}}</span></div>
				</el-col>
				<el-col :span="8" v-show="isTrue=='错误'">
					<div><span>正确行为：{{evalInfo.trueAction}}</span></div>
				</el-col>
			</el-row>

		</el-card>

	</div>
</template>

<script>
	import * as dateUtils from '../util/myDate.js'
	export default {
		props: {
			evalInfo: Object
		},
		components: {

		},
		computed: {
			userId() { //用户id
				return this.$store.state.userId;
			},
			createDate() { //日期
				let d = new Date(this.evalInfo.createDate);
				return dateUtils.formatDate(d, 'yyyy-MM-dd hh:mm:ss');
			},
			isTrue() { //是否正确
				if (this.evalInfo.isTrue == -1) {
					return "错误"
				} else
					return "正确"
			}

		},
		data() {
			return {
				alllist: [], //所有任务列表
				pageAllSize: 0, //总页数
			}
		},
		methods: {
			editInfo(){
				this.$router.push({
					path: '/evaluate',
					query: {
						taskId:this.evalInfo.taskId
					}
				});
			}
		},
		mounted() {

		}

	}
</script>

<style>
</style>
