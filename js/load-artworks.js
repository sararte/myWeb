async function cargarImagenes() {
  try {
    const respuesta = await fetch('data/artworks.json');
    const datos = await respuesta.json();

    // Extrae todos los arrays y los convierte en uno solo
    const todasLasObras = Object.values(datos).flat();

    // Selecciona una obra al azar
    const obraAleatoria = todasLasObras[Math.floor(Math.random() * todasLasObras.length)];

    const rutaImagen = `img/${obraAleatoria.category}/${obraAleatoria.filename}`;
    document.body.style.backgroundImage = `url('${rutaImagen}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.transition = 'background-image 1s ease-in-out';
  } catch (error) {
    console.error('Error al cargar las imágenes:', error);
  }
}
