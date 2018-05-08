<template>
	<modal
		title="Add HOD"
		:show="isShow"
		full-height
		hide-cancel-btn
		positiveBtn="Done"
		@ok="isShow = false"
		@close="isShow = false"
	>
		<div class="field">
			<label class="label">Search user</label>
		</div>
		<user-list @selected="hodSelected"></user-list>

		<table class="table is-fullwidth">
			<tbody>
				<tr v-for="hod in hods">
					<td>{{hod.name}} ({{hod.email}})</td>
					<td class="width:10%"> 
						<button class="button is-small is-danger">
							<span class="fa fa-trash" @click="removeHod(hod)"></span>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</modal>
</template>
<script>
import UserList from './UserList.vue';
import {Modal} from '../ui/modal';

export default{
	props:{
		value:Array
	},
	data(){
		return {
			isShow:false,
			hods: this.value
		}
	},
	methods:{
		show(){
			this.isShow = true
		},
		hide(){
			this.isShow = false;
		},
		hodSelected(user){
			http.post(`/acl/groups/${this.$route.params.id}/add-hod`,{
				user_id : user.user_id
			})
			.then( ({data}) => {
				this.hods.push(user);
			})
			
		},
		removeHod(user){
			http.post(`/acl/groups/${this.$route.params.id}/remove-hod`,{
				user_id : user.user_id
			})
			.then(({data}) => {
				let index = _.map(this.hods,'user_id').indexOf(user.user_id);
				this.hods.splice(index,1);
			})
			
		},
	},
	components:{
		Modal,
		UserList
	},
	watch:{
		hods(val){
			this.$emit('input',val);
		},
		value(val){
			this.hods = val;
		}
	},
}
</script>