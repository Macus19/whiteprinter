import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/Register/Register'
import Login from '../components/Login/Login'
import Main from '../components/Main/Main'
import Person from '../components/Main/component/Person'
import DataCheck from '../components/Main/component/DataCheck'
import Add from '../components/Main/component/Add/Add'
import Output from '../components/Main/component/Output'
import AboutUs from '../components/Main/component/AboutUs'
import Group from '../components/Main/component/Group'
import Guide from '../components/Main/component/Guide'
import Setting from '../components/Main/component/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/person',
          name: Person,
          component: Person
        },
        {
          path: '',
          name: DataCheck,
          component: DataCheck
        },
        {
          path: '/add',
          name: Add,
          component: Add
        },
        {
          path: '/output',
          name: Output,
          component: Output
        },
        {
          path: '/AboutUs',
          name: AboutUs,
          component: AboutUs
        },
        {
          path: '/Group',
          name: Group,
          component: Group
        },
        {
          path: '/Guide',
          name: Guide,
          component: Guide
        },
        {
          path: '/Setting',
          name: Setting,
          component: Setting
        }
      ]
    }
  ]
})
