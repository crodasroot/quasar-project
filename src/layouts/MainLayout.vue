<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div>Bienvenido! <strong>Carlos Rodas</strong></div>
        <NotificationButton @close-drawer="closeDrawer" />
        <CloseDrawerButton @close-drawer="closeDrawer" />
      </q-toolbar>
    </q-header>

    <!-- Usar el componente MenuDrawer -->
    <MenuDrawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import CloseDrawerButton from 'components/CloseDrawerButton.vue'
import NotificationButton from 'components/NotificationButton.vue'
import MenuDrawer from 'components/MenuDrawer.vue'  // Importar el componente

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// Función para cerrar el drawer
function closeDrawer() {
  leftDrawerOpen.value = false
}
</script>
