function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('toggleSidebar');

    // Alterna la visibilidad de la barra lateral
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
    
    // Ajusta la posición y color del botón según el estado de la barra lateral
    if (sidebar.classList.contains('hidden')) {
        toggleButton.style.left = '10px'; // Posición cuando la barra está oculta
        toggleButton.style.color = '#3A1D51'; // Color del botón cuando la barra está oculta
    } else {
        toggleButton.style.left = '15%'; // Posición cuando la barra está visible
        toggleButton.style.color = '#fafafa'; // Color del botón cuando la barra está visible
    }
}
