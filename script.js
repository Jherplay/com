// Abrir / cerrar menú lateral usando clase 'activo'
function toggleMenu() {
  const menu = document.getElementById('menuLateral');
  menu.classList.toggle('activo');
}

// Función para detectar si el dispositivo es móvil
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Mostrar solo el formulario elegido
function mostrarFormulario(id) {
  // Ocultar todos los formularios
  document.querySelectorAll('.form-box').forEach(box => {
    box.style.display = 'none';
    box.classList.remove('fade-in');
  });

  // Mostrar el formulario seleccionado con animación
  const seleccionado = document.getElementById(id);
  if (seleccionado) {
    seleccionado.style.display = 'block';
    seleccionado.classList.add('fade-in');
  }

  // Guardar en localStorage la última opción seleccionada
  localStorage.setItem("opcionSeleccionada", id);

  // Resaltar opción activa en el menú
  document.querySelectorAll('.opciones-submenu a').forEach(link => {
    link.classList.remove('activo');
    if (link.getAttribute('onclick')?.includes(id)) {
      link.classList.add('activo');
    }
  });

  // Cerrar el menú lateral automáticamente en dispositivos móviles
  if (isMobileDevice()) {
    toggleMenu();
  }
}

// Cargar la última opción seleccionada al abrir la página
window.addEventListener("load", () => {
  const ultimaOpcion = localStorage.getItem("opcionSeleccionada");
  if (ultimaOpcion) {
    mostrarFormulario(ultimaOpcion);
  }
});