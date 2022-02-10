import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Categoria from '../views/admin/categoria/Categoria.vue'
import CategoriaNuevo from '../views/admin/categoria/CategoriaNuevo.vue'
import Producto from '../views/admin/producto/Producto.vue'
import Pedido from '../views/admin/pedido/Pedido.vue'
import NuevoPedido from '../views/admin/pedido/NuevoPedido.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requireAuth: true}
  },
  {
    path: '/categoria',
    component: Categoria,
    meta: {requireAuth: true}
  },
  {
    path: '/categoria/nuevo',
    component: CategoriaNuevo,
    meta: {requireAuth: true}
  },
  {
    path: '/producto',
    component: Producto,
    meta: {requireAuth: true}
  },
  {
    path: '/pedido',
    component: Pedido,
    meta: {requireAuth: true}
  },
  {
    path: '/pedido/nuevo',
    component: NuevoPedido,
    meta: {requireAuth: true}
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

// middleware
router.beforeEach((to, from, next) => {
  console.log("FROM: ",from)
  console.log("TO: ",to)
  if(to.meta.requireAuth){
    try{
      let token64 = localStorage.getItem("token")
      let token = Buffer.from(token64, 'base64').toString('ascii');
      if(token){
        next()  
      }else{
        next({name: 'Login'})
      }

    }catch(error){
      localStorage.removeItem("token");
      next({name: 'Login'})
    }
  }

  next()
});

export default router
