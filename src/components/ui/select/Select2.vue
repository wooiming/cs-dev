<style>
	.v-select{
		width:100%;
	}

	.dropdown-toggle{
		width:100%;
	}
</style>
<script>
import vSelect from 'vue-select'
import BaseMixins from '../mixins/Base.vue';

export default{
	extends: vSelect,
	props:{
		required:Boolean
	},
	data(){
		return {
			hasError:false,
			errorMsg:null
		}
	},
	methods:{
		performValidate(){
			this.resetError();
			if(this.required && (!this.value || this.value.length == 0) ){
				this.setErrorMsg('Field is required');
			}

			this.emitValidation();
		},
		emitValidation(){
			this.$emit('validation',this.hasError,this.errorMsg);
			this.$parent.$emit('validation',this.hasError,this.errorMsg);
		},
		resetError(){
			this.hasError = false;
			this.errorMsg = null;
		},
		setErrorMsg(msg){
			this.hasError  = true;
			this.errorMsg = msg;
		}
	}
}
</script>