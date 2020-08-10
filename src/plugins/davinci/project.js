import { defaultResponseHandler } from './utils';

export default function ProjectBackend(agent) {
	return Object.assign(function IProject(projectId) {
		return {
			get() {
				return agent.get(`/projects/${projectId}`).then(defaultResponseHandler);

			},
			delete() {
				return agent.delete(`/projects/${projectId}`).then(defaultResponseHandler);
			},
			update(data) {
				return agent.put(`/projects/${projectId}`, data).then(defaultResponseHandler);
			},
			transfer(organizationId) {
				/**
				 * {
				 * 	"orgId": 0
				 * }
				 */
				return agent.put(`/projects/${projectId}/transfer`, {
					orgId: organizationId
				}).then(defaultResponseHandler);
			},
			admin: Object.assign(function IProjectAdmin(adminId) {
				return {
					delete() {

					}
				}
			}, {
				create() {

				},
				qeury() {

				}
			}),
			favorite: {
				set() {

				},
				query() {

				},
				delete() {

				}
			}
		}
	}, {
		create(data) {
			/**
			 * {
			 * 	"description": "string",
			 * 	"name": "string",
			 * 	"orgId": 0,
			 * 	"pic": "string",
			 * 	"visibility": true
			 * }
			 */
			return agent.post('/projects', data).then(defaultResponseHandler);
		},
		query() {
			return agent.get('/projects').then(defaultResponseHandler);
		},
		queryByKeyword(keyword, pageNumber = 1, pageSize = 10) {
			return agent.get('/projects/search', {
				params: {
					keyword: keyword,
					pageNum: pageNumber,
					pageSize: pageSize
				}
			}).then(defaultResponseHandler);
		},
		isExisted(name, organizationId, projectId = undefined) {
			return agent.get('/check/project', {
				params: {
					name,
					id: projectId,
					orgId: organizationId
				}
			}).then(defaultResponseHandler);
		}
	});
};