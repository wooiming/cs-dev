<template>
	<input 
		type="email" 
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
	extends:BaseInput,
	methods:{
		validation(){
			console.log( this.isEmailValidate(this.newVal) )
			if(!this.isEmailValidate(this.newVal))
			{
				this.setErrorMsg('Email format invalid');
			}
		},
		isEmailValidate(userInput){
			return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInput);

		}
	}
}
</script>