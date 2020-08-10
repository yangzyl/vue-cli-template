import { defaultResponseHandler } from './utils';

export default function WidgetBackend(agent) {
	return Object.assign(function IWidget(widgetId) {
		return {
			get() {
				return agent.post(`widgets/${widgetId}`).then(defaultResponseHandler);
			},
			delete() {
				return agent.delete(`widgets/${widgetId}`).then(defaultResponseHandler);
			},
			update(data) {
				return agent.put(`widgets/${widgetId}`, {

				}).then(defaultResponseHandler);
			},
			share() {
				return agent.get(`widgets/${widgetId}`).then(defaultResponseHandler);
			},
			download(type) {
				return agent.post(`widgets/${widgetId}/${type}`);
			}
		}
	}, {
		create(data) {
			return agent.post(`widgets`, data).then(defaultResponseHandler);
		},
		query() {
			return agent.get(`widgets`).then(defaultResponseHandler);
		},
		isExisted(name, projectId, id) {
			return agent.get('/check/project', {
				params: {
					name: name,
					id: id,
					projectId: projectId
				}
			}).then(defaultResponseHandler);
		}
	})
}