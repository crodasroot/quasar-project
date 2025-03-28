<template>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered >
      <q-list>
        <q-item-label header>
          Sistema Informativo
        </q-item-label>
  
        <!-- Menú con submenús generado dinámicamente -->
        <q-expansion-item
          v-for="(menu, index) in menuData"
          :key="index"
          :label="menu.label"
          :icon="menu.icon"
        >
          <q-list>
            <q-item
              v-for="(item, itemIndex) in menu.items"
              :key="itemIndex"
              clickable
              tag="a"
            
              :href="item.url"
            >
              <q-item-section>
                <!-- Asegúrate de usar un ícono válido de Quasar -->
                <q-item-icon :name="item.icon || 'link'"></q-item-icon>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Simulamos la respuesta de una API
  const menuData = [
    {
      label: 'Docs',
      icon: 'school',
      items: [
        { label: 'Documentation', url: 'https://quasar.dev/docs', icon: 'book' },
        { label: 'Tutorial', url: 'https://quasar.dev/tutorial', icon: 'video_library' }
      ]
    },
    {
      label: 'Community',
      icon: 'people',
      items: [
        { label: 'Clientes', url: '/clientes', icon: 'group' } ,
        { label: 'Discord', url: 'https://chat.quasar.dev', icon: 'chat' },
        { label: 'Twitter', url: 'https://twitter.quasar.dev', icon: 'twitter' }
      ]
    },
    {
      label: 'Projects',
      icon: 'folder',
      items: [
        { label: 'GitHub', url: 'https://github.com/quasarframework/quasar', icon: 'code' },
        { label: 'Awesome Quasar', url: 'https://awesome.quasar.dev' }  // No icon here
      ]
    }
  ]
  
  const leftDrawerOpen = ref(false)
  </script>
  