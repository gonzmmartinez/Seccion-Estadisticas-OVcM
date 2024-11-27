// Datos
const archivo5 = "datos/json/denuncias_ovfg_genero_denunciante.json";

// PROCESAMIENTO
function procesarDatos5(data) {
    // Crear los arrays para las categorías y los valores de las barras
    const categories5 = [];
    const values5 = [];

    // Procesar los datos de cada entrada
    data.forEach(item => {
        categories5.push(item.Género);
        values5.push(item.Porcentaje);            
    });

    return { categories5, values5 };
}

// INICIALIZACIÓN
function iniciar5() {
  cargarDatos(archivo5) // Cargar los datos del JSON
        .then(data5 => {
            // Parsear los datos
            const parsedData5 = parsearDatos(data5);

            // Filtrar por el distrito seleccionado
            const anioSeleccionado5 = "TODOS";
            const datosFiltrados5 = filtrarPorAnio(parsedData5, anioSeleccionado5);

            // Procesar los datos filtrados
            const { categories5, values5 } = procesarDatos5(datosFiltrados5);

            // Crear y renderizar el gráfico
            window.chart5 = crearGrafico5(categories5, values5);
            window.chart5.render();
        })
        .catch(error1 => {
            document.getElementById("grafico5").textContent = `Error: ${error1.message}`;
        });
}

// FILTRAR DATOS
function filtrarPorAnio(data, year) {
  return data.filter(item => item.Año === year);
}

function actualizarGrafico5() {
  cargarDatos(archivo5)
      .then(data5 => {
          const parsedData5 = parsearDatos(data5);

          // Filtrar por el distrito seleccionado
          const anioSeleccionado5 = document.getElementById("Anio5").value;
          const datosFiltrados5 = filtrarPorAnio(parsedData5, anioSeleccionado5);

          // Procesar datos
          const { categories5, values5 } = procesarDatos5(datosFiltrados5);

          // Actualizar las series y categorías con animación
          window.chart5.updateOptions({ series: values5, labels: categories5});
      })
      .catch(error => {
          document.getElementById("grafico5").textContent = `Error: ${error.message}`;
      });
}

// 5. Función para configurar y renderizar el gráfico
function crearGrafico5(categories, values) {
  return new ApexCharts(document.querySelector("#grafico5"), {
      chart: {
          type: 'donut',
          height: 350,
          toolbar: {
            show: true
          }
      },
      series: values, // Los valores para el gráfico (arreglo de números)
      labels: categories, // Las etiquetas para cada segmento
      title: {},
      colors: ["#e3753d", "#45488d", "#e3a22e", "#a9a226", "#2b768a", "#1468b1", "#e3474b"],
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '8px'
        }
      },
      tooltip: {
        enabled: true,
        followCursor: true,
        y: {
          formatter: function(val) {
            return Math.round(val * 10) / 10 + '%';
          }
      },
      },
      legend: {
        show: true,
        formatter: function(seriesName, opts) {
          return [seriesName + " - " + Math.round(opts.w.globals.series[opts.seriesIndex] * 10) / 10 + '%']
      }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '30%'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          if (val >= 5) {
            return Math.round(val * 10) / 10 + "%"
          } else {
            return ''
          }
        },
        dropShadow: false,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: 'white'
        },
      }
  });
}