import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useMenuStore = defineStore('menu', () => {
    const menuData = ref([]);
    const STORAGE_KEY = 'menuData'; // Clave para almacenar en localStorage

    // Cargar menús desde localStorage si están disponibles
    const loadMenuData = () => {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            menuData.value = JSON.parse(storedData);
        }
    };

    // Guardar menús en localStorage
    const saveMenuData = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData.value));
        localStorage.setItem('menuDataTimestamp', Date.now().toString()); // Guardar el timestamp
    };

    // Verificar si los datos en localStorage están actualizados
    const isMenuDataExpired = () => {
        const storedTimestamp = localStorage.getItem('menuDataTimestamp');
        if (storedTimestamp) {
            const currentTime = Date.now();
            const expirationTime = 1000 * 60 * 60; // 1 hora en milisegundos (ajustar según sea necesario)
            return currentTime - storedTimestamp > expirationTime;
        }
        return true;
    };

    // Cargar menús desde la API
    const fetchMenus = async () => {
        try {
            if (isMenuDataExpired()) {
                const response = await axios.get('http://localhost:8000/api/menus');
                menuData.value = response.data;
                saveMenuData(); // Guardar los datos nuevos en localStorage
            } else {
                loadMenuData(); // Cargar los datos desde localStorage
            }
        } catch (error) {
            console.error('Error al cargar menús:', error);
        }
    };

    // Estado del drawer
    const leftDrawerOpen = ref(false);
    const toggleDrawer = () => {
        leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return { menuData, fetchMenus, leftDrawerOpen, toggleDrawer };
});
