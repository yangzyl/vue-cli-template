import { defaultResponseHandler } from './utils';

export default function ViewBackend(agent) {
	return Object.assign(function IView(viewId) {
		return {
			get() {
				return agent.get(`/views/${viewId}`)
					.then(defaultResponseHandler);
			},
			update(data) {
				return agent.put(`/views/${viewId}`, data)
					.then(defaultResponseHandler);
			},
			delete() {
				return agent.delete(`/views/${viewId}`)
					.then(defaultResponseHandler);
			},
			getData() {
				return agent.delete(`/views/${viewId}/getdata`)
					.then(defaultResponseHandler);
			},
			getDistinctValue() {
				return agent.delete(`/views/${viewId}/getdistinctvalue`)
					.then(defaultResponseHandler);
			}
		}
	}, {
		create() {
			return agent.delete(`/views`)
				.then(defaultResponseHandler);

		},
		query() {
			return agent.get(`/views`)
				.then(defaultResponseHandler);
		},
		isExisted() {
			return agent.get(`/check/view`, {
				params: {

				}
			}).then(defaultResponseHandler);
		},
		execute() {
			agent.post(`/views/executesql`)
				.then(defaultResponseHandler);
		},
		dac: Object.assign(function IViewDAC(name) {
			return (function IViewDACTenant(tenantId) {
				return {
					bizs() {
						return agent.get(`/views/dac/${name}/tenants/${tenantId}/bizs`)
							.then(defaultResponseHandler);
					}
				}
			}, {
				getTenantList() {
					return agent.get(`/views/dac/${name}/tenants`)
						.then(defaultResponseHandler);
				},
			})
		}, {
			getChannelList() {
				return agent.get(`/views/dac/channels`)
					.then(defaultResponseHandler);
			}
		})
	});
}