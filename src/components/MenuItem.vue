<template>
    <q-expansion-item
      v-if="item.children && item.children.length"
      :label="item.label"
      :icon="item.icon"
      dense
    >
      <q-list>
        <template v-for="(child, childIndex) in item.children" :key="childIndex">
          <MenuItem :item="child" />
        </template>
      </q-list>
    </q-expansion-item>
  
    <!-- Si el menú no tiene hijos, mostramos el item como un enlace -->
    <q-item v-else-if="item.url" clickable tag="router-link" :to="item.url">
      <q-item-section avatar>
        <q-icon :name="item.icon || 'link'" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item.label }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    item: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  /* Estilo para mostrar submenús como un árbol, añadiendo indentación */
  .q-expansion-item {
    margin-left: 20px; /* Indentación para mostrar el árbol */
  }
  
  .q-list {
    margin-left: 10px; /* Sangría para los elementos hijos */
  }
  </style>
  