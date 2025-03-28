<template>
    <div class="q-pa-md">
      <q-btn-dropdown color="primary" label="Perfil">
        <q-list>
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Perfil </q-item-label>
            </q-item-section>
          </q-item>
  
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Configuración</q-item-label>
            </q-item-section>
          </q-item>
  
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Cerrar Seción</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </template>
  
  <script>
  export default {
    setup () {
      return {
        onItemClick () {
          // console.log('Clicked on an Item')
        }
      }
    }
  }
  </script>
  