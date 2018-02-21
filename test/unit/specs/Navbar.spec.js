import Vue from 'vue';
import VueRouter from 'vue-router';

import Navbar from '@/components/Navbar';

describe('Navbar.vue', () => {
    it('should render', () => {
        Vue.use(VueRouter);
        const router = new VueRouter({
            routes: [],
        });

        const vm = new Vue({
            router,
            el: document.createElement('div'),
            render: (h) => h(Navbar),
        }).$mount();

        expect(vm.$el !== null).to.be.true;
        expect(vm.$el.querySelectorAll('a').length).to.equal(4);
        expect(vm.$el.querySelectorAll('.navbar-item').length).to.equal(4);
    });
});
