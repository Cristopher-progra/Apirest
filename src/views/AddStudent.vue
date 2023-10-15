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
                        <ion-input
                        label="Nombre"
                        color="warning"
                        label-placement="stacked"
                        maxlength="30"
                        counter
                        fill="outline"
                        shape="round"
                        clear-input="true"
                        placeholder="Nombres y apellidos"
                        v-model="estudiante.nombre"
                        ></ion-input>
                        <br>
                        <ion-input
                        label="Edad"
                        color="warning"
                        label-placement="stacked"
                        fill="outline"
                        shape="round"
                        clear-input="true"
                        placeholder="Edad"
                        type="number"
                        v-model="estudiante.edad"
                        ></ion-input>
                        <br>
                        <ion-input
                        label="Teléfono"
                        color="warning"
                        label-placement="stacked"
                        maxlength="9"
                        counter
                        fill="outline"
                        shape="round"
                        clear-input="true"
                        placeholder="Número de teléfono"
                        v-model="estudiante.telefono"
                        ></ion-input>
                        <br>
                        <ion-input
                        label="Correo electrónico"
                        color="warning"
                        label-placement="stacked"
                        fill="outline"
                        shape="round"
                        clear-input="true"
                        placeholder="Correo electrónico"
                        v-model="estudiante.correo"
                        ></ion-input>
                        <br>
                        <ion-button shape="round" color="warning" expand="block" @click="addStudent">
                        <ion-icon slot="start" :icon="checkmarkOutline" ></ion-icon>
                        Guardar
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-toast
                :duration="2500"
                :message="toastMessage"
                :is-open="toastState"
                @didDismiss="toastState=false"
                :icon="informationCircleOutline"
            ></ion-toast>
        </ion-content>
    </ion-page>
</template>

<script>
import { checkmarkOutline, informationCircleOutline} from 'ionicons/icons'
import {IonPage, IonContent, IonGrid, IonRow, IonCol, IonIcon,
    IonHeader, IonToolbar, IonTitle, IonButton, IonInput,IonToast
} from '@ionic/vue'
import axios from 'axios'

export default {
    name: 'AddStudent',
    components: {
    IonPage, IonContent, IonGrid, IonRow, IonCol, IonIcon,
    IonHeader, IonToolbar, IonTitle, IonButton, IonInput,IonToast
    },
    data(){
        return {
            checkmarkOutline, informationCircleOutline,
            estudiante: {},
            // Variable para controlar la visibilidad del toast
            toastState: false,
            // Variable para guardar el mensaje a mostrar en el toast
            toastMessage: null
            }
        },
        methods: {
            addStudent(){
            // Petición para insertar datos
            axios.post('http://127.0.0.1:8000/api/estudiante/store', this.estudiante)
                .then(response => {
            let res = response.data
                this.estudiante = {}
            if(res.code==200){
                this.toastState = true
                this.toastMessage = res.data
        } 
    })
        .catch(error => console.log('Ha ocurrido un error'))
        } 
    }
}
</script>