<template>
  <div id="app">
	  <router-view></router-view>
  </div>
</template>

<script>
	export default {
		name: 'App',
		data(){
			return{
				
			}
		},
		components: {
           
		},
		computed: {
			
		},
		methods: {
		},
		created() {
			//创建时，将vuex中替换为session中数据
			//刷新时，将store中数据保存到 session中
			sessionStorage.getItem("userMsg") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("userMsg")));
			window.addEventListener("beforeunload", () => {
				sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state))
			})
		}
	}
</script>

<style>
  #app {
    height: 100%; margin: 0; padding: 0;width: 1250px;
  }
</style>
