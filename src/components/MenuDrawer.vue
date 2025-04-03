<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered :class="`bg-dark text-white`">
    <q-list>
      <q-item-label header>
        Sistema Informativo
        <!-- Botón para recargar el menú -->
        <q-btn
          icon="refresh"
          color="primary"
          round
          dense
          flat
          @click="reloadMenu"
          class="q-ml-md"
          title="Recargar Menú"
        />
      </q-item-label>

      <template v-for="(menu, index) in filteredMenuData" :key="index">
        <MenuItem :item="menu" />
      </template>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMenuStore } from 'stores/menuStore'
import MenuItem from 'components/MenuItem.vue'

const menuStore = useMenuStore()
const leftDrawerOpen = ref(false)

// Computed para asegurarse de que no haya problemas de datos vacíos
const filteredMenuData = computed(() => menuStore.menuData || [])

// Cargar los menús al montarse el componente
onMounted(() => {
  menuStore.fetchMenus()
})

// Función para recargar el menú, borrar lo guardado y guardar los nuevos datos
const reloadMenu = async () => {
  // Borra los datos previos del localStorage
  localStorage.removeItem('menuData')
  localStorage.removeItem('menuDataTimestamp')

  // Llamar a la API para obtener los nuevos menús
  await menuStore.fetchMenus()
}
</script>
