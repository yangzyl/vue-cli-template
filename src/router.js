import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';

import Workbench from './components/pages/Workbench';
import WorkbenchOverview from './components/pages/Workbench/Overview';
import WorkbenchProject from './components/pages/Workbench/Project';
import WorkbenchProjectPortal from './components/pages/Workbench/Project/Portal';
import WorkbenchProjectView from './components/pages/Workbench/Project/View';
import WorkbenchProjectSource from './components/pages/Workbench/Project/Source';
import WorkbenchProjectWidget from './components/pages/Workbench/Project/Widget';
import WorkbenchProjectSettings from './components/pages/Workbench/Project/Settings';

export default {
	routes: [
		{
			path: '/',
			redirect: '/signin'
		},
		{
			path: '/signin',
			component: SignIn,
			meta: {
				unauthenticated: true
			}
		},
		{
			path: '/signup',
			component: SignUp,
			meta: {
				unauthenticated: true
			}
		},
		{
			path: '/workbench',
			component: Workbench,
			redirect: '/workbench/overview',
			meta: {
				authenticated: true
			},
			children: [
				{
					path: 'overview',
					component: WorkbenchOverview
				},
				{
					path: 'profile'
				},
				{
					path: 'organization'
					// member
					// project
					// roles
				},
				{
					path: 'project/:projectId',
					component: WorkbenchProject,
					redirect: '/workbench/project/:projectId/portal',
					children: [
						{
							path: 'portal',
							component: WorkbenchProjectPortal
						},
						{
							path: 'source',
							component: WorkbenchProjectSource
						},
						{
							path: 'view',
							component: WorkbenchProjectView
						},
						{
							path: 'widget',
							component: WorkbenchProjectWidget
						},
						{
							path: 'settings',
							component: WorkbenchProjectSettings
						},
					]
				}
			]
		}
	]
};