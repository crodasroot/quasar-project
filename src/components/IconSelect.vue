<template>
  <q-select
    v-model="selectedIcon"
    label="Ícono"
    outlined
    :options="filteredOptions"
    option-label="label"
    option-value="value"
    emit-value
    map-options
    use-input
    input-debounce="300"
    @filter="filterIcons"
    clearable
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="scope.opt.icon || scope.opt.value" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:selected-item="scope">
      <q-item v-if="scope.opt">
        <q-item-section avatar>
          <q-icon :name="scope.opt.icon || scope.opt.value" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
      <span v-else>{{ scope.opt }}</span>
    </template>
  </q-select>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'IconSelect',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    iconOptions: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every((item) => item.label && item.value)
      },
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedIcon = ref(props.modelValue)
    const filteredOptions = ref([...props.iconOptions])

    const filterIcons = (val, update) => {
      update(() => {
        if (val === '') {
          filteredOptions.value = [...props.iconOptions]
        } else {
          filteredOptions.value = props.iconOptions.filter((item) => {
            return item.label.toLowerCase().includes(val.toLowerCase())
          })
        }
      })
    }

    watch(selectedIcon, (newVal) => {
      emit('update:modelValue', newVal)
    })

    watch(
      () => props.modelValue,
      (newVal) => {
        selectedIcon.value = newVal
      },
    )

    return {
      selectedIcon,
      filteredOptions,
      filterIcons,
    }
  },
}
</script>
