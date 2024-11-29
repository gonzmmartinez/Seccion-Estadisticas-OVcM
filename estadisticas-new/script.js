document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('toggleSidebar');

    // Verifica si estamos en un dispositivo móvil
    const isMobile = window.innerWidth <= 800;

    // Estado inicial de la barra según el dispositivo
    if (isMobile) {
        sidebar.classList.add('hidden'); // Oculta la barra en móviles
        toggleButton.style.color = '#3A1D51'; // Color del botón cuando la barra está oculta
        mainContent.classList.add('expanded'); // Expande el contenido principal
        toggleButton.style.left = '5%'; // Ajusta la posición del botón
    } else {
        sidebar.classList.remove('hidden'); // Muestra la barra en escritorio
        mainContent.classList.remove('expanded'); // Restaura el margen del contenido principal
        toggleButton.style.left = '15%'; // Ajusta la posición del botón
    }
});

// FUNCIÓN PARA EL BOTÓN DE ABRIR LA BARRA LATERAL

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('toggleSidebar');

    // Alterna la visibilidad de la barra lateral
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');

    // Verifica si estamos en un dispositivo móvil
    const isMobile = window.innerWidth <= 800;

    // Ajusta la posición y color del botón según el estado de la barra lateral
    if (sidebar.classList.contains('hidden')) {
        toggleButton.style.color = '#3A1D51'; // Color del botón cuando la barra está oculta
        toggleButton.style.left = isMobile ? '5%' : '10px'; // Posición según el dispositivo
    } else {
        toggleButton.style.color = '#fafafa'; // Color del botón cuando la barra está visible
        toggleButton.style.left = isMobile ? '5%' : '15%'; // Posición según el dispositivo
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