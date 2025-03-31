<template>
  <q-page class="q-pa-md">
    <h2>Clientes</h2>
    <p>Página de gestión de clientes.</p>

    <!-- Botón para agregar cliente -->
    <q-btn label="Agregar Cliente" color="primary" @click="openModal()" />

    <!-- Tabla de clientes -->
    <q-table
      flat bordered
      :rows="clientes"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" color="info" dense flat @click="openModal(props.row)" />
          <q-btn icon="delete" color="negative" dense flat @click="deleteCliente(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- Modal para agregar/editar cliente -->
    <q-dialog v-model="modalOpen">
      <q-card style="width: 600px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">{{ isEditing ? 'Editar Cliente' : 'Agregar Cliente' }}</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="cliente.nombre" label="Nombre" />
          <q-input v-model="cliente.email" label="Email" type="email" class="q-mt-md" />
          <q-input v-model="cliente.telefono" label="Teléfono" type="tel" class="q-mt-md" />
          <q-input v-model="cliente.direccion" label="Dirección" type="text" class="q-mt-md" />
          <q-input v-model="cliente.fechaNacimiento" label="Fecha de Nacimiento" type="date" class="q-mt-md" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="grey" flat @click="modalOpen = false" />
          <q-btn label="Guardar" color="primary" @click="saveCliente" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { uid } from 'quasar'

const clientes = ref([
  { id: uid(), nombre: "Juan Pérez", email: "juan@example.com", telefono: "123456789", direccion: "Calle 123", fechaNacimiento: "1990-01-01" },
  { id: uid(), nombre: "María López", email: "maria@example.com", telefono: "987654321", direccion: "Avenida 456", fechaNacimiento: "1985-05-15" }
])

const modalOpen = ref(false)
const isEditing = ref(false)
const cliente = ref({ id: null, nombre: "", email: "", telefono: "", direccion: "", fechaNacimiento: "" })

const columns = [
  { name: "nombre", label: "Nombre", field: "nombre", align: "left" },
  { name: "email", label: "Email", field: "email", align: "left" },
  { name: "telefono", label: "Teléfono", field: "telefono", align: "left" },
  { name: "direccion", label: "Dirección", field: "direccion", align: "left" },
  { name: "fechaNacimiento", label: "Fecha de Nacimiento", field: "fechaNacimiento", align: "left" },
  { name: "actions", label: "Acciones", align: "center" }
]

const openModal = (data = null) => {
  isEditing.value = !!data
  cliente.value = data ? { ...data } : { id: uid(), nombre: "", email: "", telefono: "", direccion: "", fechaNacimiento: "" }
  modalOpen.value = true
}

const saveCliente = () => {
  if (isEditing.value) {
    const index = clientes.value.findIndex(c => c.id === cliente.value.id)
    if (index !== -1) clientes.value[index] = { ...cliente.value }
  } else {
    clientes.value.push({ ...cliente.value })
  }
  modalOpen.value = false
}

const deleteCliente = (id) => {
  clientes.value = clientes.value.filter(c => c.id !== id)
}
</script>
