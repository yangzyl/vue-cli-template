/*
 * @Author: yangli
 * @LastEditor: yangli
 * @email: liy@ccccit.com.cn
 * @Date: 2020-04-08 10:23:11
 * @FilePath: /vue-cli-template/src/plugins/davinci/index.js
 */
import axios from 'axios';


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
	};
}