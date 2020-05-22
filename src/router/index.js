import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/Register/Register'
import Login from '../components/Login/Login'
import Main from '../components/Main/Main'
import Person from '../components/Main/component/Person'
import DataCheck from '../components/Main/component/DataCheck'

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
        }
      ]
    }
  ]
})
