<template>
	<div>
		<div class="block">
			<div style="margin-left: 35%;">
				<el-input
				    placeholder="请输入名称"
				    prefix-icon="el-icon-search"
				    v-model="input2" clearable style="width: 250px;margin-right: 2%;margin-bottom: 1%;"></el-input>
				<el-radio-group v-model="radio" size="mini">
					<el-radio-button :label="1">降序</el-radio-button>
					<el-radio-button :label="2">升序</el-radio-button>
				</el-radio-group>
			</div>
			<evaluateInfo v-for="item in this.alllist" :evalInfo="item" :key="item.evaluateId"></evaluateInfo>
			<el-pagination layout="prev, pager, next" :total="this.pageAllSize*10" @current-change="PageChage" style="margin-left: 45%;">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import evaluateInfo from './evaluate_Info.vue'
	export default {
		props: {

		},
		components: {
			evaluateInfo
		},
		computed: {
			userId() { //用户id
				return this.$store.state.userId;
			},
		},
		data() {
			return {
				alllist: [], //所有任务列表
				pageAllSize: 0, //总页数
				allpage:3,//显示页数
				radio: 1,
				input2:""
			}
		},
		methods: {
			getist(pageNum, pageSize) { //获取用户评价列表
				this.$axioss({
					method: "get",
					url: this.HOST + "/getEvaluateByUserId",
					params: {
						userId: this.userId,
						pageNum: pageNum,
						pageSize: pageSize,
						radio:this.radio,
						name:this.input2
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.alllist = response.data.data.data;
						this.pageAllSize = response.data.data.totalPages;
					} else {
						this.$message.error("获取失败")
					}

				})
			},
			PageChage(x) { //换页
				this.getist(x, this.allpage)
			},
		},
		mounted() {
			this.getist(0, this.allpage) //每页一个
		},
		watch: {
			radio(n,o){
				this.getist(0, this.allpage)
			},
			input2(n,o){
				this.getist(0, this.allpage)
			}
			
		}

	}
</script>

<style>
</style>
