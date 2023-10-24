// Importación de las dependencias necesarias para el enrutamiento
import { createRouter, createWebHistory } from '@ionic/vue-router';

// Importación de los componentes de las vistas
import TabsPage from '../views/TabsPage.vue';
import AddStudent from '../views/AddStudent.vue';
import Student from '../views/Student.vue';

// Definición de las rutas de la aplicación
const routes = [
  {
    path: '/',
    redirect: '/tabs/addstudent'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: 'addstudent',
        component: AddStudent
      },
      {
        path: 'student',
        component: Student
      }
    ]
  }
];

// Creación del enrutador
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Configuración de la historia de navegación
  routes // Las rutas definidas anteriormente
});

// Exportación del enrutador para su uso en la aplicación
export default router;

