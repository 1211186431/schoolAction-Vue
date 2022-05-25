<template>
	<div>
		<el-container>
			<el-header>
				<myHeader :nowPath="'introduce'"></myHeader>
			</el-header>
			<el-main>
				<div style="margin-left: 20%;">
					<p>系统介绍</p>
					<p>本课题基于mmaction2行为识别框架</p>
					<p>对训练数据集Kinetics400和行为识别算法 Swin Transformer针对“校园危险行为”进行改进</p>
					<p>改进后对测试集的top1的准确率最高可以达到93.93%，top5的准确率可以达到100%</p>
					<p>web系统部分，使用 Java 语言结合 SpringBoot 框架、JS 语言结合 Vue 框架、python语言结合flask框架</p>
					<p>以及 MySQL 数据库等技术设计实现了一个 Web 系统</p>
					<p>并且使用Redis缓存服务器完成行为识别检测任务消息队列 </p>
					<el-image style="width: 700px; height: 300px" :src="src1" :fit="fit"></el-image>
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
				src1: this.HOST + "/block.png",
				fit: "fill"
			}
		},
		methods: {

		}
	}
</script>

<style>
