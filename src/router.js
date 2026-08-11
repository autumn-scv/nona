import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import WorkListPage from './pages/WorkListPage.vue'
import WorkDetailPage from './pages/WorkDetailPage.vue'
import ContactPage from './pages/ContactPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

export const routes = [
  { path: '/', component: HomePage },
  { path: '/works', component: WorkListPage },
  { path: '/works/:slug', component: WorkDetailPage, props: true },
  { path: '/contact', component: ContactPage },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
