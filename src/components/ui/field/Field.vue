
<template>

	<div :class="{'field':!hasAddons}">
		
		<label class="label" v-show="showLabel">{{ label }} <span v-show="required" class="has-text-danger">*</span> </label>
		<div class="control" v-if="!hasAddons">
			<div class="control">
				<slot></slot>
			</div>
		</div>
		<div class="field has-addons" v-else>
			<div class="control">
				<slot></slot>
			</div>
			<div class="control">
				<slot name="addons"></slot>
			</div>
		</div>
		<p class="help is-danger" v-show="hasError || error">{{ errorMsg || error }}</p>
	</div>
</template>

<script>
export default{
	name:'BField',
	props:{
		label:{
			type:String
		},
		isHorizontal:{
			type:Boolean,
			default:false
		},
		required:{
			type:Boolean,
			default:false
		},
		hasAddons:Boolean,
		showLabel:{
			type:Boolean,
			default:true
		},
		error:String
	},
	data(){
		return{
			hasError:false,
			errorMsg: null
		}
	},
	mounted(){
		this.$on('validation',(hasError, msg) => {
			this.hasError = hasError;
			this.errorMsg = msg;
		})
	}
}
</script>