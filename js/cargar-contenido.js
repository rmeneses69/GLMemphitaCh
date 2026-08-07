// Función principal que se ejecuta cuando la página está lista
$(document).ready(function() {
  cargarContenidoPagina();
  resaltarMenuActivo();
});

// Función que lee el parámetro de la URL y carga el contenido
function cargarContenidoPagina() {
  // Leer el parámetro "pagina" de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const pagina = urlParams.get('pagina');
  
  // Si no hay parámetro, usar página 1 por defecto
  const numeroPagina = pagina || '1';
  
  // Construir el nombre de la variable CSS
  const variableCSS = '--contenido-' + numeroPagina;
  
  // Leer la variable CSS
  const contenidoHTML = leerVariableCSS(variableCSS);
  
  // Inyectar el contenido en el artículo
  if (contenidoHTML) {
    $('#contenido').html(contenidoHTML);
    console.log('✅ Contenido cargado para página:', numeroPagina);
  } else {
    console.error('❌ No se encontró contenido para página:', numeroPagina);
    $('#contenido').html('<p>Contenido no disponible</p>');
  }
}

// Función que resalta el menú activo según el parámetro
function resaltarMenuActivo() {
  const urlParams = new URLSearchParams(window.location.search);
  const pagina = urlParams.get('pagina') || '1';
  
  // Quitar clase active de todos los enlaces
  $('.nav-bar a').removeClass('active');
  
  // Agregar clase active al enlace correspondiente
  $(`.nav-bar a[data-pagina="${pagina}"]`).addClass('active');
}

// Función auxiliar que lee una variable CSS
function leerVariableCSS(nombreVariable) {
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue(nombreVariable)
    .trim();
  
  return valor.replace(/^["']|["']$/g, '');
}