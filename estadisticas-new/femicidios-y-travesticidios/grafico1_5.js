// Datos
const archivo1_5 = "datos/json/femicidios_medio_utilizado.json";

// PROCESAMIENTO
function procesarDatos1_5(data) {
    // Crear los arrays para las categorías y los valores de las barras
    const categories1_5 = [];
    const values1_5 = [];

    // Procesar los datos de cada entrada
    data.forEach(item => {
        categories1_5.push(item.Medio_utilizado);
        values1_5.push(item.Cantidad);            
    });

    return { categories1_5, values1_5 };
}

// INICIALIZACIÓN
function iniciar1_5() {
  cargarDatos(archivo1_5) // Cargar los datos del JSON
        .then(data1_5 => {
            // Parsear los datos
            const parsedData1_5 = parsearDatos(data1_5);

            // Filtrar por el distrito seleccionado
            const anioSeleccionado1_5 = "2024";
            const datosFiltrados1_5 = filtrarPorAnio(parsedData1_5, anioSeleccionado1_5);

            // Procesar los datos filtrados
            const { categories1_5, values1_5 } = procesarDatos1_5(datosFiltrados1_5);

            // Crear y renderizar el gráfico
            window.chart1_5 = crearGrafico1_5(categories1_5, values1_5);
            window.chart1_5.render();
        })
        .catch(error1 => {
            document.getElementById("grafico1_5").textContent = `Error: ${error1.message}`;
        });
}

// FILTRAR DATOS
function filtrarPorAnio(data, year) {
  return data.filter(item => item.Año === year);
}

function actualizarGrafico1_5() {
  cargarDatos(archivo1_5)
      .then(data1_5 => {
          const parsedData1_5 = parsearDatos(data1_5);

          // Filtrar por el distrito seleccionado
          const anioSeleccionado1_5 = document.getElementById("Anio1").value;
          const datosFiltrados1_5 = filtrarPorAnio(parsedData1_5, anioSeleccionado1_5);

          // Procesar datos
          const { categories1_5, values1_5 } = procesarDatos1_5(datosFiltrados1_5);

          // Actualizar las series y categorías con animación
          window.chart1_5.updateOptions({ series: values1_5, labels: categories1_5});
      })
      .catch(error => {
          document.getElementById("grafico1_5").textContent = `Error: ${error.message}`;
      });
}

// 5. Función para configurar y renderizar el gráfico
function crearGrafico1_5(categories, values) {
  return new ApexCharts(document.querySelector("#grafico1_5"), {
      chart: {
          type: 'donut',
          height: 250,
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
      },
      legend: {
        show: true,
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
        dropShadow: false,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: 'white'
        },
      }
  });
}