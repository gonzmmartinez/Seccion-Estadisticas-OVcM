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