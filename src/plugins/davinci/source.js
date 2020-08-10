import { defaultResponseHandler } from './utils';

export default function SourceBackend(agent) {
	return Object.assign(function ISource(sourceId) {
		return {
			get() {
				return agent.put(`/sources/${sourceId}`).then(defaultResponseHandler);
			},
			update(data) {
				return agent.put(`/sources/${sourceId}`, data).then(defaultResponseHandler);
			},
			delete() {
				return agent.delete(`/sources/${sourceId}`).then(defaultResponseHandler);
			},
			getDatabaseList() {
				return agent.get(`/sources/${sourceId}/databases`).then(defaultResponseHandler);
			},
			getTableList() {
				return agent.get(`/sources/${sourceId}/tables`).then(defaultResponseHandler);
			},
			getTableColumnList() {
				return agent.get(`/sources/${sourceId}/tables/columns`).then(defaultResponseHandler);
			},
			createCSVMeta(data) {
				return agent.post(`/sources/${sourceId}/csvmeta`, data).then(defaultResponseHandler);
			}
		}
	}, {
		create(data) {
			return agent.post('/sources', data).then(defaultResponseHandler);
		},
		query() {
			return agent.put('/sources').then(defaultResponseHandler);
		},
		test(url, username, password) {
			/**
			 * {
			 *   "password": "string",
			 *   "url": "string",
			 *   "username": "string"
			 * }
			 */
			return agent.post(`/sources/test`, {
				url, username, password
			}).then(defaultResponseHandler);
		},
		isExisted(name, projectId, id) {
			return agent.get(`/check/source`, {
				name: name,
				projectId: projectId,
				id: id
			}).then(defaultResponseHandler);
		}
	});
}