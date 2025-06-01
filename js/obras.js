// obras.js - Estructura horizontal por categoría (solo covers)
fetch('data/artworks.json')
  .then(response => response.json())
  .then(data => {
    const galeria = document.getElementById('obras-galeria');
    const categorias = [
      { nombre: 'Dibujos', clave: 'drawings' },
      { nombre: 'Pinturas', clave: 'paintings' },
      { nombre: 'Instalaciones', clave: 'installations' }
    ];

    categorias.forEach(categoria => {
      const obrasPorAño = data[categoria.clave];
      const categoriaBloque = document.createElement('div');
      categoriaBloque.className = 'categoria-bloque';

      const titulo = document.createElement('h2');
      titulo.className = 'categoria-titulo';
      titulo.innerText = categoria.nombre;
      categoriaBloque.appendChild(titulo);

      const fila = document.createElement('div');
      fila.className = 'portadas-año';

      const años = Object.keys(obrasPorAño).sort((a, b) => b - a);
      años.forEach(año => {
        const obras = obrasPorAño[año];
        const obra = obras[Math.floor(Math.random() * obras.length)];

        const item = document.createElement('div');
        item.className = 'obra-item';

        const img = document.createElement('img');
        img.src = obra.image;
        img.alt = obra.title || 'Obra';

        const añoTexto = document.createElement('div');
        añoTexto.className = 'año-titulo';
        añoTexto.innerText = año;

        item.appendChild(img);
        item.appendChild(añoTexto);
        fila.appendChild(item);
      });

      categoriaBloque.appendChild(fila);
      galeria.appendChild(categoriaBloque);
    });
  });
