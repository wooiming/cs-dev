<template>
	<div>
		<div class="tags" style="margin-bottom:5px">
			<span class="tag is-info" v-for="(tag,index) in tags" >
				{{ tag }} 
				<button type="button" class="delete is-small" :key="index" @click="remove(index)"></button>
			</span>
		</div>
		<div>
			<text-input v-model="text" @keydown="onKeydown($event)" @blur="onBlur($event)" :disabled="disabled"></text-input>
		</div>
	</div>
</template>

<script>
import BaseInput from './BaseInput.vue';
import TextInput from './TextInput.vue';
export default{
	extends:BaseInput,
	props:{
		value:Array,
		disabled:Boolean
	},
	data(){
		return {
			tags:this.value || [],
			text:null
		}
	},
	methods:{
		onKeydown(e){
			let code = e.code;
			let actionCode = ['Comma','Tab','Enter'];

			if(actionCode.indexOf(code) > -1)
			{
				e.preventDefault();
				this.handle(e)
			}
		},
		onBlur(e){
			this.handle(e);
		},
		handle(e)
		{
			let val = e.srcElement.value;
			if(val.length == 0){
				e.srcElement.value = '';
				return;
			}

			if(this.tags.indexOf(val) == -1){
				this.tags.push(val);
			}
			

			e.srcElement.value = '';
		},
		remove(index){
			this.tags.splice(index,1);
		}
	},
	watch:{
		tags(val){
			this.$emit('input',val);
		}
	},
	components:{
		TextInput
	}
}
</script>