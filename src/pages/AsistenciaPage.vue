<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Asistencia de Alumnos</div>
    <div class="text-subtitle1 q-mb-md">Registro de asistencia de lunes a domingo.</div>

    <!-- Selector de fecha y semana -->
    <div class="row q-mb-md items-center">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-date
          v-model="fechaSeleccionada"
          label="Selecciona una fecha de la semana"
          mask="YYYY-MM-DD"
          @update:model-value="cambiarSemana"
          class="q-mb-sm"
        />
      </div>
      <div class="col-md-8 col-sm-6 col-xs-12 q-pl-md">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ nombreSemana }}</div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <div class="text-caption">Fecha inicio:</div>
                <div class="text-weight-bold">{{ fechaInicioFormateada }}</div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-caption">Fecha fin:</div>
                <div class="text-weight-bold">{{ fechaFinFormateada }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="row justify-between items-center q-ms">
      <div class="col-auto">
        <q-btn
          color="grey"
          label="Limpiar Seleciones"
          @click="limpiarAsistencias"
          icon="refresh"
          class="q-mr-sm"
        />
      </div>
    </div>
    <br />

    <!-- Tabla de asistencia con paginación -->
    <div class="table-container q-mb-md">
      <q-table
        flat
        bordered
        :rows="alumnosPaginados"
        :columns="columnasTabla"
        row-key="id"
        hide-pagination
        virtual-scroll
        :rows-per-page-options="[0]"
        :virtual-scroll-item-size="48"
      >
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <template v-if="props.col.name === 'alumno'">
              <div class="text-weight-bold">{{ props.row.nombre }} {{ props.row.apellido }}</div>
              <div class="text-caption text-grey-7">ID: {{ props.row.id }}</div>
            </template>
            <template v-else>
              <div class="row justify-center q-gutter-sm">
                <q-radio
                  v-model="asistencias[props.row.id][props.col.name]"
                  val="presente"
                  label="P"
                  color="positive"
                  dense
                  ><q-tooltip>Marcar como Presente</q-tooltip>
                </q-radio>
                <q-radio
                  v-model="asistencias[props.row.id][props.col.name]"
                  val="ausente"
                  label="A"
                  color="negative"
                  dense
                  ><q-tooltip>Marcar como Ausente</q-tooltip></q-radio
                >
                <q-radio
                  v-model="asistencias[props.row.id][props.col.name]"
                  val="justificado"
                  label="J"
                  color="warning"
                  dense
                  ><q-tooltip>Marcar como Justificado</q-tooltip></q-radio
                >
              </div>
            </template>
          </q-td>
        </template>
      </q-table>

      <!-- Paginación -->

      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="paginaActual"
          :max="totalPaginas"
          :max-pages="6"
          direction-links
          boundary-links
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-prev="fast_rewind"
          icon-next="fast_forward"
        />
        <q-select
          v-model="filasPorPagina"
          :options="opcionesFilasPorPagina"
          label="Filas por página"
          dense
          outlined
          class="q-ml-md"
          style="min-width: 120px"
        />
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="row justify-between items-center q-mt-lg">
      <div class="col-auto">
        <q-btn
          color="grey"
          label="Recargar Vista"
          @click="limpiarAsistencias"
          icon="refresh"
          class="q-mr-sm"
        />
      </div>
      <div class="col-auto">
        <q-btn
          color="primary"
          label="Guardar Asistencia"
          @click="guardarAsistencias"
          :loading="loading"
          icon="save"
        />
      </div>
    </div>

    <!-- Diálogo de confirmación -->
    <q-dialog v-model="confirmarGuardado" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="save" color="primary" text-color="white" />
          <span class="q-ml-sm">¿Estás seguro que deseas guardar los cambios de asistencia?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Confirmar" color="primary" @click="confirmarAccion" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useAsistenciaStore } from 'src/stores/asistenciaStore'
import { date, useQuasar } from 'quasar'

export default {
  setup() {
    const store = useAsistenciaStore()
    const $q = useQuasar()
    const fechaSeleccionada = ref(date.formatDate(new Date(), 'YYYY-MM-DD'))
    const confirmarGuardado = ref(false)
    const asistencias = ref({})
    const loading = ref(false)

    // Variables para paginación
    const paginaActual = ref(1)
    const filasPorPagina = ref(10)
    const opcionesFilasPorPagina = [5, 10, 15, 20, 25, 50]

    // Columnas para la tabla
    const columnasTabla = computed(() => {
      const columnas = [
        {
          name: 'alumno',
          required: true,
          label: 'Alumno',
          align: 'left',
          field: 'alumno',
          sortable: true,
        },
      ]

      diasSemana.value.forEach((dia) => {
        columnas.push({
          name: dia.fecha,
          label: `${dia.nombre}\n${dia.fechaCorta}`,
          align: 'center',
          field: dia.fecha,
        })
      })

      return columnas
    })

    const alumnosOrdenados = computed(() => {
      if (!store.alumnos) return []

      return [...store.alumnos].sort((a, b) => {
        // Manejo seguro de apellidos y nombres
        const apellidoA = a.apellido || ''
        const apellidoB = b.apellido || ''
        const nombreA = a.nombre || ''
        const nombreB = b.nombre || ''

        // Primero comparamos por apellido
        const apellidoComp = apellidoA.localeCompare(apellidoB)
        if (apellidoComp !== 0) return apellidoComp

        // Si los apellidos son iguales, comparamos por nombre
        return nombreA.localeCompare(nombreB)
      })
    })

    // Alumnos paginados usando la lista ordenada
    const alumnosPaginados = computed(() => {
      const inicio = (paginaActual.value - 1) * filasPorPagina.value
      const fin = inicio + filasPorPagina.value
      return alumnosOrdenados.value.slice(inicio, fin)
    })

    // Total de páginas usando alumnosOrdenados
    const totalPaginas = computed(() => {
      return Math.ceil(alumnosOrdenados.value.length / filasPorPagina.value)
    })

    // Obtener días de la semana formateados
    const diasSemana = computed(() => {
      if (!store.semana.inicio) return []

      const dias = []
      let current = new Date(store.semana.inicio)
      const diaSemana = current.getDay() // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

      // Si no es lunes, retroceder hasta el lunes más cercano
      if (diaSemana !== 1) {
        current.setDate(current.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1))
      }

      for (let i = 0; i < 7; i++) {
        dias.push({
          fecha: current.toLocaleDateString('es-CA'), // Formato YYYY-MM-DD
          nombre:
            current.toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() +
            current.toLocaleDateString('es-ES', { weekday: 'long' }).slice(1),
          fechaCorta: current.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
        })

        current.setDate(current.getDate() + 1) // Avanzar un día
      }

      return dias
    })

    // Cargar datos iniciales
    const cargarAsistencias = async () => {
      loading.value = true
      try {
        await store.cargarAlumnos()
        var response = await store.cargarAsistenciasSemana(fechaSeleccionada.value)
        console.log('Asistencias de la semana:', response)

        // Inicializar asistencias
        asistencias.value = {}
        store.alumnos.forEach((alumno) => {
          asistencias.value[alumno.id] = {}
          diasSemana.value.forEach((dia) => {
            //asistencias.value[alumno.id][dia.fecha] = 'pendiente'
            asistencias.value[alumno.id][dia.fecha] = response[alumno.id][dia.fecha] || 'pendiente'
          })
        })
      } finally {
        loading.value = false
      }
    }

    // Confirmar acción de guardado
    const confirmarAccion = async () => {
      confirmarGuardado.value = false
      try {
        loading.value = true
        // Actualizar el store con las asistencias modificadas
        const asistenciasA = JSON.parse(JSON.stringify(asistencias.value))
        await store.guardarAsistencias(asistenciasA)

        $q.notify({
          type: 'positive',
          message: 'Asistencias guardadas correctamente',
          position: 'bottom',
        })
      } catch (error) {
        console.error(error)
        $q.notify({
          type: 'negative',
          message: 'Error al guardar asistencias',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    // Cambiar semana
    const cambiarSemana = () => {
      paginaActual.value = 1 // Resetear a la primera página al cambiar de semana
      cargarAsistencias()
    }

    // Limpiar asistencias
    const limpiarAsistencias = () => {
      window.location.reload()
    }

    // Guardar asistencias
    const guardarAsistencias = () => {
      try {
        const hoy = date.formatDate(new Date(), 'YYYY-MM-DD')
        let tieneFechasFuturas = false

        for (const [idAlumno, asistenciasAlumno] of Object.entries(asistencias.value)) {
          // Recorremos las fechas de cada alumno
          for (const [fecha, estado] of Object.entries(asistenciasAlumno)) {
            // Validación 1: Fecha no puede ser futura

            // Validación 2: Estado no puede ser "pendiente"
            const fechaObj = new Date(fecha)
            const hoyObj = new Date(hoy)

            if (estado != 'pendiente') {
              if (fechaObj > hoyObj) {
                console.log(asistenciasAlumno)
                console.log(`Alumno ${idAlumno}: Fecha futura (${fecha}) Fecha hoy: ${hoy}`)
                console.log(`Alumno ${idAlumno}: Estado  (${estado})`)
                tieneFechasFuturas = true
                break
              }
            }
          }
        }

        if (tieneFechasFuturas) {
          confirmarGuardado.value = false
          $q.notify({
            type: 'negative',
            message:
              'No se puede guardar asistencias con fechas futuras. Por favor, verifica las fechas antes de guardar.',
            position: 'top',
          })
        } else {
          confirmarGuardado.value = true
        }
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      cargarAsistencias()
    })

    return {
      fechaSeleccionada,
      alumnos: computed(() => store.alumnos),
      nombreSemana: computed(() => store.nombreSemana),
      diasSemana,
      fechaInicioFormateada: computed(() => {
        // Obtener la fecha actual
        const hoy = new Date()
        const diaSemana = hoy.getDay() // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

        // Calcular el lunes más cercano
        const inicioSemana = new Date(hoy)
        inicioSemana.setDate(hoy.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1))

        // Formatear la fecha al estilo deseado
        return inicioSemana.toLocaleDateString('es-ES', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      }),

      fechaFinFormateada: computed(() => {
        // Obtener la fecha actual
        const hoy = new Date()
        const diaSemana = hoy.getDay() // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

        // Calcular el domingo más cercano
        const finSemana = new Date(hoy)
        finSemana.setDate(hoy.getDate() + (diaSemana === 0 ? 0 : 7 - diaSemana))

        // Formatear la fecha al estilo deseado
        return finSemana.toLocaleDateString('es-ES', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      }),

      /* fechaFinFormateada: computed(() =>
        store.semana.fin
          ? new Date(store.semana.fin).toLocaleDateString('es-ES', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
          : '',
      ),*/
      loading,
      asistencias,
      confirmarGuardado,
      cambiarSemana,
      limpiarAsistencias,
      guardarAsistencias,
      confirmarAccion,
      // Paginación
      columnasTabla,
      alumnosPaginados,
      paginaActual,
      filasPorPagina,
      opcionesFilasPorPagina,
      totalPaginas,
    }
  },
}
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}

.q-table {
  width: 100%;
}

.q-table th {
  white-space: normal;
  text-align: center;
  vertical-align: middle;
}

.q-table td {
  padding: 8px;
}
</style>
