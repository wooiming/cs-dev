<template>
	<div>
		<span v-if="renderType === 'span'"></span>
		<component 
			v-else
			:is="renderType" 
			v-model="newVal"
			:required="false"
			@keydown.enter="keydownEnter"
		>		
		</component>
	</div>
</template>

<script>
import Field from './field';

import {EmailInput,TextInput} from './input';
import {Select2} from './select';

export default{
	props:['value','renderType','field'],
	data(){
		return {
			newVal:null
		}
	},
	methods:{
		keydownEnter(e){
			this.$emit('searchEnterKeydown',this.field,this.newVal)
		}
	},
	watch:{
		newVal(val){
			this.$emit('input',val);
		},
		value(val){
			this.newVal = val;
		}
	},
	components:{
		'b-field' : Field,
		EmailInput,
		TextInput,
		'select-input' : Select2
	}
}
</script>