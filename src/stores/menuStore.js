import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useMenuStore = defineStore('menu', () => {
  const menuData = ref([])

  // Obtener menús desde la API
  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/menus')
      menuData.value = response.data
    } catch (error) {
      console.error('Error al obtener menús:', error)
    }
  }

  // Obtener menús desde la API
  const getParentMenus = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/parent')
      menuData.value = response.data
    } catch (error) {
      console.error('Error al obtener menús:', error)
    }
  }

  const saveMenu = async (menu) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/menus', menu)
      await fetchMenus() // Refrescar la lista después de guardar
    } catch (error) {
      console.error('Error al guardar menú:', error)
    }
  }

  const updateMenu = async (id, menu) => {
    try {
      console.log(menu)
      await axios.put(`http://127.0.0.1:8000/api/menus/${id}`, menu)
      await fetchMenus() // Refrescar la lista después de actualizar
    } catch (error) {
      console.error('Error al actualizar menú:', error)
      throw error // Opcional: relanzar el error para manejo en el componente
    }
  }

  const updateOrder = async (menu) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/menus/update-order`, menu)
      await fetchMenus() // Refrescar la lista después de actualizar
    } catch (error) {
      console.error('Error al actualizar menú:', error)
      throw error // Opcional: relanzar el error para manejo en el componente
    }
  }

  // Método para eliminar un menú (opcional, pero útil)
  const deleteMenu = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/menus/${id}`)
      await fetchMenus() // Refrescar la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar menú:', error)
      throw error
    }
  }

  return { menuData, fetchMenus, saveMenu, getParentMenus, updateMenu, deleteMenu, updateOrder }
})
