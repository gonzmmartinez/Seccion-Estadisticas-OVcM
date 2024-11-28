// FUNCION PARA INICIALIZAR TODOS LOS OTROS GRAFICOS
function iniciar1() {
    iniciar1_3();
    iniciar1_4();
    iniciar1_5();
    iniciar1_6();
    iniciar1_7();
    iniciar1_8();
}

// FUNCION PARA ACTUALIZAR TODOS LOS GRAFICOS
function actualizarGraficos() {
    actualizarGrafico1_3();
    actualizarGrafico1_4();
    actualizarGrafico1_5();
    actualizarGrafico1_6();
    actualizarGrafico1_7();
    actualizarGrafico1_8();
}

// Función para recortar texto
function cortarTexto(texto, limite) {
    const palabras = texto.toString().split(" ");
    const resultado = []; // Aquí almacenaremos las líneas
    let lineaActual = "";
  
    palabras.forEach(palabra => {
      if ((lineaActual + " " + palabra).trim().length > limite) {
        resultado.push(lineaActual.trim()); // Agrega la línea actual al array
        lineaActual = palabra; // Inicia una nueva línea
      } else {
        lineaActual += " " + palabra; // Continúa con la línea actual
      }
    });
  
    // Agregar la última línea si quedó algo
    if (lineaActual) {
      resultado.push(lineaActual.trim());
    }

    console.log(resultado)

    return resultado;
  }
  
  // 8. Llamar la función principal al cargar la página
window.addEventListener("load", iniciar1);