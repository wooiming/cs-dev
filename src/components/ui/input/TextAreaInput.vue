<template>
	<textarea 
	class="textarea"
	v-model="newVal" 
	:placeholder="placeholder"
	@blur="onBlur"
	@keydown="onKeydown($event)"
	:disabled="disabled"
	:name="name"
	>
		
	</textarea>
</template>

<script>
import BaseInput from './BaseInput.vue';
export default{	
	extends:BaseInput
}
</script>