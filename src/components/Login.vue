<template>
	<section class="hero is-fullheight">
	    <div class="hero-body">
	      <div class="container has-text-centered">
	        <div class="column is-4 is-offset-4">
	          <h3 class="title has-text-grey">Login</h3>
	          <p class="subtitle has-text-grey">Please login to proceed.</p>
	          <div class="box">
	            <form>
	              <div class="field">
	                <div class="control">
	                  <input class="input " type="text" placeholder="Username" v-model="username" autofocus="">
	                </div>
	              </div>

	              <div class="field">
	                <div class="control">
	                  <input class="input" type="password" placeholder="Password" v-model="password">
	                </div>
	              </div>
	              <button type="button" class="button is-block is-info is-large is-fullwidth" @click="login">Login</button>
	            </form>
	          </div>
	        </div>
	      </div>
	    </div>
	  </section>
</template>

<script>
export default{
	data(){
		return {
			username:null,
			password:null
		}
	},
	methods:{
		login(){
			http.post('/login/user',{
				id: this.username,
				password: this.password
			})
			.then( ({data}) => {
				if(data.response === 200)
				{
					let token = data.data.token_data.token;
					window.localStorage.setItem('token',token);	
					this.$router.push({path:'/leads'});
				}
			})
		}
	}
}
</script>