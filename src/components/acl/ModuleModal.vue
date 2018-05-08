<template>
	<modal
		title="Modules"
		:show="isShow"
		full-height
		hide-cancel-btn
		positiveBtn="Done"
		@ok="save"
		@close="isShow = false"
	>
		<div class="field">
			<label class="label">
				Main
			</label>
			<div class="select">
				<select v-model="selectedMain">
					<option v-for="module in modules" :value="module">{{ module.type }}</option>
				</select>
			</div>
		</div>

		<div class="field" v-if="selectedMain">
			<label class="label">
				Sub
			</label>
			<div class="select">
				<select v-model="module">
					<option v-for="module in selectedMain['modules']" :value="module">{{ module.sub }}</option>
				</select>
			</div>
		</div>
	</modal>
</template>

<script>
import {Modal} from '../ui/modal';
import {Select2} from '../ui/select';
export default{
	props:['value'],
	data(){
		return {
			isShow:false,
			group:this.value,
			module: null,
			selectedMain:null,
			selectedActions:null,
			modules:[],
			actions:[]
		}
	},
	mounted(){
		this.retrieveModules();
		this.retriveActions();
	},
	methods:{
		show(){
			this.isShow = true
		},
		hide(){
			this.isShow = false;
		},
		retrieveModules(){	
			http.get('/acl/modules')
			.then( ({data}) => {
				this.modules = data.data.modules;
			})
		},
		retriveActions(){
			http.get('/acl/actions')
			.then( ({data}) => {
				this.actions = data.data;
			})
		},
		save(){
			this.isShow = false
			let data = {
				group_id: this.$route.params.id,
				module_id: this.module.id
			}

			http.post(`/acl/groups/${this.$route.params.id}/modules/add`,data)
			.then( ({data}) => {
				this.group.permissions = data.data.permissions;
			})
		}
	},
	watch:{
		group(val){
			this.$emit('input',val);
		},
		value(val){
			this.group = val;
		}
	},
	components:{
		Modal,
		Select2
	}
}
</script>