<template>
	<div>
		<nav class="level">
			<div class="level-left">
				<div class="level-item">
					<h1 class="title">{{ title }}</h1>	
				</div>
			</div>

			<div class="level-right">
				<div class="level-item">
					<button v-if="canCreate" class="button is-primary">Create</button>
				</div>
			</div>
		</nav>
		<tableview
			ref="tableview"
			:url="url"
			:data="data"
			:columns="columns"
			:scopes="scopes"
			:data-ref="dataRef"
			:edit-url="editUrl"
			@searchEnterKeydown="searchEnterKeydown"
		>
		</tableview>
	</div>
</template>

<script>
import Table from './Table.vue';

export default{

	mounted(){
		this.retrive();
	},
	data(){
		return {
			columns:[],
			data:[],
			scopes:[]
		}
	},
	methods:{
		retrive(){
			http.get(this.url)
			.then( ({data}) => {
				this.$emit('retrived',data);
				
				this.columns = data.columns;
				this.data = data.data;
				this.scopes = data.scopes
			})
		},
		async searchEnterKeydown(field,value)
		{
			let params = {};
			if(value.length > 0)
				params[field] = value;
			let {data} = await http.get(this.url,{params})

			this.columns = data.columns;
			this.data = data.data;
			this.scopes = data.scopes

		}
	},
	computed:{
		title(){
			return _.upperCase(this.$route.params.type);
		},
		url(){
			return this.$route.path;
		},
		dataRef(){
			return this.$route.params.type;
		},
		editUrl(){
			return this.$route.path;
		},
		canCreate(){
			return this.scopes.indexOf('create') > -1;
		}
	},
	watch:{
		$route(to,from){
			this.retrive();
			
		}
	},
	components:{
		'tableview':Table
	}

}
</script>