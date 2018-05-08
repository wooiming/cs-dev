const container = { template: '<router-view></router-view>' };
const routes = [
	{ 
		path : '/login', 
		component: require('./components/Login.vue') 
	},
	{
		path: '/:type/:id/edit',
		component: require('./components/EditContainer.vue'),

	},
	{
		path:'/:type',
		component: require('./components/ListContainer.vue')
	},
	
	{
		path: '/acl/:type/:id/edit',
		component: require('./components/EditContainer.vue')
	},
	{
		path: '/acl/:type',
		component: require('./components/ListContainer.vue'),

	}
];

export default routes;