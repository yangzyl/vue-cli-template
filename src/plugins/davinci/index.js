import axios from 'axios';

import AdministrationBackend from './administration';
import OrganizationBackend from './organization';
import ProjectBackend from './project';
import SourceBackend from './source';
import ViewBackend from './view';
import WidgetBackend from './widget';
import DownloadBackend from './download';
import DisplayBackend from './display';
import PortalBackend from './portal';
import UserBackend from './user';

const TOKEN_KEY_STORED = 'token';
const USER_KEY_STORED = 'user';

export default function install(Vue) {
	const agent = axios.create({
		baseURL: '/api/v3',
		transformRequest: [
			function (data, headers) {
				headers['Content-Type'] = 'application/json';
				headers['Authorization'] = 'Bearer ' + window.localStorage.getItem(TOKEN_KEY_STORED);

				return JSON.stringify(data);
			}
		]
	});

	Vue.$davinci = Vue.prototype.$davinci = {
		login(credential) {
			return agent.post('/login', {
				username: credential.username,
				password: credential.password
			}).then(res => {
				const { localStorage } = window;
				const principal = res.data.payload;

				localStorage.setItem(TOKEN_KEY_STORED, res.data.header.token);
				localStorage.setItem(USER_KEY_STORED, JSON.stringify(principal));

				return principal;
			}, error => {
				throw new Error(error.response.data.header.msg);
				//TODO 5
			});
		},
		logout() {
			window.localStorage.removeItem(TOKEN_KEY_STORED);
			window.localStorage.removeItem(USER_KEY_STORED);
		},
		Download: DownloadBackend(agent),
		Organization: OrganizationBackend(agent),
		Project: ProjectBackend(agent),
		Source: SourceBackend(agent),
		Widget: WidgetBackend(agent),
		View: ViewBackend(agent),
		Administration: AdministrationBackend(agent),
		User: UserBackend(agent),
		// Display: DisplayBackend(agent),
		// Portal: PortalBackend(agent),
	};
}