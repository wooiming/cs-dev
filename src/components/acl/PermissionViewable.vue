<template>
	<div>
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<td>Column</td>
					<td>Show</td>
					<td>Searchable</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="col in columns">
					<td>{{ col.label }}</td>
					<td>
						<label class="checkbox">
						  <input type="checkbox" v-model="col.is_show">
						</label>
					</td>
					<td>
						<label class="checkbox">
						  <input type="checkbox" v-model="col.searchable">
						</label>
					</td>
				</tr>
			</tbody>
		</table>

	</div>
</template>

<script>

export default{
	props:{
		moduleMain:String,
		moduleSub: String,
		group:Boolean,
		team: Boolean,
		groupId:Number,
		teamId:Number
	},
	data(){
		return {
			columns:[]
		}
	},
	mounted(){
	},
	methods:{
		retrive(){
			this.retriveViewableColumns()
		},
		retriveViewableColumns()
		{
			let params = {
				main: this.moduleMain,
				sub: this.moduleSub
			}
			if(this.group){
				params.type = 'group';
				params.group_id = this.groupId
			}

			if(this.team){
				params.type = 'team';
				params.team_id = this.teamId
			}

			http.get('/acl/viewable-columns',{
				params
			})
			.then( ({data}) => {
				this.columns = data.data;
			})
		},
		save(){
			let data = {
				viewable: this.columns
			}

			if(this.group){
				data.type = 'group';
				data.group_id = this.groupId
			}

			if(this.team){
				data.type = 'team';
				data.team_id = this.teamId
			}
			http.post('/acl/viewable-columns',data)
			.then( ({data}) => {
				console.log(data)
			})
		}
	},
	
}
</script>