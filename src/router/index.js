import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlbumView from '../views/AlbumView.vue'
import FavorisView from '../views/FavorisView.vue'


const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/album/:id',
      name: 'album',
      component: AlbumView
    },
    {
      path: '/favoris',
      name: 'favoris',
      component: FavorisView
    }
  ]


const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router