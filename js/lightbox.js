// lightbox.js
export function showLightbox(imagenes, indexInicial, descripcionCallback) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  const container = document.createElement('div');
  container.className = 'lightbox-container';

  const img = document.createElement('img');
  img.src = imagenes[indexInicial];
  container.appendChild(img);

  const descripcion = document.createElement('div');
  descripcion.className = 'lightbox-descripcion';
  container.appendChild(descripcion);

  const btnPrev = document.createElement('div');
  btnPrev.className = 'lightbox-prev';
  btnPrev.innerHTML = '&#9664;';
  container.appendChild(btnPrev);

  const btnNext = document.createElement('div');
  btnNext.className = 'lightbox-next';
  btnNext.innerHTML = '&#9654;';
  container.appendChild(btnNext);

  overlay.appendChild(container);
  document.body.appendChild(overlay);

  let index = indexInicial;
  function actualizarImagen() {
    img.src = imagenes[index];
    descripcion.innerText = descripcionCallback(index);
    btnPrev.style.opacity = index === 0 ? '0.3' : '1';
    btnNext.style.opacity = index === imagenes.length - 1 ? '0.3' : '1';
  }

  btnPrev.onclick = () => {
    if (index > 0) {
      index--;
      actualizarImagen();
    }
  };
  btnNext.onclick = () => {
    if (index < imagenes.length - 1) {
      index++;
      actualizarImagen();
    }
  };

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  };

  actualizarImagen();
}
