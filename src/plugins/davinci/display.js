import { defaultResponseHandler } from './utils';

export default function DisplayBackend(agent) {
	return Object.assign(function IDisplay(displayId) {
		return {
			get() {

			},
			update() {

			},
			setAvatar() {

			},
			delete() {

			}
		}
	}, {
		create() {

		},
		query() {

		},
		isExisted() {

		}
	})
}