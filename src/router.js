
import { createRouter, createWebHistory } from 'vue-router'
import AllTasks from './views/AllTasks.vue'; // Assuming AllTasks.vue is in the components folder
import AppNew from './views/AppNew.vue';
import AppTask from './views/AppTask.vue';

const routes = [
  {
    createRouter: '',
    path: '/',
    name: 'AllTasks',
    component: AllTasks,
  },
  {
    path: '/new',
    name: 'AppNew',
    component: AppNew
  },
  {
    path: '/task/:id', // Define route parameter ':id'
    name: 'AppTask',
    component: AppTask,
    props: true,
  }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
  })

export default router;
