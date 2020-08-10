<template>
	
<div id="app-overview">
	<b-breadcrumb
		:items="[
			{
				text: $t('page.workbench.overview.label'),
				active: true
			}
		]"
	/>

  <b-tabs content-class="mt-3">
    <b-tab
			:title="$t('page.workbench.overview.list.owned')"
			active
		>
			owned
		</b-tab>
    <b-tab
			:title="$t('page.workbench.overview.list.joined')"
		>
			joined
		</b-tab>
  </b-tabs>
</div>

</template>

<script>
export default {

}
</script>

<style>

</style>