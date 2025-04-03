import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { date } from 'quasar'

export const useAsistenciaStore = defineStore('asistencia', {
  state: () => ({
    alumnos: [],
    semana: {
      inicio: null,
      fin: null,
    },
    asistencias: {},
    loading: false,
  }),

  getters: {
    nombreSemana: (state) => {
      if (!state.semana.inicio) return ''
      const inicio = date.formatDate(state.semana.inicio, 'DD/MM/YYYY')
      const fin = date.formatDate(state.semana.fin, 'DD/MM/YYYY')
      return `Semana del ${inicio} al ${fin}`
    },
    diasSemana: (state) => {
      if (!state.semana.inicio) return []
      const dias = []
      let current = new Date(state.semana.inicio)
      const fin = new Date(state.semana.fin)

      while (current <= fin) {
        dias.push(new Date(current))
        current = date.addToDate(current, { day: 1 })
      }
      return dias
    },
  },

  actions: {
    async cargarAlumnos() {
      try {
        this.loading = true
        const response = await api.get('http://127.0.0.1:8000/api/asistencias/alumnos')
        this.alumnos = response.data
      } catch (error) {
        console.error('Error cargando alumnos:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async cargarAsistenciasSemana(fecha) {
      try {
        this.loading = true
        const fechaInicio = date.startOfDate(fecha, 'week')
        this.semana.inicio = fechaInicio
        this.semana.fin = date.addToDate(fechaInicio, { days: 6 })

        const params = {
          fecha_inicio_semana: date.formatDate(fechaInicio, 'YYYY-MM-DD'),
        }
        console.log('xxx', params)
        const response = await api.get('http://127.0.0.1:8000/api/asistencias/semanas', { params })
        // console.log('Asistencias de la semana:', response.data)
        // Inicializar asistencias para todos los alumnos
        return response.data
      } catch (error) {
        console.error('Error cargando asistencias:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async guardarAsistencias(asistenciasA) {
      try {
        this.loading = true

        // Preparar datos en el formato que espera el backend
        const payload = {
          fecha_inicio_semana: date.formatDate(this.semana.inicio, 'YYYY-MM-DD'),
          asistencias: asistenciasA,
        }

        const response = await api.post('http://127.0.0.1:8000/api/asistencias/registrar', payload)

        return response.data
      } catch (error) {
        console.error(error)

        // Mostrar detalles del error 422 si existen
        if (error.response?.status === 422) {
          console.error('Errores de validación:', error.response.data.errors)
        }

        throw error
      } finally {
        this.loading = false
      }
    },

    formatAsistenciasParaBackend() {
      const asistenciasFormateadas = {}

      Object.keys(this.asistencias).forEach((alumnoId) => {
        asistenciasFormateadas[alumnoId] = {}

        Object.keys(this.asistencias[alumnoId]).forEach((fecha) => {
          // Convertir a formato que espera el backend
          asistenciasFormateadas[alumnoId][fecha] = {
            estado: this.asistencias[alumnoId][fecha],
            // Puedes agregar más campos si el backend los requiere
          }
        })
      })

      return asistenciasFormateadas
    },
  },
})
