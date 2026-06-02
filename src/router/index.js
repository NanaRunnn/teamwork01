import { createRouter, createWebHashHistory } from 'vue-router'
import {
  getAdminUser,
  getGridUser,
  getSupervisorUser,
} from '../utils/auth'

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
    meta: { requiresRole: 'supervisor' },
    component: () => import('../views/supervisor/FeedbackSubmit.vue'),
  },
  {
    path: '/supervisor/history',
    name: 'supervisor-history',
    meta: { requiresRole: 'supervisor' },
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
    meta: { requiresRole: 'grid' },
    component: () => import('../views/grid/TaskList.vue'),
  },
  {
    path: '/grid/task/:id',
    name: 'grid-task-detail',
    meta: { requiresRole: 'grid' },
    component: () => import('../views/grid/TaskDetail.vue'),
  },
  {
    path: '/grid/confirm/:id',
    name: 'grid-confirm',
    meta: { requiresRole: 'grid' },
    component: () => import('../views/grid/ConfirmAqi.vue'),
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/Login.vue'),
  },
  {
    path: '/admin/feedbacks',
    name: 'admin-feedbacks',
    meta: { requiresRole: 'admin' },
    component: () => import('../views/admin/FeedbackManage.vue'),
  },
  {
    path: '/admin/assign/:id',
    name: 'admin-assign',
    meta: { requiresRole: 'admin' },
    component: () => import('../views/admin/AssignGridMember.vue'),
  },
  {
    path: '/admin/statistics',
    name: 'admin-statistics',
    meta: { requiresRole: 'admin' },
    component: () => import('../views/admin/StatisticsManage.vue'),
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

router.beforeEach((to) => {
  const role = to.meta.requiresRole

  if (role === 'supervisor' && !getSupervisorUser()) {
    return '/supervisor/login'
  }

  if (role === 'admin' && !getAdminUser()) {
    return '/admin/login'
  }

  if (role === 'grid' && !getGridUser()) {
    return '/grid/login'
  }

  return true
})

export default router
