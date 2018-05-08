<style scoped>
	.table-data{
		width:100%;
	}
</style>
<template>
	<table class="table table-data">
		<thead>
			<tr>
				<th v-for="col in columns">
					{{col.name}}
				</th>
				<th v-if="hasAction">Actions</th>
			</tr>
			<tr>
				<th v-for="col in columns">
					<search-adapter v-if="col.searchable"
						:render-type="col.search_type"
						:field="col.column"
						@searchEnterKeydown="searchEnterKeydown"
					>
					</search-adapter>
				</th>
				<th ></th>
			</tr>
			
		</thead>
		<tbody>
			<tr v-for="d in data">
				<td v-for="col in columns">
					{{ d[col.column] }}
				</td>
				<td v-if="hasAction">
					<router-link :to="getEditLink(d.id)" v-if="canEdit" class="button is-primary is-small">
						<span class="fa fa-pencil"></span>
					</router-link>

					<router-link :to="`/leads/${d.id}/edit`" v-if="canDelete" class="button is-danger is-small">
						<span class="fa fa-trash"></span>
					</router-link>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import SearchAdapter from './ui/SearchAdapter.vue';
export default{
	props:{
		url:{
			type:String
		},
		editUrl:{
			type:String
		},
		dataRef:{
			type:String
		},
		hasAction:{
			type:Boolean,
			default:true
		},
		columns:{
			type: Array,
			default:[]
		},
		data:{
			type:Array,
			default:[]
		},
		scopes:{
			type:Array,
			default:[]
		}
	},
	data(){
		return {
		}
	},
	mounted(){
	},
	methods:{
		getEditLink(id)
		{
			return (this.editUrl || this.url) + `/${id}/edit`;
		},
		searchEnterKeydown(field,value)
		{
			this.$emit('searchEnterKeydown',field,value)
		}
	},	
	computed:{
		canRead(){
			return this.scopes.indexOf('read') > -1
		},
		canUpdate(){
			return this.scopes.indexOf('update') > -1
		},
		canDelete(){
			return this.scopes.indexOf('delete') > -1
		},
		canEdit(){
			return this.scopes.indexOf('edit') > -1
		}
	},
	components:{
		SearchAdapter
	}
}
</script>