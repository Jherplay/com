// Abrir / cerrar menú lateral usando clase 'activo'
function toggleMenu() {
  const menu = document.getElementById('menuLateral');
  menu.classList.toggle('activo');
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
  seleccionado.style.display = 'block';
  seleccionado.classList.add('fade-in');

  // Resaltar opción activa en el menú
  document.querySelectorAll('.opciones-submenu a').forEach(link => {
    link.classList.remove('activo');
    if (link.getAttribute('onclick').includes(id)) {
      link.classList.add('activo');
    }
  });
}

