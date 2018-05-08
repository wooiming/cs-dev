<style scoped>
	.pointer{
		cursor:pointer;
	}
</style>
<template>
	<div>
		<h1>Group Info</h1>	
		<hr>
		<div>
			<div class="field">
				<label class="label">
					Basic Information
					<button class="button is-primary is-small ">
						<span class="fa fa-pencil"></span>
					</button>
				</label>
			</div>
			
			<div class="field is-horizontal">
				<div class="field-label">
					Name :
				</div>
				<div class="field-body">
					{{ group.name }}
				</div>
			</div>

			<div class="field is-horizontal">
				<div class="field-label">
					Type :
				</div>
				<div class="field-body">
					{{ group.type }}
				</div>
			</div>
		</div>
		<hr>

		<div>
			<div class="field">
				<label class="label">
					HOD
					<button class="button is-small is-primary" @click="$refs.editHodModal.show()"><span class="fa fa-pencil"></span></button>
				</label>
				<ul>
					<li v-for="hod in group.hod"> {{ hod.name }} ( {{ hod.email}} )</li>
				</ul>
			</div>
		</div>
		<hr>

		<div>
			<div class="field">
				<label class="label">
					Teams
					<button class="button is-small is-primary">
						<span class="fa fa-plus" @click="$refs.addTeamModal.show()"></span>
					</button>
				</label>

				<table class="table is-fullwidth">
					<tbody>
						<tr v-for="(team,$index) in group.teams">
							<td>{{ team.name }}  ( {{ team.users.length }} members ) </td>
							<td style="width:5%"> 
								<span class="fa fa-pencil pointer" @click="showEditTeamModal($index)"></span>
							</td>
							<td style="width:5%"> 
								<span class="fa fa-trash pointer" @click="removeTeam($index)"></span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<hr>
		<div>
			<div class="field">
				<label class="label">Permissions
					<button class="button is-small is-primary">
						<span class="fa fa-plus" @click="$refs.moduleModal.show()"></span>
					</button>
				</label>
				
			</div>
			<permission v-model="group.permissions" group :group-id="group.id" ></permission>
		</div>

		<edit-hod-modal ref="editHodModal" v-model="group.hod"></edit-hod-modal>

		<edit-team-modal ref="addTeamModal" :group-id="group.id" is-create @created="teamCreated"></edit-team-modal>
		
		<edit-team-modal ref="editTeamModal" v-model="editTeam" ></edit-team-modal>

		<module-modal ref="moduleModal" v-model="group"></module-modal>
	</div>
</template>

<script>
import Field from '../ui/field';

import {EmailInput,TextInput} from '../ui/input';
import {Select2} from '../ui/select';

import UserList from './UserList.vue';

import {Modal} from '../ui/modal';
import EditHodModal from './EditHodModal.vue';
import AddTeamModal from './AddTeamModal.vue';
import EditTeamModal from './EditTeamModal.vue';
import ModuleModal from './ModuleModal.vue';

import Permission from './Permission.vue';

import swal from 'sweetalert';
import _ from 'lodash';
export default{
	data(){
		return {
			showEditHodModal:false,
			hodInModals:[],
			actions:[],
			group:[],
			members: [],
			groupTypes: [],
			editTeam:null
		}
	},
	mounted(){
		return this.retrive(this.$route.params.id);
	},
	methods:{
		retrive(id)
		{
			http.get(`/acl/groups/${id}`)
			.then(({data}) => {
				this.group = data.data;
				this.members = this.group.users;
				this.teams = this.group.teams

			})

			http.get('/acl/groups/types')
			.then(({data}) => {
				this.groupTypes = data.data;
			})

			http.get('/acl/actions')
			.then( ({data}) => {
				this.actions = data.data;
			})
		},
		hodSelected(user){
			http.post(`/acl/groups/${this.$route.params.id}/add-hod`,{
				user_id : user.user_id
			})
			.then( ({data}) => {
				this.pushHod(user);
			})
			
		},
		pushMember(user)
		{
			if(_.map(this.members,'user_id').indexOf(user.user_id) === -1)
			{
				this.members.push(user);
			}
		},
		pushHod(user)
		{
			if(_.map(this.group.hod,'user_id').indexOf(user.user_id) === -1)
			{
				this.group.hod.push(user);
			}
		},
		memberSelected(user){
			http.post(`/acl/groups/${this.$route.params.id}/add-member`,{
				user_id : user.user_id
			}).then( ({data}) => {
				this.pushMember(user);
			});
		},
		
		removeMember(user){
			http.post(`/acl/groups/${this.$route.params.id}/remove-member`,{
				user_id : user.user_id
			})
			.then(({data}) => {
				let index = _.map(this.members,'user_id').indexOf(user.user_id);

				this.members.splice(index,1);
			})
		},
		removeTeam(index)
		{
			swal({
			  title: "Are you sure?",
			  text: "Once deleted, members in this team will lose their access",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
			  	http.post(`/acl/teams/${this.group.teams[index].id}/remove`)
			  	.then(({data}) => {
			  		this.group.teams.splice(index,1);
			  		swal("The team is deleted", {
			  		  icon: "success",
			  		});
			  	})
			    
			  } 
			});
		},
		showEditTeamModal(index)
		{
			this.editTeam = this.group.teams[index];
			this.$refs.editTeamModal.show()
		},
		teamCreated(team)
		{
			this.group.teams.push(team);
		},
		removePermission(moduleId,action)
		{
			http.post(`/acl/groups/${this.$route.params.id}/permissions/remove`,{
				module_id : moduleId,
				action_id : action.id
			})
			.then( ({data}) => {
				this.group.permissions = data.data.permissions;
			})
		},
		addPermission(moduleId,action)
		{
			http.post(`/acl/groups/${this.$route.params.id}/permissions/add`,{
				module_id : moduleId,
				action_id : action.id
			})
			.then( ({data}) => {
				this.group.permissions = data.data.permissions;
			})
		},
		removeModule(moduleId)
		{
			let data = {
				group_id: this.$route.params.id,
				module_id: moduleId
			}
			http.post(`/acl/groups/${this.$route.params.id}/modules/remove`,data)
			.then( ({data}) => {
				this.group.permissions = data.data.permissions;
			})
		}
	},
	components:{
		'b-field' : Field,
		TextInput,
		Select2,
		UserList,
		Modal,
		EditHodModal,
		AddTeamModal,
		EditTeamModal,
		ModuleModal,
		Permission
	}
}
</script>