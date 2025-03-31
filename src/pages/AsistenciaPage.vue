<template>
    <q-page class="q-pa-md">
      <h2>Asistencia de Alumnos</h2>
      <p>Registro de asistencia de lunes a domingo.</p>
  
      <q-table
        flat bordered
        :rows="alumnos"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <template v-if="props.col.field !== 'name'">
              <q-btn-toggle
                v-model="props.row[props.col.field]"
                :toggle-color="getColor(props.row[props.col.field])"
                :options="[
                  { label: '✔', value: 'A' },
                  { label: '✘', value: 'F' },
                  { label: 'P', value: 'P' }
                ]"
                dense
              />
            </template>
            <template v-else>
              {{ props.row.name }}
            </template>
          </q-td>
        </template>
      </q-table>
  
      <q-btn class="q-mt-md" color="primary" label="Guardar Asistencia" @click="guardarAsistencia" />
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { uid } from 'quasar'
  
  const alumnos = ref([
    { id: uid(), name: "Juan Pérez", lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '', domingo: '' },
    { id: uid(), name: "María López", lunes: '', martes: '', miercoles: '', jueves: '', viernes: '', sabado: '', domingo: '' }
  ])
  
  const columns = [
    { name: "name", label: "Alumno", field: "name", align: "left" },
    { name: "lunes", label: "Lunes", field: "lunes", align: "center" },
    { name: "martes", label: "Martes", field: "martes", align: "center" },
    { name: "miercoles", label: "Miércoles", field: "miercoles", align: "center" },
    { name: "jueves", label: "Jueves", field: "jueves", align: "center" },
    { name: "viernes", label: "Viernes", field: "viernes", align: "center" },
    { name: "sabado", label: "Sábado", field: "sabado", align: "center" },
    { name: "domingo", label: "Domingo", field: "domingo", align: "center" }
  ]
  
  const getColor = (value) => {
    if (value === 'A') return 'green';
    if (value === 'F') return 'red';
    if (value === 'P') return 'orange';
    return 'grey';
  }
  
  const guardarAsistencia = () => {
    console.log("Asistencia guardada", alumnos.value);
  }
  </script>
  