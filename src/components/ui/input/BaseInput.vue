<script>
import BaseMixins from '../mixins/Base.vue';

export default{
	mixins:[BaseMixins],
	props:{
		placeholder:{
			type:String
		},
		name:{
			type:String
		},
		disabled:Boolean
	},
	mounted(){

	},
	methods:{
		onKeydown($event){
			this.$emit('keydown',$event);
		}
	}
}
</script>