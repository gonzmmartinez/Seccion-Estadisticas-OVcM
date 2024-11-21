// Datos
const archivo3 = "datos/json/denuncias_ovfg_tipos.json";

// PROCESAMIENTO
function procesarDatos3(data) {
    // Crear los arrays para las categorías y los valores de las barras
    const categories3 = [];
    const values3 = [];

    // Procesar los datos de cada entrada
    data.forEach(item => {
        categories3.push(item.Tipo);
        values3.push(item.Porcentaje);            
    });

    return { categories3, values3 };
}

// INICIALIZACIÓN
function iniciar3() {
  cargarDatos(archivo3) // Cargar los datos del JSON
        .then(data3 => {
            // Parsear los datos
            const parsedData3 = parsearDatos(data3);

            // Filtrar por el distrito seleccionado
            const anioSeleccionado3 = "TODOS";
            const datosFiltrados3 = filtrarPorAnio(parsedData3, anioSeleccionado3);

            // Procesar los datos filtrados
            const { categories3, values3 } = procesarDatos3(datosFiltrados3);

            // Crear y renderizar el gráfico
            window.chart3 = crearGrafico3(categories3, values3);
            window.chart3.render();
        })
        .catch(error1 => {
            document.getElementById("grafico3").textContent = `Error: ${error1.message}`;
        });
}

// FILTRAR DATOS
function filtrarPorAnio(data, year) {
  return data.filter(item => item.Año === year);
}

function changeAnio() {
  cargarDatos(archivo3)
      .then(data3 => {
          const parsedData3 = parsearDatos(data3);

          // Filtrar por el distrito seleccionado
          const anioSeleccionado3 = document.getElementById("Anio3").value;
          const datosFiltrados3 = filtrarPorAnio(parsedData3, anioSeleccionado3);

          // Procesar datos
          const { categories3, values3 } = procesarDatos3(datosFiltrados3);

          // Actualizar las series y categorías con animación
          window.chart3.updateOptions({ series: values3, labels: categories3});
      })
      .catch(error => {
          document.getElementById("grafico3").textContent = `Error: ${error.message}`;
      });
}

// 5. Función para configurar y renderizar el gráfico
function crearGrafico3(categories, values) {
  return new ApexCharts(document.querySelector("#grafico3"), {
      chart: {
          type: 'donut',
          height: 350
      },
      series: values, // Los valores para el gráfico (arreglo de números)
      labels: categories, // Las etiquetas para cada segmento
      title: {},
      colors: ["#e3474b", "#e3753d", "#e3a22e", "#a9a226", "#2b768a", "#1468b1", "#45488d"],
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