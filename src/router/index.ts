import { useAuthenticationStore } from '@/stores/authenticationStore';
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
      component: () => import('@/views/LoginView.vue'),
      meta: { hideNavBar: true },

      beforeEnter: (to, from, next) => {
        const store = useAuthenticationStore();
        if(store.isLoggedIn){
          next({name: 'contacts'})
        }
        else {
          next();
        }
      }
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: () => import('@/views/PasswordReset.vue'),
      meta: { hideNavBar: true, requiresAuth: true }
    },
    {
      path: '/companies',
      name: 'companies-management',
      component: () => import('@/views/CompanyStructure/CompanyStructureManagement.vue'),
      meta: { requiresAuth: true }

    },
    {
      path: '/structure',
      name: 'company-structure',
      component: () => import('@/views/CompanyStructure/CompanyStructureManagement.vue'),
      meta: { requiresAuth: true },
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
    component: () => import('@/views/AdminAccountsManagement.vue'),
    meta: { requiresAuth: true }
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
});
router.beforeEach((to, from) => {
  const store = useAuthenticationStore();
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
