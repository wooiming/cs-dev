<template>
	<component
		v-if="isCustom"	
		:is="customComponent">
	</component>

	<div v-else>
		<form-renderer
			:render-info="data"
		></form-renderer>

		<button class="button is-primary" @click="save"> Save</button>
	</div>
</template>

<script>
import GroupForm from './acl/GroupForm.vue';
import FormRenderer from './FormRenderer.vue';

import swal from 'sweetalert';
export default{
	data(){
		return {
			data:null,
			updateEndpoint:null
		}
	},
	mounted(){
		this.init();
	},
	methods:{
		init(){
			if(!this.isCustom)
			{
				this.retriveForm();
			}
		},
		retriveForm()
		{
			http.get(`/${this.$route.params.type}/${this.$route.params.id}/edit`)
			.then( ({data}) => {
				this.data = data.data
				this.updateEndpoint = data.update_endpoint;
			})
		},
		async save()
		{
			let requestData = {};

			for(let key in this.data)
			{
				let data = this.data[key];

				let value = data.value;

				if(value != null && typeof value === 'object')
				{
					value = value.value;
				}
				requestData[data.ref] = value
			}
			requestData['id'] = this.$route.params.id;
			let {data} = await http.post(this.updateEndpoint,requestData);
			
			if(data.response === 200)
			{
				await swal({
				  title: "Success",
				  text: "Details has been updated",
				  icon: "success",
				})

				this.$router.push({path:'/leads'})
			}

		}
	},
	computed:{
		isCustom(){
			const customType = ['groups','users'];

			return customType.indexOf(this.$route.params.type) > -1;
		},
		customComponent(){
			switch(this.$route.params.type){
				case 'groups':
					return 'group-form'
				break;
				case 'users':
				break;
			}
		}
	},
	components:{
		GroupForm,
		FormRenderer
	}
}
</script>