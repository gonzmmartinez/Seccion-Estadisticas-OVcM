// Datos
const archivo2 = "datos/json/denuncias_ingresadas_og.json";

// 4. Función para procesar los datos y agruparlos por Año-Trimestre
function procesarDatos2(data) {
    const groupedData2 = Object.values(
        data.reduce((acc, curr) => {
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
    const categories2 = [];
    const values2 = [];

    // Procesar los datos de cada entrada
    groupedData2.forEach(item => {
        categories2.push(item.year_trimestre);  // Añadir year_trimestre al eje X
        values2.push(item.Cantidad);            // Añadir Cantidad al eje Y
    });

    // Contar ocurrencias de cada Año en groupedData1
      const yearCounts = groupedData2.reduce((acc, item) => {
        const year = `20${item.year_trimestre.split('-')[1]}`; // Extraer el año completo
        if (!acc[year]) {
            acc[year] = 0;
        }
        acc[year] += 1; // Contar cuántas veces aparece este año
        return acc;
    }, {});

    // Crear el array de grupos para años y sus columnas (trimestres)
      const groups2 = Object.entries(yearCounts).map(([year, count]) => ({
        title: year,
        cols: count
    }));

    return { categories2, values2, groups2 };
}

// 5. Función para configurar y renderizar el gráfico
function crearGrafico2(categories, values, groups) {
    return new ApexCharts(document.querySelector("#grafico2"), {
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
        colors: ["#6e3169", "#6e3169"],
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
function iniciar2() {
  
  cargarDatos() // Cargar los datos del JSON
        .then(data1 => {
            // Parsear los datos
            const parsedData = parsearDatos(data1);

            // Procesar los datos filtrados
            const { categories2, values2, groups2 } = procesarDatos2(parsedData);

            // Crear y renderizar el gráfico
            window.chart2 = crearGrafico2(categories2, values2, groups2);
            window.chart2.render();
        })
        .catch(error1 => {
            document.getElementById("grafico2").textContent = `Error: ${error1.message}`;
        });
}

function changeDistritos() {
  cargarDatos()
      .then(data2 => {
          const parsedData = parsearDatos(data2);

          // Filtrar por el distrito seleccionado
          const distritoSeleccionado = document.getElementById("Distrito").value;
          const datosFiltrados = filtrarPorDistrito(parsedData, distritoSeleccionado);

          // Procesar datos
          const { categories2, values2, groups2 } = procesarDatos2(datosFiltrados);

          // Actualizar las series y categorías con animación
          window.chart1.updateSeries([{ data: values2 }, { data: values2 }], true); // Animación en la actualización
          window.chart1.updateOptions({ xaxis: { categories: categories2, group: {groups: groups2} } }, true); // Animación en opciones
      })
      .catch(error => {
          document.getElementById("grafico2").textContent = `Error: ${error.message}`;
      });
}

