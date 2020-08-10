<template>
	
<b-container>
	<b-form
		@submit.prevent="signin()"
	>
		<b-form-group
			:label="$t('page.signin.form.username.label')"
		>
			<b-form-input
				id="app-credential-username"
				v-model="credential.username"
				autocomplete="off"
				:placeholder="$t('page.signin.form.username.placeholder')"
			/>
		</b-form-group>
		<b-form-group
			:label="$t('page.signin.form.password.label')"
		>
			<b-form-input
				id="app-credential-password"
				v-model="credential.password"
				type="password"
				autocomplete="off"
				:placeholder="$t('page.signin.form.password.placeholder')"
			/>
		</b-form-group>

		<b-button
			type="submit"
			variant="success"
		>{{$t('page.signin.form.signin.label')}}</b-button>
		<b-button
			variant="link"
			to="/signup"
		>{{$t('page.signin.form.signup.label')}}</b-button>
	</b-form>
</b-container>

</template>

<script>
export default {
	data() {
		return {
			credential: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		async signin() {
			try {
				const principal = await this.$davinci.login({
					username: this.credential.username,
					password: this.credential.password
				});
	
				this.$router.push('/workbench');
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style>

</style>