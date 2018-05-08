<template>
	<modal
		title="Add Team"
		:show="isShow"
		full-height
		@ok="save()"
		@cancel="isShow = false"
		@close="isShow = false"
	>
		<div class="field">
			<label class="label">Name</label>
			<div class="control">
				<input type="text" class="input" v-model="name" placeholder="Team Name">
			</div>
		</div>

		<div class="field">
			<label class="label">Team Leads</label>
			<user-list @selected="teamLeadSelect"></user-list>
			<ul>
				<li v-for="tl in teamLeads">
					{{tl.name}} ({{tl.email}})
				</li>
			</ul>
		</div>

		<div class="field">
			<label class="label">Members</label>
			<user-list @selected="userSelected"></user-list>
			<ul>
				<li v-for="member in members">
					{{member.name}} ({{member.email}})
				</li>
			</ul>
		</div>

	</modal>
</template>

<script>
import UserList from './UserList.vue';
import {Modal} from '../ui/modal';

export default{
	props:{
		value: Array,
		groupId: Number
	},
	data(){
		return {
			isShow:false,
			teams:this.value,
			teamLeads:[],
			members:[],
			name: null
		}
	},
	methods:{
		teamLeadSelect(user)
		{
			this.pushUser(user,'teamLeads');
		},
		userSelected(user)
		{
			this.pushUser(user,'members');
		},
		pushUser(user,type)
		{
			if(_.map(this[type],'user_id').indexOf(user.user_id) === -1)
			{
				this[type].push(user);
			}
		},
		save(){
			http.post('/acl/teams/create',{
				name: this.name,
				group_id : this.groupId,
				member_ids:  _.map(this.members,'user_id')
			})
			.then(({data}) => {
				this.teams.push(data.data);
			})
		},
		show(){
			this.isShow = true
		},
		hide(){
			this.isShow = false;
		},
	},
	watch:{
		teams(val){
			this.$emit('input',val);
		},
		value(val){
			this.teams = val;
		}
	},
	components:{
		UserList,
		Modal
	}
}
</script>