// ESTADO INICIAL DE LA BARRA LATERAL
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('toggleSidebar');
    const collapsedLogo = document.getElementById('collapsedLogo');

    // Verifica si estamos en un dispositivo móvil
    const isMobile = window.innerWidth <= 800;

    // Estado inicial de la barra según el dispositivo
    if (isMobile) {
        sidebar.classList.add('collapsed'); // Oculta parcialmente la barra en móviles
        toggleButton.style.color = '#fafafa'; // Color del botón cuando la barra está oculta
        collapsedLogo.classList.remove('hidden'); // Muestra el logo colapsado
    } else {
        sidebar.classList.remove('collapsed'); // Muestra la barra en escritorio
        mainContent.classList.remove('expanded'); // Restaura el contenido principal
        collapsedLogo.classList.add('hidden'); // Oculta el logo colapsado
    }
});

// BOTÓN DE ABRIR LA BARRA LATERAL
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('toggleSidebar');
    const collapsedLogo = document.getElementById('collapsedLogo');

    // Alterna la visibilidad de la barra lateral
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    collapsedLogo.classList.toggle('hidden');

    // Ajusta la posición y color del botón según el estado de la barra lateral
    const isMobile = window.innerWidth <= 800;

    if (isMobile) {
        toggleButton.style.color = '#fafafa';
    } else {
        toggleButton.style.left = sidebar.classList.contains('collapsed') ? '1.25%' : '15%';
    }
}

// FUNCIÓN PARA CAMBIAR DE GRÁFICOS
function showChart(chartId) {
    // Ocultar todos los gráficos
    document.querySelectorAll(".chartContent").forEach(chart => {
        chart.classList.remove("active");
    });

    // Mostrar el gráfico seleccionado
    document.getElementById(chartId).classList.add("active");

    // Destruir TODOS los gráficos existentes
    document.querySelectorAll('[id^="chart"]').forEach((chartElement) => {
        const chartId = chartElement.id;  // Obtener el id del gráfico
        if (window[chartId] && typeof window[chartId].destroy === 'function') {
            window[chartId].destroy();  // Destruir el gráfico si existe
            window[chartId] = null;  // Eliminar la referencia
        }
    });

    // Actualizar los botones (quitar 'active' de todos y añadirlo al botón clicado)
    document.querySelectorAll(".indicadorButton").forEach(button => {
        button.classList.remove("active");
    });

    // Añadir 'active' al botón que llamó a la función
    const activeButton = document.querySelector(`button[onclick="showChart('${chartId}')"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }

    // Extraer el número del id y generar la función dinamicamente
    const chartNumber = chartId.replace('chart', '');  // Extraemos el número del id (por ejemplo '1' de 'chart1')
    const initFunction = `iniciar${chartNumber}`;  // Crear el nombre de la función (por ejemplo 'iniciar1')

    // Llamar a la función correspondiente
    if (typeof window[initFunction] === 'function') {
        window[initFunction]();  // Llamamos dinámicamente la función
    }
}

// FUNCIÓN SOBRE LOS GRÁFICOS

// Función para hacer el fetch
function cargarDatos(archivo) {
    return fetch(archivo) // Ruta al archivo JSON
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar JSON: ${response.status}`);
            }
            return response.json();
        });
}

// Función para parsear
function parsearDatos(data) {
    let parsedData;
    if (Array.isArray(data) && typeof data[0] === "string") {
        // Si es un array con un string JSON, realiza el segundo parseo
        parsedData = JSON.parse(data[0]);
    } else {
        // Si el JSON ya está bien estructurado, no es necesario el parseo adicional
        parsedData = data;
    }
    return parsedData;
}

// -------------------------

// Get the button:
let mybutton = document.getElementById("botonTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $('html, body').animate({ scrollTop: 0 }, 250); // Desplazamiento suave al inicio
  }
  
  // Evento para los enlaces con desplazamiento suave
  $('a').click(function() {
    const target = $($(this).attr('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 250);
    }
    return false;
  });