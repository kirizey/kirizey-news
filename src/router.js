import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/news' },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'auth' },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'auth' },
      component: () => import('./views/Register.vue')
    },
    {
      path: '/news',
      name: 'news',
      meta: { layout: 'client' },
      component: () => import('./views/News.vue')
    }
  ]
});
