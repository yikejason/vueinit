import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/user',
    name:'user',
    component:() => import('./Layout/userlayout.vue'),
    children:[

        {
          path:'/user',
          redirect:'/user/login'
        },
        {
            path:'/user/login',
            component:()=> import('./views/User/login.vue')
        }
    ]
  },
  {
    path:'/admin',
    name:'admin',
    component:()=>import('./Layout/basiclayout.vue'),
    children:[
      {
        path:'/admin',
        redirect:'/admin/usermanage'
      },
      {
        path:'/admin/usermanage',
        component:()=>import('./views/Manage/usermanage.vue')
      },

    ]
  },
  {
    path:'/info',
    name:'info',
    component:()=>import('./Layout/basiclayout.vue'),
    children:[
      {
        path:'/info',
        redirect:'/info/infomanage'
      },
      {
        path:'/info/infomanage',
        component:()=>import('./views/Manage/infomanage.vue')
      }
    ]

  },
  {
    path:'/about',
    name:'about',
    component:()=>import('./Layout/basiclayout'),
    children:[
      {
        path:'/about',
        redirect:'/about/aboutUs'
      },
      {
        path:'/about/aboutUs',
        component:()=>import('./views/About/aboutus')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
