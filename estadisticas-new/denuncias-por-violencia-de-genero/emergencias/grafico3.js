// Datos
const archivo3 = "../../datos/json/denuncias_911_violencia_accion.json";

// PROCESAMIENTO
function procesarDatos3(data) {
    // Crear los arrays para las categorías y los valores
    const categories3 = [];
    const values3a = [0, 0, 0]; // Para "Violencia de género"
    const values3b = [0, 0, 0]; // Para "Violencia familiar en curso"
    const values3c = [0, 0, 0]; // Para "Violencia familiar histórica"

    // Obtener categorías únicas de Accion
    const accionesUnicas = Array.from(new Set(data.map(item => item.Accion)));
    categories3.push(...accionesUnicas);

    // Acciones disponibles
    const acciones = ["Llamadas", "Intervenciones", "Intervenciones SAMEC"];

    // Procesar los datos
    data.forEach(item => {
        const accionIndex = acciones.indexOf(item.Accion); // Índice de la acción
        if (accionIndex === -1) return; // Ignorar acciones desconocidas

        if (item.Tipo === "Violencia de género") {
            values3a[accionIndex] += item.Cantidad || 0;
        } else if (item.Tipo === "Violencia familiar en curso") {
            values3b[accionIndex] += item.Cantidad || 0;
        } else if (item.Tipo === "Violencia familiar histórica") {
            values3c[accionIndex] += item.Cantidad || 0;
        }
    });

    return { categories3, values3a, values3b, values3c };
};

// FILTRAR DATOS
function filtrarPorAnio(data, year) {
    return data.filter(item => item.Año === year);
};

// INICIALIZACIÓN
function iniciar3() {
  cargarDatos(archivo3) // Cargar los datos del JSON
        .then(data3 => {
            // Parsear los datos
            const parsedData3 = parsearDatos(data3);

            // Filtrar por el distrito seleccionado
            const anioSeleccionado3 = "2024";
            const datosFiltrados3 = filtrarPorAnio(parsedData3, anioSeleccionado3);

            // Procesar los datos filtrados
            const { categories3, values3a, values3b, values3c } = procesarDatos3(datosFiltrados3);

            // Crear y renderizar el gráfico
            window.chart3 = crearGrafico3(categories3, values3a, values3b, values3c);
            window.chart3.render();
        })
        .catch(error1 => {
            document.getElementById("grafico3").textContent = `Error: ${error1.message}`;
        });
};

function actualizarGrafico3() {
  cargarDatos(archivo3)
      .then(data3 => {
        // Parsear los datos
        const parsedData3 = parsearDatos(data3);

        // Filtrar por el distrito seleccionado
        const anioSeleccionado3 = document.getElementById("Anio3").value;
        const datosFiltrados3 = filtrarPorAnio(parsedData3, anioSeleccionado3);

        // Procesar los datos filtrados
        const { categories3, values3a, values3b, values3c } = procesarDatos3(datosFiltrados3);

        // Actualizar las series y categorías con animación
        window.chart3.updateOptions({
            series: [{data: values3a}, {data: values3b}, {data: values3c}, ],
            xaxis: { categories: categories3 }
        });
      })
      .catch(error => {
          document.getElementById("grafico3").textContent = `Error: ${error.message}`;
      });
};

// 5. Función para configurar y renderizar el gráfico
function crearGrafico3(categories, valuesa, valuesb, valuesc) {
    return new ApexCharts(document.querySelector("#grafico3"), {
        chart: {
            type: 'bar',
            height: '350px',
            toolbar: {
              show: true
            }
        },
        series: [
            {name: "Violencia de género", data: valuesa},
            {name: "Violencia familiar en curso", data: valuesb},
            {name: "Violencia familiar histórica", data: valuesc}
        ],
        title: {},
        colors: ["#e3474b", "#45488d", "#1468b1", "#e3753d", "#e3a22e", "#1468b1", "#45488d"],
        yaxis: {
            title: {
                text: "Cantidad"
            }
        },
        xaxis: {
            title: {
                text: "Requerimiento"
            },
            categories: categories,
        },
        tooltip: {
            enabled: true,
            followCursor: true,
        },
        legend: {
            position: "top",
            horizontalAlign: 'left',
        }
    });
};