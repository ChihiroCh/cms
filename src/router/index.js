import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/pages/home/index.vue'),
        name: '首页',
        // hidden: true,
        meta: { title: '首页' }
      },
      {
        path: '/activity',
        name: '活动管理',
        component: () => import('@/pages/activity/index.vue'),
        meta: { title: '活动管理' }
      }
    ]
  },
  {
    path: '/decorate',
    name: 'decorate',
    component: () => import('@/pages/decorate/index.vue')
  }
];

export default new VueRouter({
  mode: 'hash',
  routes
});
