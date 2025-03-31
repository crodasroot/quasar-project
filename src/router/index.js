import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirige si no está autenticado
  } else if (to.path === '/login' && isAuthenticated) {
    next('/'); // Evita que un usuario autenticado vuelva al login
  } else {
    next();
  }
});

export default router;
