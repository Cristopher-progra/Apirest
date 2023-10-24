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
                                    <template v-for="(estudiante, i) in respuesta" :key="i" >
                                        <ion-item-sliding>
                                            <ion-item :button="true">
                                                <ion-icon slot="start" :icon="personCircle"></ion-icon>
                                                <ion-label>{{ estudiante.nombre }}</ion-label>
                                            
                                                <ion-buttons>
                                                    <ion-button color="tertiary"  @click="showStudent(estudiante.id, 1)">
                                                        <ion-icon slot="icon-only" :icon="eye"></ion-icon>
                                                    </ion-button>
                                                    <ion-button color="success"  @click="showStudent(estudiante.id, 2)">
                                                        <ion-icon slot="icon-only" :icon="create"></ion-icon>
                                                    </ion-button>
                                                    <ion-button color="danger"  @click="deleteStudent(estudiante.id)">
                                                        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                                                </ion-button>                                            
                                            </ion-buttons>
                                        </ion-item>
                                        </ion-item-sliding>
                                    </template>
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
            <ion-modal :is-open="modalState1" @didDismiss="modalState1=false">
                <!-- Cabecera del modal -->
                <ion-header>
                    <ion-toolbar>
                    <ion-title>Información del estudiante</ion-title>
                    <ion-buttons slot="end">
                        <!-- Botón de cierre del modal -->
                        <ion-button @click="modalState1=false">
                        <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                    </ion-toolbar>
                </ion-header>

                <!-- Contenido del modal -->
                <ion-content class="ion-padding">
                    <ion-list>
                    <!-- Elementos de la lista -->
                    <ion-item>
                        <!-- Icono de una persona -->
                        <ion-icon slot="start" :icon="personCircle"></ion-icon>
                        <!-- Nombre del estudiante -->
                        <ion-label>{{ estudiante.nombre }}</ion-label>
                    </ion-item>
                    <ion-item>
                        <!-- Icono de una marca de verificación -->
                        <ion-icon slot="start" :icon="checkmark"></ion-icon>
                        <!-- Edad del estudiante -->
                        <ion-label>{{ estudiante.edad }}</ion-label>
                    </ion-item>
                    <ion-item>
                        <!-- Icono de un sobre (correo) -->
                        <ion-icon slot="start" :icon="mail"></ion-icon>
                        <!-- Correo del estudiante -->
                        <ion-label>{{ estudiante.correo }}</ion-label>
                    </ion-item>
                    <ion-item>
                        <!-- Icono de un teléfono -->
                        <ion-icon slot="start" :icon="call"></ion-icon>
                        <!-- Número de teléfono del estudiante -->
                        <ion-label>{{ estudiante.telefono }}</ion-label>
                    </ion-item>
                    </ion-list>
                </ion-content>
            </ion-modal>

            <ion-modal :is-open="modalState2" @didDismiss="modalState2=false">
                <!-- Cabecera del modal -->
                <ion-header>
                    <ion-toolbar>
                    <ion-title>Información del estudiante</ion-title>
                    <ion-buttons slot="end">
                        <!-- Botón de cierre del modal -->
                        <ion-button @click="modalState2=false">
                        <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                    </ion-toolbar>
                </ion-header>

                <!-- Contenido del modal -->
                <ion-content class="ion-padding">
                    <!-- Entradas de texto para editar la información del estudiante -->
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

                    <!-- Botón para guardar los cambios -->
                    <ion-button shape="round" color="warning" expand="block" @click="editStudent(estudiante.id)">
                    <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
                    Guardar cambios
                    </ion-button>
                </ion-content>
            </ion-modal>
            <!-- Componente Toast de Ionic -->
            <ion-toast
                :duration="2500" 
                :message="toastMessage"
                :is-open="toastState" 
                @didDismiss="toastState=false" 
                :icon="informationCircleOutline" >
            </ion-toast>

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
    IonItemOption, IonItemOptions,IonModal,IonButtons,IonButton,IonToast
} from '@ionic/vue'

import axios from 'axios'

export default {
    name: 'Student',
    components: {
    IonPage, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonIcon,
    IonLabel, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput, IonItemSliding,
    IonItemOption, IonItemOptions,IonModal,IonButtons,IonButton,IonToast
    },
    data() {
        return {
            eye, trash, create, closeCircle, call, mail, personCircle,
            checkmark, checkmarkOutline, informationCircleOutline,
            // Variable para guardar los estudiantes registrados
            respuesta: [],
            // Variable para controlar la visibilidad del modal
            modalState1: false,
            // Variable para guardar los datos del estudiante
            estudiante: {},
            // Variable para controlar la visibilidad del modal de edición
            modalState2: false,
            // Variable para controlar la visibilidad del toast
            toastState: false,
            // Variable para guardar el mensaje a mostrar en el toast
            toastMessage: null
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
            } 
        } )
                .catch(error => console.log('Ha ocurrido un error'))
            },
            // Función para mostrar información de un estudiante
            showStudent(id, action) {
            // Realiza una solicitud GET a la API para obtener los datos del estudiante
                axios.get(`http://127.0.0.1:8000/api/estudiante/find/${id}`)
                    .then(response => {
                    let res = response.data;
                    // Comprueba si la respuesta tiene un código 200 (éxito)
                    if (res.code === 200) {
                        // Los datos se guardarán en la variable "estudiante"
                        this.estudiante = res.data;
                    }
                    })
                    .catch(error => {
                    // Muestra un mensaje de error en la consola si la solicitud falla
                    console.log('Ha ocurrido un error');
                    });

                // Evalúa la ventana modal a mostrar
                if (action === 1) {
                    this.modalState1 = true; // Cambia la variable a "true" para mostrar el modal
                } else {
                    this.modalState2 = true // Cambia la variable para mostrar el modal de edición
                }
            },
        // Petición para actualizar los datos del estudiante
        editStudent(id) {
        // Realiza una solicitud PUT para actualizar los datos del estudiante
            axios.put(`http://127.0.0.1:8000/api/estudiante/update/${id}`, this.estudiante)
                .then(response => {
                let res = response.data;
                // Comprueba si la respuesta tiene un código 200 (éxito)
                if (res.code === 200) {
                    // Cambia la visibilidad y el mensaje del Toast
                    this.toastState = true;
                    this.toastMessage = res.data;

                    // Cambia la visibilidad del modal para ocultarlo
                    this.modalState2 = false;

                    // Invoca la petición para actualizar la lista
                    this.loadData();
                }
                })
                .catch(error => {
                // Muestra un mensaje de error en la consola si la solicitud falla
                console.log('Ha ocurrido un error');
                });
            },
         // Petición para eliminar datos de un estudiante
        deleteStudent(id) {
            // Realiza una solicitud DELETE para eliminar los datos del estudiante
            axios.delete(`http://127.0.0.1:8000/api/estudiante/delete/${id}`)
                .then(response => {
                let res = response.data;
                // Comprueba si la respuesta tiene un código 200 (éxito)
                if (res.code === 200) {
                    // Cambia la visibilidad y el mensaje del Toast
                    this.toastState = true;
                    this.toastMessage = res.data;

                    // Invoca la petición para actualizar la lista
                    this.loadData();
                }
                })
                .catch(error => {
                // Muestra un mensaje de error en la consola si la solicitud falla
                console.log('Ha ocurrido un error');
                });
            }
        },
        // Se ejecuta cuando el componente está a punto de mostrarse
            ionViewWillEnter(){
        this.loadData()
    }
}
</script>