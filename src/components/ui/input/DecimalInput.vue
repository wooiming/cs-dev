<template>
	<input 
		type="text" 
		class="input" 
		:class="baseClass" 
		v-model.number="newVal" 
		:placeholder="placeholder"
		:name="name"
		@blur="onBlur"
		>
</template>

<script>
import numeral from 'numeral';
import BaseInput from './BaseInput.vue';

export default{
	extends:BaseInput,
	props:{
		decimal:{
			type:Number,
			default:2
		},
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
			let d = 0;
			this.newVal =  numeral(val).format(d.toFixed(this.decimal)) ;
		}
	}
}
</script>