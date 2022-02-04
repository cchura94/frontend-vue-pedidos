import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Categoria from '../views/admin/categoria/Categoria.vue'
import CategoriaNuevo from '../views/admin/categoria/CategoriaNuevo.vue'
import Producto from '../views/admin/producto/Producto.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categoria',
    component: Categoria
  },
  {
    path: '/categoria/nuevo',
    component: CategoriaNuevo
  },
  {
    path: '/producto',
    component: Producto
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
