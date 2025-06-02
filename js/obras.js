import { iniciarVisorDibujos } from './visorDibujos.js';

export async function obras() {
  const response = await fetch('./data/artworks.json');

  const data = await response.json();

  console.log("✅ obras.js cargado");

const main = document.querySelector('#obras-galeria');



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

      const textoAnio = document.createElement('span');
      textoAnio.textContent = anio;

      if (categoria === 'drawings') {
        imagen.addEventListener('click', () => {
          iniciarVisorDibujos(anio, data);
        });
      }

      cover.appendChild(imagen);
      cover.appendChild(textoAnio);
      fila.appendChild(cover);
    });

    seccion.appendChild(fila);
    main.appendChild(seccion);
  });
}


