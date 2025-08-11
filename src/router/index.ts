import { createRouter, createWebHistory } from 'vue-router';
import OrganizationsListView from '../views/OrganizationsListView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'organizationsList',
            component: OrganizationsListView,
        },
        {
            path: '/create-organization',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/OrganizationAddFormView.vue'),
        },
    ],
});

export default router;
