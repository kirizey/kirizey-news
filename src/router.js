import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import PageNotFound from './views/PageNotFound.vue';

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
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'auth' },
      component: () => import('./views/RegisterPage.vue')
    },
    {
      path: '/news',
      name: 'news',
      meta: { layout: 'client' },
      component: () => import('./views/NewsList.vue')
    },
    { path: '*', component: PageNotFound }
  ]
});
