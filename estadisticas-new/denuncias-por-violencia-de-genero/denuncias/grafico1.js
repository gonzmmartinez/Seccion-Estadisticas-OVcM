// Datos
const archivo1 = "datos/json/denuncias_ingresadas_og.json";

// 1. Función para hacer el fetch y devolver los datos
function cargarDatos() {
    return fetch(archivo1) // Ruta al archivo JSON
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar JSON: ${response.status}`);
            }
            return response.json();
        });
}

// 2. Función para parsear los datos, verificando si es necesario realizar un segundo parseo
function parsearDatos(data1) {
    let parsedData1;
    if (Array.isArray(data1) && typeof data1[0] === "string") {
        // Si es un array con un string JSON, realiza el segundo parseo
        parsedData1 = JSON.parse(data1[0]);
    } else {
        // Si el JSON ya está bien estructurado, no es necesario el parseo adicional
        parsedData1 = data1;
    }
    return parsedData1;
}

// 3. Función para filtrar los datos por distrito
function filtrarPorDistrito(data, distrito) {
  if (distrito == "TODOS") {
    return data
  } else {
    return data.filter(item => item.Distrito === distrito);
  }
}

// 4. Función para procesar los datos y agruparlos por Año-Trimestre
function procesarDatos1(data1) {
    const groupedData1 = Object.values(
        data1.reduce((acc, curr) => {
            const key = `${curr.Año}-${curr.Trimestre}`; // Agrupar por Año y Trimestre
            if (!acc[key]) {
                acc[key] = { 
                    year_trimestre: `${curr.Trimestre}-${curr.Año.toString().slice(-2)}`, 
                    Cantidad: 0 
                };
            }
            acc[key].Cantidad += curr.Frecuencia;
            return acc;
        }, {})
    );

    // Crear los arrays para las categorías y los valores de las barras
    const categories1 = [];
    const values1 = [];

    // Procesar los datos de cada entrada
    groupedData1.forEach(item => {
        categories1.push(item.year_trimestre);  // Añadir year_trimestre al eje X
        values1.push(item.Cantidad);            // Añadir Cantidad al eje Y
    });

    // Contar ocurrencias de cada Año en groupedData1
      const yearCounts = groupedData1.reduce((acc, item) => {
        const year = `20${item.year_trimestre.split('-')[1]}`; // Extraer el año completo
        if (!acc[year]) {
            acc[year] = 0;
        }
        acc[year] += 1; // Contar cuántas veces aparece este año
        return acc;
    }, {});

    // Crear el array de grupos para años y sus columnas (trimestres)
      const groups1 = Object.entries(yearCounts).map(([year, count]) => ({
        title: year,
        cols: count
    }));

    return { categories1, values1, groups1 };
}

// 5. Función para configurar y renderizar el gráfico
function crearGrafico1(categories, values, groups) {
    return new ApexCharts(document.querySelector("#grafico1"), {
        chart: {
            type: 'bar', // Tipo de gráfico: barras
            height: 350
        },
        stroke: {
          width: [0, 4],
          curve: 'straight'
        },
        series: [{
            name: 'Cantidad',
            type: 'column',
            data: values
        },{
          name: 'Cantidad',
          type: 'line',
          data: values
        }],
        colors: ["#C93131", "#6e3169"],
        title: {},
        xaxis: {
          title: {
            text: 'Trimestre-Año'
          },
          categories: categories, // Valores para el eje X
          labels: {
            formatter: function(val) {
              return val[0]
            }
          },
          group: {
            style: {
              fontSize: '12px',
              fontWeight: 700
            },
            groups: groups
          }
        },
        yaxis: {
            title: {
                text: 'Cantidad'
            }
        },
        dataLabels: {
          enabled: false,
          style: {
            fontSize: '8px'
          }
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: [0],
          followCursor: true,
          x: {
            formatter: function(val) {
              const [trimestre, year] = val.split("-");
              return trimestre + "° Trimestre 20" + year;
            }
          }
        },
        legend: {
          show: false
        }
    });
}

// 6. Función principal que orquesta el proceso
function iniciar1() {
  cargarDatos() // Cargar los datos del JSON
        .then(data1 => {
            // Parsear los datos
            const parsedData = parsearDatos(data1);

            // Procesar los datos filtrados
            const { categories1, values1, groups1 } = procesarDatos1(parsedData);

            // Crear y renderizar el gráfico
            window.chart1 = crearGrafico1(categories1, values1, groups1);
            window.chart1.render();
        })
        .catch(error1 => {
            document.getElementById("grafico1").textContent = `Error: ${error1.message}`;
        });
}

function changeDistritos() {
  cargarDatos()
      .then(data1 => {
          const parsedData = parsearDatos(data1);

          // Filtrar por el distrito seleccionado
          const distritoSeleccionado = document.getElementById("Distrito").value;
          const datosFiltrados = filtrarPorDistrito(parsedData, distritoSeleccionado);

          // Procesar datos
          const { categories1, values1, groups1 } = procesarDatos1(datosFiltrados);

          // Actualizar las series y categorías con animación
          window.chart1.updateSeries([{ data: values1 }, { data: values1 }], true); // Animación en la actualización
          window.chart1.updateOptions({ xaxis: { categories: categories1, group: {groups: groups1} } }, true); // Animación en opciones
      })
      .catch(error => {
          document.getElementById("grafico1").textContent = `Error: ${error.message}`;
      });
}

// 8. Llamar la función principal al cargar la página
window.addEventListener("load", iniciar1);