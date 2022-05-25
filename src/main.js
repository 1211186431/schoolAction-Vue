import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import Vuex from "vuex";
Vue.config.productionTip = false
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer)
Vue.prototype.$axioss = axios;
Vue.prototype.HOST = "/api";
//Vue.prototype.HOST2 = "http://127.0.0.1:8081";
Vue.prototype.HOST2="http://59.64.78.254:16224"
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
	state: {
		userName:null,
		userId:null
	},
	mutations: {
		addUserInfo(state, userInfo) {  //添加用户信息
			state.userName = userInfo.userName;
			state.userId = userInfo.userId;
		},
		deleteUserInfo(state){
			state.userName=null;
			state.userId=-1
			sessionStorage.setItem("userMsg", JSON.stringify(state))
		}
	},
	actions: {

	}

});

router.beforeEach((to, from, next) => {
	// if (to.path == "/taskUpload" || to.path == "/record"|| to.path == "/evaluatelist" || to.path == "/userHome") {
	// 	if (store.state.userName == null) {
	// 		alert("您还未登录");
	// 		router.push('/login');
	// 	} else
	// 		next();
	// } else {
	// 	next();
	// }
	if (to.path == "/taskUpload" || to.path == "/record"|| to.path == "/evaluatelist" || to.path == "/userHome") {
		if (sessionStorage.getItem("userMsg") == null) {
			alert("您还未登录");
			next('/login');
		} else {
			var j = sessionStorage.getItem("userMsg");
			var t = JSON.parse(j);
			if (t.userName == null) {
				alert("您还未登录");
				next('/login');
			} else
				next();
		}
	} else {
		next();
	}
});



new Vue({
	router,
	store: store,
	render: h => h(App),
}).$mount('#app')
