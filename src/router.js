import Vue from 'vue'
import Router from 'vue-router'
import Main from "./router/main.vue"
import Login from "./router/login.vue"
import Register from "./router/register.vue"
import TaskUpload from "./router/taskUpload.vue"
import Record from "./router/record.vue"
import Help from "./router/help.vue"
import Action from "./router/action.vue"
import Evaluatelist from "./router/evaluatelist.vue"
import Evaluate from "./router/evaluate.vue"
import UserHome from "./router/userHome.vue"
import Admin from "./router/admin.vue"
import Introduce from "./router/introduce.vue"
Vue.use(Router)
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => {
	   alert("您已在当前界面")
   })
}
export default new Router({
    mode:'history',
    base:process.env.baseUrl,
    routes:[
		{
		  path: '/main',
		  component: Main
		},
		{
		  path: '/login',
		  component: Login
		},
		{
		  path: '/register',
		  component: Register
		},
		{
		  path: '/taskUpload',
		  component: TaskUpload
		},
		{
		  path: '/record',
		  component: Record
		},{
		  path: '/help',
		  component: Help
		},
		{
		  path: '/action',
		  component: Action
		},
		{
		  path: '/evaluatelist',
		  component: Evaluatelist
		},
		{
		  path: '/evaluate',
		  component: Evaluate
		},
		{
		  path: '/userHome',
		  component: UserHome
		},
		{
		  path: '/admin',
		  component: Admin
		},
		{
			path:'/introduce',
			component:Introduce
		},
		{
			path: '*',
			redirect: "/main"
		}
    ]
})