<script>
export default{
	props:{
		value:[String,Number,Array],
		cls:{
			type:String
		},
		required:Boolean
	},
	data(){
		return {
			newVal:this.value,
			isInput:true,
			hasError:false,
			errorMsg:null
		}
	},
	methods:{
		onBlur(e){
			this.$emit('blur',e);
			this.performValidate();
		},
		onChange(e){
			this.$emit('change',e);
		},
		performValidate(){
			this.resetError();
			this.baseValidation();

			//if has error after running base validation, it should emit and stop. to prevent overwrite the error
			//by function defined by child class
			if(this.hasError){
				this.emitValidation();
				return this.hasError;
			}

			let validationType = typeof this.validation;

			if(validationType !== 'undefined' && validationType == 'function'){
				this.validation();	
			}
			
			this.emitValidation();

			return this.hasError;
		},
		
		baseValidation(){

			if(!this.reuqired)
				return;

			if(this.newVal == null || this.newVal.length == 0){
				this.hasError  = true;
				this.errorMsg = 'Field is required';
				return;
			}

			let val = typeof this.newVal == 'String' ? this.newVal.trim() : this.newVal.toString();

			if(this.required && val.length == 0){
				this.hasError  = true;
				this.errorMsg = 'Field is required';
			}
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
	},
	watch:{
		newVal(val){
			this.$emit('input',val);
		},
		value(val){
			this.newVal = val;
		}
	},
	computed:{
		errorClass(){
			return this.hasError ? 'is-danger' : '';
		},
		baseClass(){
			return this.cls+' '+this.errorClass
		}
	}
}
</script>