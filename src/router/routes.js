const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true }, // Protegemos las rutas dentro de este layout
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'clientes', component: () => import('pages/ClientesPage.vue') },
      { path: 'configuracion', component: () => import('pages/ConfigPage.vue') },
      { path: 'roles', component: () => import('pages/Config/RolesPage.vue') },
      { path: 'asistencia', component: () => import('pages/AsistenciaPage.vue') }
    ]
  },

  // Ruta para el login (sin layout)
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },

  // Ruta para manejar errores 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
