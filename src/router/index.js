import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlbumView from '../views/AlbumView.vue'


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
    }
  ]


const router = createRouter({
  history: createWebHistory(),
  routes
})