import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import AddStudent from '../views/AddStudent.vue'
import Student from '../views/Student.vue'
// Se importa el login
import Login from '../views/LoginView.vue'
// Se importa el Storage
import { Storage } from '@ionic/storage';

const routes = [
  {
    path: '/',
    component: Login,
    // Se verifica la sesión antes de activar la ruta
    beforeEnter: async (to, from, next) => {
      let res = await sesionActiva()
      if (res) {
        next('/tabs/addstudent') // Redirección al componente AddStudent
      } else {
        next() // Se muestra el componente de inicio de sesión
      }
    }
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: 'addstudent',
        component: AddStudent,
        // Se verifica la sesión antes de activar la ruta
        beforeEnter: async (to, from, next) => {
          let res = await sesionActiva()
          if (res) {
            next() // Se muestra el componente
          } else {
            next('/') // Redirección al inicio de sesión
          }
        }
      },
      {
        path: 'student',
        component: Student,
        // Se verifica la sesión antes de activar la ruta
        beforeEnter: async (to, from, next) => {
          let res = await sesionActiva()
          if (res) {
            next() // Se muestra el componente
          } else {
            next('/') // Redirección al inicio de sesión
          }
        }
      }
    ]
  }
]

// Función que verifica la existencia del usuario en el storage,
// para mantener o cerrar la sesión
async function sesionActiva() {
  let storage = new Storage()
  await storage.create()
  let usuario = await storage.get('user')
  // Si existe, retorna true; de lo contrario, false
  return (usuario) ? true : false
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

