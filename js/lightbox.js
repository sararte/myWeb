// js/lightbox.js
export function showLightbox(imagenes, indiceInicial, getDescripcion) {
  let indice = indiceInicial;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  const contenedor = document.createElement('div');
  contenedor.className = 'lightbox-contenedor';

  const img = document.createElement('img');
  img.src = imagenes[indice].image;
  contenedor.appendChild(img);

  const descripcion = document.createElement('div');
  descripcion.className = 'lightbox-descripcion';
  descripcion.textContent = getDescripcion(indice);
  contenedor.appendChild(descripcion);

  const flechaIzq = document.createElement('div');
  flechaIzq.className = 'lightbox-flecha izq';
  flechaIzq.innerHTML = '&#10094;';
  contenedor.appendChild(flechaIzq);

  const flechaDer = document.createElement('div');
  flechaDer.className = 'lightbox-flecha der';
  flechaDer.innerHTML = '&#10095;';
  contenedor.appendChild(flechaDer);

  function actualizar() {
    img.src = imagenes[indice].image;
    descripcion.textContent = getDescripcion(indice);
    flechaIzq.style.opacity = indice === 0 ? '0.3' : '1';
    flechaDer.style.opacity = indice === imagenes.length - 1 ? '0.3' : '1';
  }

  flechaIzq.onclick = e => {
    e.stopPropagation();
    if (indice > 0) {
      indice--;
      actualizar();
    }
  };

  flechaDer.onclick = e => {
    e.stopPropagation();
    if (indice < imagenes.length - 1) {
      indice++;
      actualizar();
    }
  };

  overlay.onclick = () => {
    overlay.remove();
  };

  overlay.appendChild(contenedor);
  document.body.appendChild(overlay);
  actualizar();
}
