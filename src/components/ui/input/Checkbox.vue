<template>
	<label class="checkbox">
		<input type="checkbox" 
		:class="baseClass" 
		v-model="newVal" 
		:name="name">
		<slot></slot>
	</label>
</template>

<script>
import BaseInput from './BaseInput.vue';
export default{
	extends:BaseInput,
	props:{
		value: {
			type:Boolean
		}
	}
}
</script>