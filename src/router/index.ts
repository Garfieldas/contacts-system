import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
        path: '',
        name: 'contacts',
        component: () => import('@/views/ContactsView.vue'),
        alias: '/contacts'
        },
        {
          path: 'contacts/:id',
          name: 'contact-details',
          component: () => import('@/views/ContactDetails.vue'),
          props: true
        },
        {
          path: 'contacts/management',
          name: 'contacts-management',
          component: () => import('@/views/ContactsManagement.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/companies',
      children: [
        {
          path: 'management',
          name: 'companies-management',
          component: () => import('@/views/CompaniesManagement.vue')
        },
        {
          path: 'structure',
          name: 'companies-structure',
          component: () => import('@/views/CompanyStructureManagement.vue')
        }
      ]
    },
    {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminAccountsManagement.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/views/Error404.vue')
    }
  ],
})

export default router
