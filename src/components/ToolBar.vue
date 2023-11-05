<template>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logout" icon="logOutOutline">
            Cerrar
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  </template>
  
  <script>
  import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, } from '@ionic/vue'
  import { logOutOutline } from 'ionicons/icons'
  
  export default {
    name: 'ToolBar',
    components: {
      IonHeader, IonToolbar, IonTitle, IonButtons, IonButton
    },
    props: {
      title: String
    },
    data() {
      return {
        logOutOutline
      }
    },
    methods: {
      // Método para cerrar sesión
      async logout() {
        // Se limpia el almacenamiento
        await this.$storage.clear()
        // Se redirecciona al inicio de sesión
        this.$router.push('/')
      }
    }
  }
  </script>