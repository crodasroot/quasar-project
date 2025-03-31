<template>
    <q-page class="q-pa-md">
      <h2>Formulario Completo de Cliente</h2>
  
      <!-- Formulario -->
      <q-form>
        <!-- Nombre -->
        <q-input v-model="formData.nombre" label="Nombre" />
  
        <!-- Email -->
        <q-input v-model="formData.email" label="Email" type="email" class="q-mt-md" />
  
        <!-- Teléfono -->
        <q-input v-model="formData.telefono" label="Número de Teléfono" type="tel" class="q-mt-md" />
  
        <!-- Edad -->
        <q-input v-model="formData.edad" label="Edad" type="number" class="q-mt-md" />
  
        <!-- Fecha de Nacimiento -->
        <q-input
          v-model="formData.fechaNacimiento"
          label="Fecha de Nacimiento"
          type="date"
          class="q-mt-md"
        />
  
        <!-- Fecha (Con rango) -->
        <q-input
          v-model="formData.fecha"
          label="Fecha de Registro"
          type="date"
          min="2020-01-01"
          max="2025-12-31"
          class="q-mt-md"
        />
  
        <!-- ComboBox -->
        <q-combobox
          v-model="formData.estado"
          label="Estado"
          :options="estados"
          class="q-mt-md"
        />
  
        <!-- Multi-Select -->
        <q-multiselect
          v-model="formData.intereses"
          label="Intereses"
          :options="intereses"
          class="q-mt-md"
          multiple
          fill-input
        />
  
        <!-- Checkbox -->
        <q-checkbox
          v-model="formData.terminos"
          label="Aceptar términos y condiciones"
          class="q-mt-md"
        />
  
        <!-- Radio Buttons -->
        <q-radio
          v-model="formData.genero"
          label="Género"
          :options="generos"
          class="q-mt-md"
        />
  
        <!-- Carga de Archivos -->
        <q-file
          v-model="formData.archivo"
          label="Subir Archivo"
          filled
          class="q-mt-md"
          accept="image/*"
          @added="onFileAdded"
        />
  
        <!-- Imagen -->
        <q-img
          :src="formData.archivo ? URL.createObjectURL(formData.archivo) : ''"
          alt="Vista previa"
          class="q-mt-md"
          style="max-width: 200px"
        />
  
        <!-- Tarjeta de Crédito -->
        <q-input
          v-model="formData.tarjetaCredito"
          label="Número de Tarjeta de Crédito"
          type="number"
          mask="#### #### #### ####"
          class="q-mt-md"
        />
  
        <!-- Botón Enviar -->
        <q-btn label="Enviar" color="primary" class="q-mt-md" @click="submitForm" />
      </q-form>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const formData = ref({
    nombre: '',
    email: '',
    telefono: '',
    edad: '',
    fechaNacimiento: '',
    fecha: '',
    estado: '',
    intereses: [],
    terminos: false,
    genero: '',
    archivo: null,
    tarjetaCredito: ''
  })
  
  const estados = ['Activo', 'Inactivo', 'Suspendido']
  const intereses = ['Deportes', 'Música', 'Tecnología', 'Arte']
  const generos = ['Masculino', 'Femenino', 'Otro']
  
  const onFileAdded = (file) => {
    console.log("Archivo agregado: ", file)
  }
  
  const submitForm = () => {
    console.log("Formulario enviado:", formData.value)
  }
  </script>
  