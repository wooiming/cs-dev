<template>
	<modal
		title="Add Team"
		:show="isShow"
		v-if="team"
		full-height
		@ok="save()"
		@cancel="isShow = false"
		@close="isShow = false"
	>
		<div class="field">
			<label class="label">Name</label>
			<div class="control">
				<input type="text" class="input" v-model="team.name" placeholder="Team Name">
			</div>
		</div>

		<div class="field">
			<label class="label">Team Lead</label>
			<user-list @selected="teamLeadSelected"></user-list>
			<table class="table">
				<tbody>
					<tr v-for="tl in teamLeads">
						<td>{{tl.name}} ({{tl.email}})</td>
						<td style="width:10%">
							<button class="button is-small is-danger">
								<span class="fa fa-trash" @click="removeUser(tl,'teamLeads')"></span>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="field">
			<label class="label">Members</label>
			<user-list @selected="memberSelected"></user-list>
			<table class="table">
				<tbody>
					<tr v-for="member in members">
						<td>{{member.name}} ({{member.email}})</td>
						<td style="width:10%">
							<button class="button is-small is-danger">
								<span class="fa fa-trash" @click="removeUser(member)"></span>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

	</modal>
</template>

<script>
import UserList from './UserList.vue';
import {Modal} from '../ui/modal';

export default
{
	props:{
		value: Object,
		isCreate:Boolean,
		groupId:Number
	},
	data(){
		return {
			team: this.isCreate ?{ name:null,users:[] } :this.value,
			isShow:false,
			members: [],
			teamLeads:[]
		}
	},
	methods:{
		show(){
			this.isShow = true
		},
		hide(){
			this.isShow = false;
		},
		teamLeadSelected(user)
		{
			this.pushUser(user,'teamLeads');
		},
		memberSelected(user)
		{
			this.pushUser(user,'members');
		},
		pushUser(user,type)
		{
			let index = _.map(this[type],'user_id').indexOf(user.user_id);
			if(index === -1)
			{
				this[type].push(user);
			}
		},
		removeUser(user,type = 'members')
		{
			let index = _.map(this[type],'user_id').indexOf(user.user_id);
			this[type].splice(index,1);
		},
		save()
		{
			let url = '/acl/teams';

			if(this.isCreate)
			{
				url +='/create';
			}
			else
			{
				url += `/${this.team.id}/update`;
			}

			http.post(url,{
				name: this.team.name,
				group_id: this.groupId,
				member_ids : _.map(this.members,'user_id'),
				team_lead_ids : _.map(this.teamLeads,'user_id')
			})
			.then(({data}) => {
				if(this.isCreate)
				{
					this.$emit('created',data.data);
				}
				this.team.name = data.data.name;
				this.team.users = data.data.users;
				this.hide();
			})
		}
	},
	watch:{
		team(val){
			this.$emit('input',val);
		},
		value(val){
			this.team = val;
		},
		isShow(val)
		{
			if(val){
				let teamLeads = this.team.users.filter(user => user.is_team_lead);
				this.teamLeads = JSON.parse(JSON.stringify(teamLeads));

				let members = this.team.users.filter(user => !user.is_team_lead);
				this.members = JSON.parse(JSON.stringify(members));
			}
		}
	},
	components:{
		Modal,
		UserList
	}
}
</script>