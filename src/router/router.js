import Main from '@/pages/MainPage';
import EditIdPage from '@/pages/EditIdPage';
import CreateNewJob from '@/pages/CreateNewJob';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: '/edit/:id',
    component: EditIdPage,
  },
  {
    path: '/create-new-job',
    component: CreateNewJob,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
