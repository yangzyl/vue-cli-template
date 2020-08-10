<template>
	
<div>
	<h4>设置</h4>

	<h4>危险操作</h4>
	<b-card
		no-body
		border-variant="danger"
	>
    <b-list-group flush>
      <b-list-group-item>
				<b-row>
					<b-col>
						<h5>转让这个项目</h5>
						<p>Transfer this repository to another user or to an organization where you have the ability to create repositories. </p>
					</b-col>
					<b-col
						class="d-flex align-items-center"
						cols="auto"
					>
						<b-button
							size="sm"
							variant="danger"
						>转让</b-button>
					</b-col>
				</b-row>
			</b-list-group-item>
      <b-list-group-item>
				<b-row>
					<b-col>
						<h5>删除这个项目</h5>
						<p>Once you delete a repository, there is no going back. Please be certain. </p>
					</b-col>
					<b-col
						class="d-flex align-items-center"
						cols="auto"
					>
						<b-button
							size="sm"
							variant="danger"
						>删除</b-button>
					</b-col>
				</b-row>
			</b-list-group-item>
    </b-list-group>
	</b-card>
</div>

</template>

<script>
export default {

}
</script>

<style>

</style>