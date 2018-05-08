<template>
	<div>
		<select-2 ref="selector" :options="users" v-model="selected" label="name" @search="onSearch" :getOptionLabel="getOptionLabel"></select-2>
	</div>
</template>

<script>
import _ from 'lodash';
import {Select2} from '../ui/select';
export default{
	data(){
		return {
			users:[],
			selected:null
		}
	},
	methods:{
		onSearch(search,loading)
		{
			loading(true)
			this.search(loading,search,this);
		},
		getOptionLabel(option){
			return option.name+'  ('+option.email+')';
		},
		search : _.debounce( (loading,search,vm) => {
			http.get('/acl/users/search',{
				params:{
					search: search
				}
			}).then( ({data}) => {
				vm.users = data.data
				loading(false);
			})
		})
	},
	watch:{
		selected(newVal){
			if(newVal){
				this.$emit('selected',newVal);
				this.selected = null;
				this.$refs.selector.clearSelection()
			}

		}
	},
	components:{
		Select2
	}
}
</script>