import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';

import LoginPage from './views/LoginPage.vue';
import PageNotFound from './views/PageNotFound.vue';

Vue.use(Router);

const router = new Router({
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
      meta: { layout: 'client', auth: true },
      component: () => import('./views/NewsList.vue')
    },
    { path: '*', component: PageNotFound }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
