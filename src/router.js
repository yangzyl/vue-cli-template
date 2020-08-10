import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';


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
	]
};