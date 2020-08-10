import { defaultResponseHandler } from './utils';

export default function UserBackend(agent) {
	return Object.assign(function IUser(userId) {
		return {
			update(data) {
				return agent.put(`/users/${userId}`, data)
					.then(defaultResponseHandler);
			},
			setAvatar(file) {
				//TODO formdata
				return agent.post(`/users/${userId}/avatar`, file)
					.then(defaultResponseHandler);
			},
			resetPassword(data) {
				return agent.put(`/users/${userId}/changepassword`, data)
					.then(defaultResponseHandler);
			},
			getProfile() {
				return agent.get(`/users/profile/${userId}`)
					.then(defaultResponseHandler);
			}
		}
	}, {
		sendmail(email) {
			return agent.post('/users/sendmail', {
				email: email
			}).then(defaultResponseHandler);
		},
		getPrincipal() {
			const { user: userJsonString } = window.localStorage;

			if (!userJsonString) {
				throw new Error('Unauthenticated.');
			}

			return JSON.parse(userJsonString);
		},
		query() {
			return agent.get('/users').then(defaultResponseHandler);
		}
	})
}