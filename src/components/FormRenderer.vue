<template>
	<validate-wrapper>
		<div v-for="render in renderInfo">
			<ui-adapter 
				:info="render"
			></ui-adapter>	
		</div>
		
	</validate-wrapper>
</template>

<script>
import ValidateWrapper from './ui/ValidateWrapper.vue';
import UiAdapter from './ui/UiAdapter.vue';

export default{
	props:['main','sub','renderInfo'],
	components:{
		UiAdapter,
		ValidateWrapper
	}
}
</script>