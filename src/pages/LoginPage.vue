<template>
  <q-layout view="lHh LpR lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 100%; max-width: 400px">
          <q-card-section class="text-center">
            <q-avatar size="72px" class="bg-primary text-white">
              <q-icon name="person" size="42px" />
            </q-avatar>
            <div class="text-h5 q-mt-md text-primary">Iniciar sesión</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="login">
              <q-input v-model="authStore.email" label="Email" type="email" filled clearable 
                :rules="[val => !!val || 'El email es requerido', val => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val) || 'Email no válido']" />
              
              <q-input v-model="authStore.password" label="Contraseña" type="password" filled clearable class="q-mt-md"
                :rules="[val => !!val || 'La contraseña es requerida']" />
              
              <q-btn type="submit" label="Iniciar sesión" color="primary" class="full-width q-mt-md" rounded unelevated />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'stores/authStore';
import { useRouter } from 'vue-router';


const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  await authStore.login();
  if (authStore.token) {
    router.push('/');
  }
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}
</style>