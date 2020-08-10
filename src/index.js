
import Vue from 'vue';
import VueRouter from  'vue-router';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import Davinci from './plugins/davinci';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Davinci);
Vue.use(VueI18n);

/**
 * router
 */
import routerOptions from './router';

const router = window.r = new VueRouter(routerOptions);

/**
 * i18n
 */
import i18nMessageEnUs from '@/langs/en_US.yaml';
import i18nMessageZhCn from '@/langs/zh_CN.yaml';

const i18n = new VueI18n({
	locale: 'zh_CN',
	messages: {
		//TODO lazy loading
		en_US: i18nMessageEnUs,
		zh_CN: i18nMessageZhCn
	}
});

/**
 * Vuex.Store
 */
import storeOptions from './store';

const store = new Vuex.Store(storeOptions);

/**
 * Application.vue
 */

import Application from './components/Application';

const app = new Vue({
	i18n,
	router,
	store,
	render(h) {
		return h(Application);
	}
});

window.addEventListener('load', async function bootstrap() {
	async function fetchPrincipal() {
		try {
			const principal = await Vue.$davinci.User.getPrincipal();
	
			store.commit('updatePrincipal', {
				id: principal.id,
				username: principal.username,
				isAdministrator: principal.admin
			});
		} catch (error) {
			store.commit('updatePrincipal');
		}
	}

	router.beforeEach(async function guard(to, _from, next) {
		await fetchPrincipal();

		/**
		 * No matched router then redirect to '/'
		 */
		if (to.matched.length === 0) {
			return next('/');
		}
		
		/**
		 * Switch by authentication.
		 */
		if (store.getters.authenticated) {
			if (to.matched.find(match => match.meta.unauthenticated)) {
				return next('/workbench');
			}
		}

		if (!store.getters.authenticated && to.matched.find(match => match.meta.authenticated)) {
			return next('/signin');
		}

		/**
		 * Normal route.
		 */
		next();
	});

	await fetchPrincipal();
	app.$mount('#app');
	
	if (router.history.current.matched.length === 0) {
		return router.push('/');
	}

	if (store.getters.authenticated) {
		if (router.history.current.matched.find(match => match.meta.unauthenticated)) {
			return router.push('/workbench');
		}
	} else {
		if (router.history.current.matched.find(match => match.meta.authenticated)) {
			return router.push('/signin');
		}
	}
});