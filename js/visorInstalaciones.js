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
  contenedor.style.background = 'white';
  contenedor.style.padding = '0';
  contenedor.style.maxWidth = '90%';
  contenedor.style.maxHeight = '90%';
  contenedor.style.borderRadius = '12px';
  contenedor.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
  contenedor.style.display = 'flex';
  contenedor.style.flexDirection = 'column';
  contenedor.style.overflow = 'hidden';
  contenedor.addEventListener('click', e => e.stopPropagation());

  // Contenedor scrollable para las imágenes
  const areaContenido = document.createElement('div');
  areaContenido.style.flex = '1';
  areaContenido.style.overflowY = 'auto';
  areaContenido.style.padding = '30px';

  // Insertar imágenes
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

  // Insertar videos al final
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

  // Descripción fija fuera del scroll
  const primera = obras[0];
  const descripcion = document.createElement('div');
  descripcion.style.textAlign = 'center';
  descripcion.style.padding = '20px';
  descripcion.style.borderTop = '1px solid #ccc';
  descripcion.style.backgroundColor = '#f9f9f9';
  descripcion.style.color = '#333';

  descripcion.innerHTML = `
  <strong>${primera.title || 'S/T'}</strong>${primera.subtitle ? ` – <em>${primera.subtitle}</em>` : ''}<br>
  ${primera.year} – ${primera.materials}, ${primera.dimensions}
`;


  contenedor.appendChild(areaContenido);
  contenedor.appendChild(descripcion);
  fondo.appendChild(contenedor);
  document.body.appendChild(fondo);
}

function cerrarLightbox() {
  const fondo = document.getElementById('visor-fondo');
  if (fondo) fondo.remove();
}
