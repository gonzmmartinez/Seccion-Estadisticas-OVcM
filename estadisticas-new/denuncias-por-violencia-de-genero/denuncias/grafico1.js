// Espera a que el documento esté completamente cargado
window.addEventListener("load", () => {
  // Cargar el JSON automáticamente al cargar la página
  fetch("datos/json/denuncias_ingresadas.json") // Ruta al archivo JSON
      .then(response1 => {
          if (!response1.ok) {
              throw new Error(`Error al cargar JSON: ${response1.status}`);
          }
          return response1.json();
      })
      .then(data1 => {
          // Verifica si el JSON cargado es un array de string o ya es un objeto válido
          let parsedData1;
          if (Array.isArray(data1) && typeof data1[0] === "string") {
              // Si es un array con un string JSON, realiza el segundo parseo
              parsedData1 = JSON.parse(data1[0]);
          } else {
              // Si el JSON ya está bien estructurado, no es necesario el parseo adicional
              parsedData1 = data1;
          }

          // Crear los arrays para las categorías y los valores de las barras
          const categories1 = [];
          const values1 = [];

          // Procesar los datos de cada entrada
          parsedData1.forEach(item => {
              categories1.push(item.year_trimestre);  // Añadir year_trimestre al eje X
              values1.push(item.Cantidad);            // Añadir Cantidad al eje Y
          });

          // Configuración del gráfico
          const options1 = {
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
                  data: values1
              },{
                name: 'Cantidad',
                type: 'line',
                data: values1
              }],
              colors: ["#C93131", "#6e3169"],
              title: {
              },
              xaxis: {
                title: {
                  text: 'Trimestre-Año'
                },
                categories: categories1, // Valores para el eje X
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
                  groups: [
                    {title: '2020', cols: 4},
                    {title: '2021', cols: 4},
                    {title: '2022', cols: 4},
                    {title: '2023', cols: 4},
                    {title: '2024', cols: 3}
                  ]
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
                    return val[0] + "° Trimestre"
                  }
                }
              },
              legend: {
                show: false
              }
          };

          // Crear el gráfico
          const chart1 = new ApexCharts(document.querySelector("#grafico1"), options1);
          chart1.render();
      })
      .catch(error1 => {
          document.getElementById("grafico1").textContent = `Error: ${error1.message}`;
      });
});
