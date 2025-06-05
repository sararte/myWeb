import { iniciarVisorDibujos } from './visorDibujos.js';
import { iniciarVisorPinturas } from './visorPinturas.js';
import { iniciarVisorInstalaciones } from './visorInstalaciones.js';

export async function obras() {
  const main = document.getElementById("contenedor-obras");

  const response = await fetch('./data/artworks.json');
  const data = await response.json();
  console.log("✅ obras.js cargado");

  const categorias = ['drawings', 'paintings', 'installations'];
  const titulos = {
    drawings: 'Dibujos',
    paintings: 'Pinturas',
    installations: 'Instalaciones'
  };

  categorias.forEach(categoria => {
    const seccion = document.createElement('section');
    seccion.classList.add('categoria');

    const titulo = document.createElement('h2');
    titulo.textContent = titulos[categoria];
    seccion.appendChild(titulo);

    const fila = document.createElement('div');
    fila.classList.add('cover-row');

    const anios = Object.keys(data[categoria]).sort((a, b) => b - a);
    anios.forEach(anio => {
      const obrasDelAnio = data[categoria][anio];
      if (!obrasDelAnio || obrasDelAnio.length === 0) return;

      const primera = obrasDelAnio[0];
      const cover = document.createElement('div');
      cover.classList.add('cover-item');

      const imagen = document.createElement('img');
      imagen.src = primera.image;
      imagen.alt = `${categoria} ${anio}`;

      if (categoria === 'installations') {
        const texto = document.createElement('div');
        texto.classList.add("cover-text");

        const titulo = document.createElement("p");
        titulo.classList.add("cover-title");
        titulo.textContent = primera.title;

        texto.appendChild(titulo);
        if (primera.subtitle) {
          const subtitulo = document.createElement("p");
          subtitulo.classList.add("cover-subtitle");
          subtitulo.textContent = primera.subtitle;
          texto.appendChild(subtitulo);
        }

        const anioTexto = document.createElement("p");
        anioTexto.classList.add("cover-year");
        anioTexto.textContent = anio;
        texto.appendChild(anioTexto);

        cover.appendChild(imagen);
        cover.appendChild(texto);
        imagen.addEventListener('click', () => {
          iniciarVisorInstalaciones(anio, data);
        });
      } else {
        const textoAnio = document.createElement('span');
        textoAnio.textContent = anio;

        imagen.addEventListener('click', () => {
          if (categoria === 'drawings') {
            iniciarVisorDibujos(anio, data);
          } else if (categoria === 'paintings') {
            iniciarVisorPinturas(anio, data);
          }
        });

        cover.appendChild(imagen);
        cover.appendChild(textoAnio);
      }

      fila.appendChild(cover);
    });

    seccion.appendChild(fila);
    main.appendChild(seccion);
  });
}

