<style scoped>
	.footer-section{
		justify-content: space-between;
	}
	
	.full-height{
		height:100%;
	}
</style>
<template>
<div class="modal" :class="{'is-active':show}">
	<div class="modal-background"></div>
	<div class="modal-card" :class="{'full-height':fullHeight}">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
			<button type="button" class="delete" aria-label="close" @click="$emit('close')"></button>
		</header>
		<section class="modal-card-body full-height" :class="bodyClass" >
			<slot></slot>
		</section>
		<footer class="modal-card-foot footer-section">
			<div>
				<slot name="left-footer">
				</slot>
			</div>

			<div>
				<slot name="footer">
					<button type="button" v-if="!hidePositiveBtn" class="button is-success" :class="{'is-loading':isPositiveBtnLoading}" @click="onClick()"> {{ positiveBtn }}</button>
					<button type="button" v-if="!hideCancelBtn" class="button" @click="$emit('cancel')"> {{ cancelBtn }}</button>
				</slot>
			</div>
			
		</footer>
		
	</div>
</div>
</template>
<script>
export default{
	props:{
		title:{
			type:String,
			required:true,
			default: ''
		},
		positiveBtn:{
			type:String,
			default: 'Save'
		},
		cancelBtn:{
			type:String,
			default: 'Cancel'
		},
		show:{
			type:Boolean,
			default: false
		},
		hidePositiveBtn:Boolean,
		hideCancelBtn:Boolean,
		fullHeight:Boolean,
		bodyClass:{
			default:''
		}
	},
	data(){
		return {
			isPositiveBtnLoading: false
		}
	},
	methods:{
		onClick(){
			this.$emit('ok',this)
		},
		showBtnLoading(){
			this.isPositiveBtnLoading = true;
		},
		hideBtnLoading(){
			this.isPositiveBtnLoading = false;
		}
	}
}
</script>