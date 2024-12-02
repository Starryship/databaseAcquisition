import { createRouter, createWebHistory } from 'vue-router'
import NavigationBar from '@/views/NavigationBar.vue'
import Home from '@/views/home/Home.vue'
import Exhibit from '@/views/exhibit/Exhibit.vue'
import Management from '@/views/management/Management.vue'
import Personal from '@/views/personal/Personal.vue'
import Detail from '@/views/management/Detail.vue'
import Add from '@/views/management/add.vue'
import Analyse from '@/views/management/Analyse.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: NavigationBar,

      children: [
        { path: '/home', component: Home },
        { path: '/exhibit', component: Exhibit },
        { path: '/management', component: Management },
        { path: '/personal', component: Personal },

        {
          path: '/artifact/:id', // 路径包含文物的 ID
          name: 'ArtifactDetail',
          component: Detail,
          props: (route) => ({
            id: route.params.id,
            // era: route.query.period,
            // location_time: route.query.location_time,
            // image: route.query.thumbnail_path,
            // name: route.query.name,
            // parameter: route.query.parameter,
            // category: route.query.category,
            // text: route.query.description,
          }),
        },


        {
          path: '/artifactEdit/:id', // 路径包含文物的 ID
          name: 'ArtifactEdit',
          component: Add,
          props: (route) => ({
            id: route.params.id,

            name: route.query.name,
            period: route.query.period,
            category: route.query.category,
            parameter: route.query.parameter,
            material: route.query.material,
            thumbnail_path: route.query.thumbnail_path,
            description: route.query.description,

          }),
        },


        
        { path: '/add', name:'add',component: Add },
        { path: '/analyse', name:'analyse',component: Analyse },



        { path: '', redirect: '/home' }, // 默认重定向到 home
      ],

    },

    
  ],
})

export default router
