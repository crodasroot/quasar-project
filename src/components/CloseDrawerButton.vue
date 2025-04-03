<template>
  <div class="q-pa-md">
    <q-btn-dropdown color="primary" label="Perfil">
      <q-list>
        <q-item clickable v-close-popup @click="onProfileClick">
          <q-item-section>
            <q-item-label>Perfil</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onSettingsClick">
          <q-item-section>
            <q-item-label>Configuración</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onLogoutClick">
          <q-item-section>
            <q-item-label>Cerrar Sesión</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const onProfileClick = () => {
      // Lógica para perfil
      console.log('Perfil clickeado')
    }

    const onSettingsClick = () => {
      // Lógica para configuración
      console.log('Configuración clickeada')
    }

    const onLogoutClick = () => {
      localStorage.removeItem('token')
      // Redirigir al login o página inicial
      router.push('/login')
    }

    return {
      onProfileClick,
      onSettingsClick,
      onLogoutClick,
    }
  },
}
</script>
