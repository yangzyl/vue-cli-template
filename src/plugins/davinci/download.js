import { defaultResponseHandler } from './utils';

export default function DownloadBackend(agent) {
	return {
		query() {
			agent.get('/download/page')
				.then(defaultResponseHandler)
		},
		create(type, id) {
			agent.post(`/download/submit/${type}/${id}`)
				.then(defaultResponseHandler);
		},
		get(id, token) {
			agent.get(`/download/record/file/${id}/${token}`)
				.then(defaultResponseHandler)
		}
	}
}