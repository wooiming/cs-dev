<template>
	<div>
		<slot></slot>
	</div>
</template>
<script>
export default{
	methods:{
		validate(){

			let children = this.$children;

			let c = children.filter( child => {
				return this.checkValid(child);
			});

			return c.length == 0;
		},
		checkValid(child){
			 if(child.isInput || typeof child.performValidate === 'function'){
			 	return child.performValidate();
			 }

			 if(child.$children.length > 0){
			 	return child.$children.filter( c => this.checkValid(c) ).length > 0;
			 }
		}
	}
}
</script>