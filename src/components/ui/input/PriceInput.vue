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
		min:{
			type:Number,
			default:0
		},
		max:{
			type:Number,
			default:0
		},
		gt:{
			default:0
		},
		lt:{
			default:0
		}
	},
	data(){
		return{
			newMin: this.min,
			newMax: this.max
		}
	},
	mounted(){
		if(this.getDecimal(this.newMin).length > 2){
			ZPLogger.warn('Min decimal should not more than 2');
		}

		if(this.getDecimal(this.newMax).length > 2){
			ZPLogger.warn('Max decimal should not more than 2');
		}
	},
	methods:{
		getDecimal(val){
			return (val.toString().split('.')[1] || []).length;
		},
		validation(){
			if(this.min > 0 && parseFloat(this.newVal) < parseFloat(this.min) ){
				this.setErrorMsg(`Price should not less than `+this.min);
			}

			if(this.max > 0 && parseFloat(this.newVal) > parseFloat(this.max) ){
				this.setErrorMsg(`Price should not more than `+this.max);
			}

			if(this.gt > 0 && this.newVal > 0 && parseFloat(this.newVal) <= parseFloat(this.gt) ){
				this.setErrorMsg(`Price should not less or equal than ${this.gt}`);
			}

			if(this.lt > 0 && this.newVal > 0 && parseFloat(this.newVal) >= parseFloat(this.lt) ){
				this.setErrorMsg(`Price should not more or equal than ${this.lt}`);
			}
		}
	},
	watch:{
		value(val){
			this.newVal = numeral(val).format('0.00');
		}
	}
}
</script>