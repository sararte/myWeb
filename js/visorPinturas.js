let indiceActual = 0;
let imagenes = [];

export function iniciarVisorPinturas(anio, data) {
  const lista = data.paintings[anio];
  if (!lista || lista.length === 0) return;

  imagenes = lista;
  indiceActual = 0;

  crearLightbox();
  mostrarImagen();
}

function crearLightbox() {
  cerrarLightbox();

  const fondo = document.createElement('div');
  fondo.id = 'visor-fondo';
  fondo.style.position = 'fixed';
  fondo.style.top = 0;
  fondo.style.left = 0;
  fondo.style.width = '100%';
  fondo.style.height = '100%';
  fondo.style.backgroundColor = 'rgba(220, 220, 220, 0.98)';
  fondo.style.display = 'flex';
  fondo.style.flexDirection = 'column';
  fondo.style.alignItems = 'center';
  fondo.style.justifyContent = 'center';
  fondo.style.zIndex = '1000';

  fondo.addEventListener('click', cerrarLightbox);

  const contenedor = document.createElement('div');
  contenedor.id = 'visor-contenedor';
  contenedor.style.position = 'relative';
  contenedor.style.maxWidth = '90%';
  contenedor.style.maxHeight = '90%';

  const img = document.createElement('img');
  img.id = 'visor-imagen';
  img.style.maxWidth = '100%';
  img.style.maxHeight = '80vh';
  img.style.display = 'block';
  img.style.margin = '0 auto';
  img.style.cursor = 'default';
  contenedor.appendChild(img);

  const descripcion = document.createElement('p');
  descripcion.id = 'visor-descripcion';
  descripcion.style.marginTop = '20px';
  descripcion.style.textAlign = 'center';
  descripcion.style.color = '#333';
  contenedor.appendChild(descripcion);

  const flechaIzq = document.createElement('div');
  flechaIzq.innerHTML = '&#10094;';
  flechaIzq.style.position = 'absolute';
  flechaIzq.style.top = '50%';
  flechaIzq.style.left = '-60px';
  flechaIzq.style.transform = 'translateY(-50%)';
  flechaIzq.style.fontSize = '3rem';
  flechaIzq.style.fontWeight = 'bold';
  flechaIzq.style.color = '#222';
  flechaIzq.style.cursor = 'pointer';
  flechaIzq.style.userSelect = 'none';
  flechaIzq.style.opacity = '0.8';
  flechaIzq.addEventListener('click', e => {
    e.stopPropagation();
    if (indiceActual > 0) {
      indiceActual--;
      mostrarImagen();
    }
  });

  const flechaDer = document.createElement('div');
  flechaDer.innerHTML = '&#10095;';
  flechaDer.style.position = 'absolute';
  flechaDer.style.top = '50%';
  flechaDer.style.right = '-60px';
  flechaDer.style.transform = 'translateY(-50%)';
  flechaDer.style.fontSize = '3rem';
  flechaDer.style.fontWeight = 'bold';
  flechaDer.style.color = '#222';
  flechaDer.style.cursor = 'pointer';
  flechaDer.style.userSelect = 'none';
  flechaDer.style.opacity = '0.8';
  flechaDer.addEventListener('click', e => {
    e.stopPropagation();
    if (indiceActual < imagenes.length - 1) {
      indiceActual++;
      mostrarImagen();
    }
  });

  contenedor.appendChild(flechaIzq);
  contenedor.appendChild(flechaDer);

  fondo.appendChild(contenedor);
  document.body.appendChild(fondo);
}

function mostrarImagen() {
  const img = document.getElementById('visor-imagen');
  const descripcion = document.getElementById('visor-descripcion');

  if (!img || !descripcion) return;

  const obra = imagenes[indiceActual];
  img.src = obra.image;

  descripcion.innerHTML = `
    <strong>${obra.title || 'S/T'}</strong><br>
    ${obra.serie ? `<em>${obra.serie}</em><br>` : ''}
    ${obra.year} – ${obra.materials}<br>
    ${obra.dimensions}
  `;

  const flechas = document.querySelectorAll('#visor-contenedor div');
  if (flechas.length === 2) {
    const [izq, der] = flechas;
    izq.style.opacity = indiceActual === 0 ? '0.3' : '1';
    der.style.opacity = indiceActual === imagenes.length - 1 ? '0.3' : '1';
  }
}

function cerrarLightbox() {
  const fondo = document.getElementById('visor-fondo');
  if (fondo) fondo.remove();
}
