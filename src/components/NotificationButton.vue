<template>
    <div class="q-pa-md">
      <q-btn-dropdown color="primary" class="dropdown-notifications">
        <!-- Icono con badge de notificaciones no leídas -->
        <template v-slot:label>
          <div class="relative">
            <q-icon name="notifications" size="md" />
            <q-badge 
              v-if="unreadCount > 0" 
              floating 
              color="red" 
              class="blinking-badge"
            >
              {{ unreadCount }}
            </q-badge>
          </div>
        </template>
  
        <!-- Lista de notificaciones -->
        <q-list v-if="notifications.length > 0" bordered separator class="notification-list">
          <q-item 
            v-for="(notification, index) in notifications" 
            :key="index" 
            class="q-pa-sm row items-center justify-between notification-item"
          >
            <q-item-section>
              <q-item-label class="notification-title">{{ notification.title }}</q-item-label>
              <q-item-label caption class="notification-message">{{ notification.message }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn 
                flat dense round 
                icon="close" 
                color="red"
                @click="removeNotification(index)"
                class="close-btn"
              />
            </q-item-section>
          </q-item>
        </q-list>
        
        <!-- Mensaje si no hay notificaciones -->
        <q-item v-else>
          <q-item-section class="text-center text-grey">No hay notificaciones</q-item-section>
        </q-item>
      </q-btn-dropdown>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  
  export default {
    setup() {
      const notifications = ref([
        { title: "Nuevo Mensaje", message: "Tienes un nuevo mensaje de Juan." },
        { title: "Llamada Perdida", message: "Perdiste una llamada de Ana." },
        { title: "Recordatorio", message: "Tienes una reunión a las 3 PM." }
      ]);
  
      // Contar notificaciones sin leer
      const unreadCount = computed(() => notifications.value.length);
  
      // Eliminar la notificación de la lista al hacer clic en "X"
      const removeNotification = (index) => {
        notifications.value.splice(index, 1);
      };
  
      return { notifications, unreadCount, removeNotification };
    }
  };
  </script>
  
  <style scoped>
  /* Efecto de parpadeo para el badge */
  .blinking-badge {
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    50% { opacity: 0.3; }
  }
  
  /* Asegurar que el badge se alinee correctamente con el icono */
  .relative {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .q-badge {
    position: absolute;
    top: -5px;
    right: -10px;
    font-size: 12px;
    padding: 3px 6px;
  }
  
  /* Estilos para el contenedor de la lista de notificaciones */
  .notification-list {
    max-height: 300px; /* Ajusta el tamaño según lo necesites */
    overflow-y: auto;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
  
  /* Estilo para cada notificación */
  .notification-item {
    border-radius: 8px;
    background-color: #f9f9f9;
    margin: 5px 0;
    transition: all 0.3s ease;
  }
  
  .notification-item:hover {
    background-color: #f0f0f0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Limitar el texto de la notificación */
  .notification-title, .notification-message {
    max-width: 180px; /* Ajusta el tamaño según lo necesites */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  /* Personalizar el botón de cerrar */
  .close-btn {
    background-color: #f4f4f4;
    border-radius: 50%;
    padding: 5px;
    transition: background-color 0.3s ease;
  }
  
  .close-btn:hover {
    background-color: #ffcccc;
  }
  
  /* Efecto para las notificaciones sin leer */
  .dropdown-notifications .q-btn-dropdown__menu {
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  </style>
  