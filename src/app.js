import VueRouter from 'vue-router'
import Vue from 'vue';
import axios from 'axios'
import routes from './routes.js';
import _ from 'lodash';

window._ = _;
window.Vue = Vue;

window.AppStore = {}; //should use Vuex instead

window.http = axios.create({
	baseURL: 'http://localhost:8080/my/v3',
	headers:{
		Accept: 'application/json',
		'Content-Type' : 'application/json'
	}
});
  
let axiosTemporary = axios.create();


http.interceptors.request.use( config => {
	return axiosTemporary.get('http://localhost:8080/my/v3/csrf-token')
	.then(({data}) => {
		config.headers['x-csrf-token'] = data.data.token;
		if(window.localStorage.getItem('token')){
			config.headers['Authorization'] = 'Bearer '+window.localStorage.getItem('token');
		}
		return Promise.resolve(config);
	})
	// return config;
})

Vue.use(VueRouter)


const router = new VueRouter({routes});


router.beforeEach((to,from,next)=>{

	if(to.path !== '/login' && !window.localStorage.getItem('token')){

		next({path:'/login'})
	};

    next()
});

const app = new Vue({
    router
}).$mount('#app');
