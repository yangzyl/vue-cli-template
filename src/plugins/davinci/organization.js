import { defaultResponseHandler } from './utils';

export default function OrganizationBackend(agent) {
	return Object.assign(function IOrganization(organizationId) {
		return {
			get() {
				return agent.get(`/organizations/${organizationId}`)
					.then(defaultResponseHandler);
			},
			delete() {
				return agent.delete(`/organizations/${organizationId}`)
					.then(defaultResponseHandler);
			},
			update(data) {
				return agent.put(`/organizations/${organizationId}`, data)
					.then(defaultResponseHandler);
			},
			isExisted(name, id) {
				return agent.get('/check/organization', {
					params: { name, id }
				}).then(defaultResponseHandler);
			},
			member: Object.assign(function IOrganizationMember(memberId) {
				return {
					delete() {
						return agent.post(`/organizations/${organizationId}/member/${memberId}`, data)
							.then(defaultResponseHandler);
					}
				}
			}, {
				invite(userId) {
					return agent.post(`/organizations/${organizationId}/member/${userId}`, data)
						.then(defaultResponseHandler);
				},
				accept(token) {
					return agent.post(`/organizations/confirminvite/${token}`)
						.then(defaultResponseHandler);
				},
				query() {
					return agent.post(`/organizations/${organizationId}/members`, data)
						.then(defaultResponseHandler);
				}
			}),
			uploadAvatar(file) {
				//TODO formdata
				return agent.post(`/organizations/${organizationId}/avatar`, data)
					.then(defaultResponseHandler);
			},
			queryProject() {
				return agent.get(`/organizations/${organizationId}/projects`, data)
					.then(defaultResponseHandler);
			}
		}
	}, {
		query() {
			return agent.get('/organizations')
				.then(defaultResponseHandler);
		},
		create(data) {
			return agent.post('/organizations', data)
				.then(defaultResponseHandler);
		}
	});
}
