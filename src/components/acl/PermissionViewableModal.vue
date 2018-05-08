<template>
	<modal
		title="Viewable Columns"
		:show="isShow"
		full-height
		@ok="save()"
		@cancel="isShow = false"
		@close="isShow = false"
	>
		<permission-viewable
			:module-main="moduleMain"
			:module-sub="moduleSub"
			:group="group" :group-id="groupId" :team="team" :team-id="teamId"
			ref="pv">
		</permission-viewable>
	</modal>
</template>

<script>
import PermissionViewable from './PermissionViewable';
import {Modal} from '../ui/modal';
export default{
	props:{
		moduleMain:String,
		moduleSub:String,
		group:Boolean,
		team: Boolean,
		groupId:Number,
		teamId:Number
	},
	data(){
		return {
			isShow:false,
		}
	},
	methods:{
		show(){
			this.isShow = true
			setTimeout(()=> this.$refs.pv.retrive(), 100);
			
		},
		hide(){
			this.isShow = false;
		},
		save(){
			this.$refs.pv.save();
			this.hide();
		}
	},
	components:{
		Modal,
		PermissionViewable
	}
}
</script>