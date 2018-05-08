<style scoped>
	.pointer{
		cursor:pointer;
	}
</style>
<template>
	<div>
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>Main</th>
					<th>Sub</th>
					<th v-for="action in actions">{{ action.type }}</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(permission,$index) in permissions">
					<td>{{ permission.module_main }} </td>
					<td>{{ permission.module_sub }} </td>
					<td v-for="action in actions" >
						<template v-if="action.only.length === 0 || action.only.indexOf(permission.module_id) > -1">
							<span class="fa fa-check has-text-success pointer" v-if="permission.module_actions.indexOf(action.type) > -1" @click="removePermission(permission.module_id,action)"></span>

							<span class="fa fa-times has-text-danger pointer" v-else @click="addPermission(permission.module_id,action)"></span>
						</template>

						<template v-else>
							N/A
						</template>
					</td>
					<td style="width:10%"> 
						<button class="button is-small is-default" v-if="permission.module_sub === 'list'">
							<span class="fa fa-eye pointer"  @click="showPvm(permission)"></span>
						</button>
						
						<button class="button is-small is-default" v-if="permission.module_sub === 'edit'">
							<span class="fa fa-list pointer" ></span>
						</button>
						

						<button class="button is-small is-danger" @click="removeModule(permission.module_id)">
							<span class="fa fa-trash pointer" ></span>
							
						</button>
					</td>
				</tr>
			</tbody>
		</table>

		<permission-viewable-modal ref="pvm" :module-main="selectedPermission.module_main" :module-sub="selectedPermission.module_sub" :group="group" :group-id="groupId" :team="team" :team-id="teamId"></permission-viewable-modal>
	</div>
</template>

<script>
import PermissionViewableModal from './PermissionViewableModal';

export default{
	props:{
		value:Array,
		group:Boolean,
		team: Boolean,
		groupId:Number,
		teamId:Number
	},
	data(){
		return {
			permissions:this.value,
			selectedPermission:{},
			actions:[]
		}
	},
	mounted(){
		this.retriveActions()
	},
	methods:{
		async retriveActions(){
			let {data} = await http.get('/acl/actions');
			this.actions = data.data;
		},
		async removePermission(moduleId,action)
		{
			let {data} = await http.post(`/acl/groups/${this.$route.params.id}/permissions/remove`,{
				module_id : moduleId,
				action_id : action.id
			})
			this.permissions = data.data.permissions;
		},
		async addPermission(moduleId,action)
		{
			let {data} = await http.post(`/acl/groups/${this.$route.params.id}/permissions/add`,{
				module_id : moduleId,
				action_id : action.id
			})
			this.permissions = data.data.permissions;
		},
		async removeModule(moduleId)
		{
			let reqData = {
				group_id: this.$route.params.id,
				module_id: moduleId
			}
			
			let {data} = await http.post(`/acl/groups/${this.$route.params.id}/modules/remove`,reqData)
			this.permissions = data.data.permissions;

		},
		showPvm(permission){
			this.selectedPermission = permission;
			this.$refs.pvm.show();
		}
	},
	watch:{
		permissions(val)
		{
			this.$emit('input',val);
		},
		value(val)
		{
			this.permissions = val;
		}
	},
	components:{
		PermissionViewableModal
	}
}
</script>