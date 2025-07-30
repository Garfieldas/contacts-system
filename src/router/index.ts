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
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: () => import('@/views/PasswordReset.vue')
    },
    {
      path: '/companies',
      name: 'companies-management',
      component: () => import('@/views/CompanyStructure/CompanyStructureManagement.vue')
    },
    {
      path: '/structure',
      name: 'company-structure',
      component: () => import('@/views/CompanyStructure/CompanyStructureManagement.vue'),
      children: [
        {
          path: 'offices',
          name: 'offices',
          component: () => import('@/views/CompanyStructure/OfficesView.vue')
        },
        {
          path: 'departments',
          name: 'departments',
          component: () => import('@/views/CompanyStructure/DepartmentsView.vue')
        },
        {
          path: 'divisions',
          name: 'divisions',
          component: () => import('@/views/CompanyStructure/DivisionsView.vue')
        },
        {
          path: 'groups',
          name: 'groups',
          component: () => import('@/views/CompanyStructure/GroupsView.vue')
        },
      ]
    },
    {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminAccountsManagement.vue')
    },
    {
    path: '/not-found',
    name: 'not-found',
    component: () => import('@/views/Error404.vue')
    },
    {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found'
    }
  ],
})

export default router
