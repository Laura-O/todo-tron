import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main-view',
            component: require('@/components/Main').default,
        },
        {
            path: '/landing',
            name: 'landing-page',
            component: require('@/components/LandingPage').default,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
