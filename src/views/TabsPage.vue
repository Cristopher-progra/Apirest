<template>
  <ion-page>
  <ion-tabs>
  <ion-router-outlet></ion-router-outlet>
  <ion-tab-bar slot="bottom">
  <ion-tab-button tab="tab1" href="/tabs/addstudent">
  <ion-icon aria-hidden="true" :icon="addCircleOutline" />
  <ion-label>Agregar</ion-label>
  </ion-tab-button>
  <ion-tab-button tab="tab2" href="/tabs/student">
  <ion-icon aria-hidden="true" :icon="personCircleOutline" />
  <ion-label>Estudiante</ion-label>
  </ion-tab-button>
  </ion-tab-bar>
  </ion-tabs>
  </ion-page>
  </template>
  <script setup>
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet }
  from '@ionic/vue';
  import { personCircleOutline, addCircleOutline } from 'ionicons/icons';
  </script>