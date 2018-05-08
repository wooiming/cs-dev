<script>
import TextInput from './TextInput.vue';
export default{	
	extends:TextInput,
	methods:{
		validation(){
			if( !this.isUrlValid(this.newVal) ){
				this.setErrorMsg('Invalid URL format');
			}
		},
		isUrlValid(userInput) {
		    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		    if(res == null)
		        return false;
		    else
		        return true;
		}
	}
}
</script>