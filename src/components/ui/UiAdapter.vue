<template>
	<b-field :label="info.label" :required="info.required" v-if="!info.hide">

		<span v-if="info.render_type === 'span'">{{ info.value }}</span>
		<component 
			v-else
			:is="info.render_type" 
			v-model="info.value"
			:disabled="info.readonly"
			:options="info.options"
		>		
		</component>
	</b-field>
</template>

<script>
import Field from './field';

import {EmailInput,TextInput} from './input';
import {Select2} from './select';

export default{
	props:['info','data'],
	mounted(){

		this.$on('validation', (hasError, msg) => {
			this.$emit('validation',hasError,msg);
		})
	},
	components:{
		'b-field' : Field,
		EmailInput,
		TextInput,
		'selection' : Select2
	}
}
</script>