import VueRouter from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import Admin from '../views/Admin'

const router = new VueRouter({
	routes:[
		{
			path: '/student',
			component: () => import('@/components/student/index'),
            children: [
                { path: "", component: () => import('@/components/student/pages/startExam') },
                { path: 'papers', component: () => import('@/components/student/pages/papers') },
                { path: 'examMsg', component: () => import('@/components/student/pages/examMsg') 
                },
                { 
                    path: 'manager', 
                    component: () => import('@/components/student/pages/manager'),
                    children: [
                        { path: '', component: () => import('@/components/student/pages/displayMsg') },
                        { path: 'password', component: () => import('@/components/student/pages/updatePwd') },
                        { path: 'message', component: () => import('@/components/student/pages/updateMsg') }
                    ] 
                },
            ] 
		},
        {
            name:'questionList',
            path:'/questionList',
            component: () => import('@/components/answer/questionList')
        },
        {
            path:'/resultList',
            name:'resultList',
            component: () => import('@/components/answer/resultList')
        },
        {
            path:'/resDetailList',
            name:'resDetailList',
            component: () => import('@/components/answer/resDetailList')
        },
        {
            path:'/wrongQ',
            name:'wrongQ',
            component: () => import('@/components/answer/wrongQ')
        },
        {
            path: '/',
            redirect:'/login',
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin,
            children: [
                {
                    path: '/',
                    component: ()=>import('@/views/Admin/default')
                },
                {
                    path: '/newQuestion',
                    component: ()=>import('@/views/Admin/newQuestion')
                },
                {
                    path: '/allMajor',
                    component: ()=>import('@/views/Admin/MajorPaper')
                },
        
                {
                    path: '/addStudent',
                    component: ()=>import('@/views/Admin/addStudent')
                },
                {
                    path: '/addManager',
                    component: ()=>import('@/views/Admin/addManager')
                },
                {
                    path: '/allStudent',
                    component: ()=>import('@/views/Admin/allStudent')
                },
                {
                    path: '/allManager',
                    component: ()=>import('@/views/Admin/allManager')
                },
                {
                    path: '/accountManager',
                    component: ()=>import('@/views/Admin/accountManager')
                },
                {
                    path: '/accountStudent',
                    component: ()=>import('@/views/Admin/accountStudent')
                },
                {
                    path: '/personal',
                    component: ()=>import('@/views/Admin/personal')
                },
                {
                    path: '/allQuestion',
                    component: ()=>import('@/views/Admin/allQuestion')
                },
                {
                    path: '/modifyQuestion',
                    component: ()=>import('@/views/Admin/modifyQuestion')
                },
            ]
            
        
        },
        {
            path: '/',
            name: 'App',
            component: Login
        },
	]
})

router.beforeEach((to, from, next) => {
    if (to.path ==='/login') {
      next();
    } else {
      let token = localStorage.getItem('token');
      if (from.path!='/login'&&(token === null || token === '')) {
        next('/login');
      } else {
        next()
      }
    }
})

export default router