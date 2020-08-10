import { defaultResponseHandler } from './utils';

export default function AdministrationBackend(agent) {
	return {
		user: Object.assign(function IAdministrationUser(userId) {
			return {
				get() {
					return agent.get(`/administration/user/${userId}`)
						.then(defaultResponseHandler);
				},
				delete() {
					return agent.delete(`/administration/user/${userId}`)
						.then(defaultResponseHandler);
				},
				resetPassword(oldPassword, newPassword) {
					return agent.put(`/administration/user/${userId}/credential`, {
						old: oldPassword,
						new: newPassword
					}).then(defaultResponseHandler);
				}
			}
		}, {
			create() {
				return agent.post(`/administration/user`)
					.then(defaultResponseHandler);
			},
			query() {
				return agent.get(`/administration/user`)
					.then(defaultResponseHandler);
			}
		})
	}
}