<template>
	
<div>
	
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">{{$t('page.workbench.menu.overview.label')}}</b-nav-item>
        <b-nav-item href="#">{{$t('page.workbench.menu.system.label')}}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown
          right
          :text="$t('page.workbench.menu.user.label')"
        >
          <!-- Using 'button-content' slot -->
          <b-dropdown-item href="#">{{$t('page.workbench.menu.user.profile')}}</b-dropdown-item>
          <b-dropdown-item
            @click="signout()"
          >{{$t('page.workbench.menu.user.signout')}}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

	<b-container class="p-3">
		<router-view>
			workbench-view
		</router-view>
	</b-container>
</div>

</template>

<script>
export default {
  methods: {
    signout() {
      this.$davinci.logout();
      this.$router.push('/signin');
    }
  }
}
</script>

<style>

</style>