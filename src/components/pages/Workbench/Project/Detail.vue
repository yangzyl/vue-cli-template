<template>
	
<div id="app-project">
	<b-breadcrumb
		:items="[
			{
				text: $t('page.workbench.overview.label'),
				href: '#/workbench/overview'
			},
			{
				text: `${$t('page.workbench.project.label')} - ${project.name}`,
				active: true
			}
		]"
	/>

	<b-row>
		<b-col cols="3">
			<b-list-group>
				<b-list-group-item
					href="#/workbench/project/2/portal"
				>{{$t('page.workbench.project.portal')}}</b-list-group-item>
				<b-list-group-item
					href="#/workbench/project/2/widget"
				>{{$t('page.workbench.project.widget')}}</b-list-group-item>
				<b-list-group-item
					href="#/workbench/project/2/view"
				>{{$t('page.workbench.project.view')}}</b-list-group-item>
				<b-list-group-item
					href="#/workbench/project/2/source"
				>{{$t('page.workbench.project.source')}}</b-list-group-item>
			</b-list-group>
			<b-list-group class="mt-3">
				<b-list-group-item
					href="#/workbench/project/2/settings"
				>{{$t('page.workbench.project.settings')}}</b-list-group-item>
			</b-list-group>
		</b-col>
		<b-col cols="9">
			<router-view>
				
			</router-view>
		</b-col>
	</b-row>
</div>

</template>

<script>
export default {
	data() {
		return {
			project: {
				name: '测试的项目名'
			}
		}
	}
}
</script>

<style>

</style>