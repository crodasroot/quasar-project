<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-btn
        color="positive"
        icon="add"
        label="Nuevo Menú"
        @click="mostrarModal = true"
        class="q-mb-md"
      />

      <!-- Modal para agregar nuevo menú principal -->
      <q-dialog v-model="mostrarModal">
        <q-card style="width: 400px">
          <q-card-section>
            <div class="text-h6">Agregar Nuevo Menú</div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input v-model="nuevoMenu.label" label="Nombre del Menú" outlined class="q-mb-sm" />
            <q-select
              v-model="nuevoMenu.icon"
              label="Ícono"
              outlined
              :options="iconsData.options"
              option-label="label"
              option-value="value"
              emit-value
              map-options
              class="q-mb-sm"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>

              <template v-slot:selected-item="scope">
                <q-item v-if="scope.opt">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>

          <q-card-actions align="right" class="q-px-md q-pb-md">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn color="positive" label="Guardar Menu" @click="agregarMenu" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Modal para editar menú -->
      <q-dialog v-model="mostrarModalEditar">
        <q-card style="width: 400px">
          <q-card-section>
            <div class="text-h6">Editar Menú</div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input
              v-model="menuSeleccionado.label"
              label="Nombre del Menú"
              outlined
              class="q-mb"
            />
            <q-select
              v-model="menuSeleccionado.parent_id"
              label="Menú Principal"
              outlined
              :options="menusPrincipales"
              option-label="label"
              option-value="id"
              emit-value
              map-options
              class="q-mb-sm"
              clearable
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select
              v-model="menuSeleccionado.icon"
              label="Ícono"
              outlined
              :options="iconsData.options"
              option-label="label"
              option-value="value"
              emit-value
              map-options
              class="q-mb-sm"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>

              <template v-slot:selected-item="scope">
                <q-item v-if="scope.opt">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input v-model="menuSeleccionado.url" label="URL" outlined class="q-mb-sm" />
          </q-card-section>

          <q-card-actions align="right" class="q-px-md q-pb-md">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn color="primary" label="Guardar" @click="guardarEdicion(menuSeleccionado.id)" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Modal para agregar submenú -->
      <q-dialog v-model="mostrarModalSubmenu">
        <q-card style="width: 400px">
          <q-card-section>
            <div class="text-h6">Agregar Submenú</div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input
              v-model="nuevoSubmenu.label"
              label="Nombre del sub Menú"
              outlined
              class="q-mb"
            />
            <q-select
              v-model="nuevoSubmenu.parent_id"
              label="Menú Padre"
              outlined
              :options="menusPrincipales"
              option-label="label"
              option-value="id"
              emit-value
              map-options
              class="q-mb-sm"
              clearable
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select
              v-model="nuevoSubmenu.icon"
              label="Ícono"
              outlined
              :options="iconsData.options"
              option-label="label"
              option-value="value"
              emit-value
              map-options
              class="q-mb-sm"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>

              <template v-slot:selected-item="scope">
                <q-item v-if="scope.opt">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input v-model="nuevoSubmenu.url" label="URL" outlined class="q-mb-sm" />
          </q-card-section>

          <q-card-actions align="right" class="q-px-md q-pb-md">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn color="primary" label="Guardar" @click="agregarSubmenu" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-markup-table flat bordered class="menu-table">
        <thead>
          <tr class="bg-grey-3 text-primary">
            <th class="text-left" style="width: 80px">ID</th>
            <th class="text-left" style="width: 80px">Order</th>
            <th class="text-left">MENÚ</th>
            <th class="text-center" style="width: 100px">ÍCONO</th>
            <th class="text-left">SUBMENÚS</th>
            <th class="text-center" style="width: 150px">ACCIONES</th>
          </tr>
        </thead>
        <draggable
          v-model="menusPrincipales"
          tag="tbody"
          item-key="id"
          @end="guardarOrden(menusPrincipales)"
          handle=".drag-handle"
        >
          <template #item="{ element }">
            <tr :key="element.id" class="menu-row">
              <td class="text-left">{{ element.id }}</td>
              <td class="text-left">{{ element.order }}</td>
              <td class="text-left">
                <div class="row items-center">
                  <q-icon name="drag_indicator" class="drag-handle cursor-grab q-mr-sm" />
                  {{ element.label }}
                </div>
              </td>
              <td class="text-center">
                <q-icon :name="element.icon" size="24px" />
              </td>
              <td class="text-left">
                <div v-if="element.children.length > 0" class="q-gutter-xs">
                  <draggable
                    v-model="element.children"
                    tag="div"
                    item-key="id"
                    group="submenus"
                    @end="guardarOrden(menusPrincipales)"
                    class="row q-gutter-xs"
                  >
                    <template #item="{ element: subMenu }">
                      <q-chip
                        dense
                        removable
                        :label="subMenu.label"
                        @remove="borrarItem(subMenu.id)"
                        color="primary"
                        text-color="white"
                        :icon="subMenu.icon"
                        class="shadow-1"
                      />
                    </template>
                  </draggable>
                </div>
                <q-badge v-else color="grey-5" label="Sin submenús" />
              </td>
              <td class="text-center">
                <div class="q-gutter-xs">
                  <q-btn
                    round
                    dense
                    flat
                    color="blue"
                    icon="add"
                    size="sm"
                    @click="abrirModalSubmenu(element)"
                    title="Agregar submenú"
                  />
                  <q-btn
                    round
                    dense
                    flat
                    color="orange"
                    icon="edit"
                    size="sm"
                    @click="editarItem(element)"
                    title="Editar menú"
                  />
                  <q-btn
                    round
                    dense
                    flat
                    color="red"
                    icon="delete"
                    size="sm"
                    @click="borrarItem(element.id)"
                    title="Eliminar menú"
                  />
                </div>
              </td>
            </tr>
          </template>
        </draggable>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useMenuStore } from 'stores/menuStore'
import iconsData from '/src/assets/icons.json'
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  setup() {
    const menuStore = useMenuStore()
    const mostrarModal = ref(false)
    const mostrarModalEditar = ref(false)
    const mostrarModalSubmenu = ref(false)
    const nuevoMenu = ref({ label: '', icon: '' })
    const nuevoSubmenu = ref({ label: '', icon: '', url: '', parent_id: null })
    const menuSeleccionado = ref({})
    const menuPadreSeleccionado = ref(null)

    const menusPrincipales = computed({
      get() {
        return menuStore.menuData
          .filter((menu) => menu.parent_id === null)
          .sort((a, b) => a.order - b.order)
          .map((menu) => ({
            ...menu,
            children: [...menu.children].sort((a, b) => a.order - b.order),
          }))
      },
      set(value) {
        // Actualiza el orden localmente antes de guardar
        const updatedMenus = value.map((menu, index) => ({
          ...menu,
          order: index + 1,
        }))

        // Actualiza el store
        menuStore.menuData = updatedMenus.concat(
          menuStore.menuData.filter((menu) => menu.parent_id !== null),
        )
      },
    })

    onMounted(() => {
      menuStore.fetchMenus()
    })

    const editarItem = (menu) => {
      menuSeleccionado.value = { ...menu }
      mostrarModalEditar.value = true
    }

    const abrirModalSubmenu = (menu) => {
      menuPadreSeleccionado.value = menu
      nuevoSubmenu.value = { label: '', icon: '', url: '', parent_id: menu.id }
      mostrarModalSubmenu.value = true
    }

    const agregarSubmenu = async () => {
      try {
        await menuStore.saveMenu(nuevoSubmenu.value)
        nuevoSubmenu.value = { label: '', icon: '', url: '', parent_id: null }
        mostrarModalSubmenu.value = false
      } catch (error) {
        console.error('Error al agregar submenú:', error)
      }
    }

    const guardarEdicion = async (id) => {
      try {
        await menuStore.updateMenu(id, menuSeleccionado.value)
        mostrarModalEditar.value = false
      } catch (error) {
        console.error('Error al editar menú:', error)
      }
    }

    const guardarOrden = async (element) => {
      console.log('Element:', element)
      try {
        await menuStore.updateOrder(element)

        mostrarModal.value = false
      } catch (error) {
        console.error('Error al agregar menú:', error)
      }
    }
    const borrarItem = async (id) => {
      try {
        await menuStore.deleteMenu(id)
        mostrarModalEditar.value = false
      } catch (error) {
        console.error('Error al editar menú:', error)
      }
      console.log('Borrar:', id)
    }

    const agregarMenu = async () => {
      try {
        const menuPrincipal = { ...nuevoMenu.value, parent_id: null }
        await menuStore.saveMenu(menuPrincipal)
        nuevoMenu.value = { label: '', icon: '' }
        mostrarModal.value = false
      } catch (error) {
        console.error('Error al agregar menú:', error)
      }
    }

    return {
      menuStore,
      mostrarModal,
      mostrarModalEditar,
      mostrarModalSubmenu,
      nuevoMenu,
      nuevoSubmenu,
      guardarOrden,
      menuSeleccionado,
      menuPadreSeleccionado,
      menusPrincipales,
      editarItem,
      abrirModalSubmenu,
      agregarSubmenu,
      borrarItem,
      agregarMenu,
      guardarEdicion,
      iconsData,
      model: ref(null),
      options: iconsData.icons,
    }
  },
}
</script>

<style scoped>
.menu-table {
  width: 100%;
}

.menu-row:hover {
  background-color: #f5f5f5;
}

.drag-handle {
  opacity: 0.3;
  transition: opacity 0.2s;
}

.drag-handle:hover {
  opacity: 1;
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}

.q-chip {
  font-size: 0.8em;
  padding: 4px 8px;
}
</style>
