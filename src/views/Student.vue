<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Estudiantes</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title>
                                    Estudiantes
                                </ion-card-title>
                                <ion-card-subtitle>
                                    Listado de estudiantes
                                </ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <ion-list>
                                <template v-for="(estudiante, i) in respuesta" :key="i" ></template>
                                    <ion-item-sliding>
                                    <ion-item :button="true">
                                        <ion-icon slot="start" :icon="personCircle"></ion-icon>
                                        <ion-label>
                                        {{ estudiante.nombre }}
                                        </ion-label>
                                    </ion-item>
                                        <ion-item-options slot="end">
                                        <ion-item-option color="tertiary">
                                        <ion-icon slot="icon-only" :icon="eye"></ion-icon>
                                        </ion-item-option>
                                        <ion-item-option color="success">
                                        <ion-icon slot="icon-only" :icon="create"></ion-icon>
                                        </ion-item-option>
                                        <ion-item-option color="danger">
                                        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                                        </ion-item-option>
                                        </ion-item-options>
                                        </ion-item-sliding>
                                        
                                        <!-- Se mostrará cuando no hayan estudiantes en la tabla -->
                                            <ion-item v-if="respuesta.length==0">
                                            <ion-icon slot="start" :icon="closeCircle"></ion-icon>
                                            <ion-label>No hay registros</ion-label>
                                    </ion-item>
                                </ion-list>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script>
import {
    eye, trash, create, closeCircle, call, mail, personCircle,
    checkmark, checkmarkOutline, informationCircleOutline
    } from 'ionicons/icons'
import {
    IonPage, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonIcon,
    IonLabel, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput, IonItemSliding,
    IonItemOption, IonItemOptions
} from '@ionic/vue'

import axios from 'axios'

export default {
    name: 'Student',
    components: {
    IonPage, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonIcon,
    IonLabel, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput, IonItemSliding,
    IonItemOption, IonItemOptions
    },
    data() {
        return {
            eye, trash, create, closeCircle, call, mail, personCircle,
            checkmark, checkmarkOutline, informationCircleOutline,
            // Variable para guardar los estudiantes registrados
            respuesta: []
            }
        },
        methods: {
            // Petición para consultar datos
            loadData(){
                this.respuesta = []
                axios.get('http://127.0.0.1:8000/api/estudiante/select')
                    .then(response => {
                    let res = response.data
                    if(res.code==200){
                    this.respuesta = res.data
            } }
            )
                .catch(error => console.log('Ha ocurrido un error'))
            }
        },
        // Se ejecuta cuando el componente está a punto de mostrarse
            ionViewWillEnter(){
        this.loadData()
    }
}
</script>