function NullPrincipal() {
	return {
		id: null,
		username: '',
		isAdministrator: false
	};
}

function principalFromLocalStorage() {
	const { user: userJsonString } = window.localStorage;

	if (userJsonString) {
		return JSON.parse(userJsonString);
	} else {
		return NullPrincipal();
	}
}

export default {
	strict: true,
	state: {
		principal: principalFromLocalStorage()
	},
	getters: {
		authenticated(state) {
			return Boolean(state.principal.id !== null);
		}
	},
	mutations: {
		updatePrincipal(state, principal = NullPrincipal()) {
			state.principal = principal;
		}
	}
}