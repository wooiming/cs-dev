<template>
	<input 
		type="number" 
		class="input" 
		:class="baseClass" 
		v-model.number="newVal"
		:placeholder="placeholder"
		:name="name"
		@blur="onBlur"
		>
</template>

<script>
import BaseInput from './BaseInput.vue';

export default{
	extends:BaseInput,
	props:{
		min:{
			type:Number,
			default:0
		},
		max:{
			type:Number,
			default:0
		}
	},
	methods:{
		validation(){
			if(this.min > 0 && this.newVal < this.min){
				this.setErrorMsg(`Value has to at least ${this.min}`)
			}

			if(this.max > 0 && this.newVal > this.max){
				this.setErrorMsg(`Value has to less than ${this.max}`);
			}
		}
	},
	watch:{
		newVal(val){
			this.newVal = val ? parseInt(val.toString()) : val;
		}
	}
}
</script>