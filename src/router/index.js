import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/supervisor/login',
    name: 'supervisor-login',
    component: () => import('../views/supervisor/Login.vue'),
  },
  {
    path: '/supervisor/register',
    name: 'supervisor-register',
    component: () => import('../views/supervisor/Register.vue'),
  },
  {
    path: '/supervisor/feedback',
    name: 'supervisor-feedback',
    component: () => import('../views/supervisor/FeedbackSubmit.vue'),
  },
  {
    path: '/supervisor/history',
    name: 'supervisor-history',
    component: () => import('../views/supervisor/FeedbackHistory.vue'),
  },
  {
    path: '/grid/login',
    name: 'grid-login',
    component: () => import('../views/grid/Login.vue'),
  },
  {
    path: '/grid/tasks',
    name: 'grid-tasks',
    component: () => import('../views/grid/TaskList.vue'),
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/Login.vue'),
  },
  {
    path: '/admin/feedbacks',
    name: 'admin-feedbacks',
    component: () => import('../views/admin/FeedbackManage.vue'),
  },
  {
    path: '/decision/dashboard',
    name: 'decision-dashboard',
    component: () => import('../views/decision/Dashboard.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
