<template>
    <q-page class="q-pa-md">
      <h2>Roles y Permisos</h2>
      <p>Gestión de roles y permisos con Spatie.</p>
  
      <q-btn label="Agregar Rol" color="primary" @click="openRoleModal()" />
  
      <q-table
        flat bordered
        :rows="roles"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn icon="edit" color="info" dense flat @click="openRoleModal(props.row)" />
            <q-btn icon="delete" color="negative" dense flat @click="deleteRole(props.row.id)" />
          </q-td>
        </template>
      </q-table>
  
      <q-dialog v-model="roleModal">
        <q-card style="width: 500px; max-width: 90vw;">
          <q-card-section>
            <div class="text-h6">{{ isEditing ? 'Editar Rol' : 'Agregar Rol' }}</div>
          </q-card-section>
  
          <q-card-section>
            <q-input v-model="role.name" label="Nombre del Rol" />
            <q-select v-model="role.permissions" :options="permissions" label="Permisos" multiple />
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn label="Cancelar" color="grey" flat @click="roleModal = false" />
            <q-btn label="Guardar" color="primary" @click="saveRole" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { uid } from 'quasar'
  
  const roles = ref([
    { id: uid(), name: "Administrador", permissions: ["crear usuarios", "editar usuarios"] },
    { id: uid(), name: "Editor", permissions: ["editar artículos"] }
  ])
  
  const permissions = ["crear usuarios", "editar usuarios", "eliminar usuarios", "editar artículos", "publicar artículos"]
  const roleModal = ref(false)
  const isEditing = ref(false)
  const role = ref({ id: null, name: "", permissions: [] })
  
  const columns = [
    { name: "name", label: "Rol", field: "name", align: "left" },
    { name: "permissions", label: "Permisos", field: row => row.permissions.join(", "), align: "left" },
    { name: "actions", label: "Acciones", align: "center" }
  ]
  
  const openRoleModal = (data = null) => {
    isEditing.value = !!data
    role.value = data ? { ...data } : { id: uid(), name: "", permissions: [] }
    roleModal.value = true
  }
  
  const saveRole = () => {
    if (isEditing.value) {
      const index = roles.value.findIndex(r => r.id === role.value.id)
      if (index !== -1) roles.value[index] = { ...role.value }
    } else {
      roles.value.push({ ...role.value })
    }
    roleModal.value = false
  }
  
  const deleteRole = (id) => {
    roles.value = roles.value.filter(r => r.id !== id)
  }
  </script>
  