import { createRouter, createWebHistory } from 'vue-router'
import NavigationBar from '@/views/NavigationBar.vue'
import Home from '@/views/home/Home.vue'
import Exhibit from '@/views/exhibit/Exhibit.vue'
import Management from '@/views/management/Management.vue'
import Personal from '@/views/personal/Personal.vue'
import Detail from '@/views/management/Detail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {

      path: '/',
      component:NavigationBar,

      children: [
        { path: '/home', component: Home },
        { path: '/exhibit', component: Exhibit },
        { path: '/management', component: Management },
        { path: '/personal', component: Personal },


        {
          path: '/artifact/:id', // 路径包含文物的 ID
          name: 'ArtifactDetail',
          component: Detail,
          props: route => ({
            id: route.params.id,
            era: route.query.era,
            location_time: route.query.location_time,
            image: route.query.image,
            name: route.query.name,
            parameter:route.query.parameter,
            category:route.query.category,
            text:route.query.name

          })
        },


        { path: '', redirect: '/home' } // 默认重定向到 home
      ]
      
    },

  ],
})

export default router
