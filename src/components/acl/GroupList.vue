<template>
	<div>
		<h2>Groups</h2>
		<tableview
			url="/acl/groups"
			data-ref="groups"
			edit-url="/acl/groups"
		>
		</tableview>
	</div>
</template>

<script>
import Table from '../Table.vue';

export default{
	components:{
		'tableview': Table
	}
}
</script>