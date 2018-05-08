<template>
	<input 
		type="text" 
		class="input" 
		:class="baseClass" 
		v-model="newVal" 
		:placeholder="placeholder"
		:name="name"
		@blur="onBlur"
		@keydown="onKeydown($event)"
		:disabled="disabled"
		>
</template>

<script>
import BaseInput from './BaseInput.vue';
export default{	
	name: 'textInput',
	extends:BaseInput
}
</script>