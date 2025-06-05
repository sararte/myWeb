export function iniciarVisorInstalaciones(anio, data) {
  const lista = data.installations[anio];
  if (!lista || lista.length === 0) return;

  crearLightbox(lista);
}

function crearLightbox(obras) {
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
  fondo.style.alignItems = 'center';
  fondo.style.justifyContent = 'center';
  fondo.style.zIndex = '1000';
  fondo.addEventListener('click', cerrarLightbox);

  const contenedor = document.createElement('div');
  contenedor.id = 'visor-contenedor';
  contenedor.style.position = 'relative';
  contenedor.style.background = 'white';
  contenedor.style.padding = '0';
  contenedor.style.maxWidth = '90%';
  contenedor.style.maxHeight = '90%';
  contenedor.style.borderRadius = '12px';
  contenedor.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
  contenedor.style.overflow = 'hidden';
  contenedor.style.display = 'flex';
  contenedor.style.flexDirection = 'column';
  contenedor.addEventListener('click', e => e.stopPropagation());

  // Contenido con scroll (las imágenes y videos)
  const areaContenido = document.createElement('div');
  areaContenido.style.flex = '1';
  areaContenido.style.overflowY = 'auto';
  areaContenido.style.padding = '30px';

  obras.forEach(obra => {
    if (obra.image && !obra.video) {
      const img = document.createElement('img');
      img.src = obra.image;
      img.style.display = 'block';
      img.style.maxWidth = '100%';
      img.style.margin = '20px auto';
      areaContenido.appendChild(img);
    }
  });

  obras.forEach(obra => {
    if (obra.video) {
      const video = document.createElement('video');
      video.src = obra.video;
      video.controls = true;
      video.style.display = 'block';
      video.style.maxWidth = '100%';
      video.style.margin = '20px auto';
      areaContenido.appendChild(video);
    }
  });

  // Caja flotante de descripción
  const primera = obras[0];
  const descripcion = document.createElement('div');
  descripcion.style.position = 'fixed';
  descripcion.style.bottom = '20px';
  descripcion.style.left = '50%';
  descripcion.style.transform = 'translateX(-50%)';
  descripcion.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
  descripcion.style.padding = '10px 20px';
  descripcion.style.borderRadius = '10px';
  descripcion.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
  descripcion.style.textAlign = 'center';
  descripcion.style.color = '#333';
  descripcion.style.zIndex = '1100';
  descripcion.style.maxWidth = '80%';

  descripcion.innerHTML = `
    <strong>${primera.title || 'S/T'}</strong>${primera.subtitle ? ` – <em>${primera.subtitle}</em>` : ''}<br>
    ${primera.year} – ${primera.materials}, ${primera.dimensions}
  `;

  contenedor.appendChild(areaContenido);
  fondo.appendChild(contenedor);
  fondo.appendChild(descripcion);
  document.body.appendChild(fondo);
}

function cerrarLightbox() {
  const fondo = document.getElementById('visor-fondo');
  if (fondo) fondo.remove();
}
