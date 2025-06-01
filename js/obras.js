document.addEventListener("DOMContentLoaded", () => {
  fetch("data/artworks.json")
    .then((res) => res.json())
    .then((data) => {
      mostrarObras(data);
    })
    .catch((err) => {
      console.error("Error al cargar el JSON:", err);
    });
});

function mostrarObras(data) {
  const galeria = document.getElementById("obras-galeria");

  const categorias = [
    { clave: "drawings", nombre: "DIBUJOS" },
    { clave: "paintings", nombre: "PINTURAS" },
    { clave: "installations", nombre: "INSTALACIONES" },
  ];

  categorias.forEach(({ clave, nombre }) => {
    const categoriaDiv = document.createElement("div");
    categoriaDiv.className = "categoria-bloque";

    const titulo = document.createElement("h2");
    titulo.className = "categoria-titulo";
    titulo.textContent = nombre;
    categoriaDiv.appendChild(titulo);

    const años = Object.keys(data[clave]).sort((a, b) => b.localeCompare(a));

    const portadasContenedor = document.createElement("div");
    portadasContenedor.className = "portadas-año";

    años.forEach((año) => {
      const obras = data[clave][año];
      if (!obras || obras.length === 0) return;

      const obra = obras[Math.floor(Math.random() * obras.length)];

      const obraItem = document.createElement("div");
      obraItem.className = "obra-item";

      const img = document.createElement("img");
      img.src = obra.image.startsWith("../") ? obra.image.slice(3) : obra.image;
      img.alt = obra.title || "Obra";

      const etiqueta = document.createElement("div");
      etiqueta.className = "obra-anio";
      etiqueta.textContent = año;

      obraItem.appendChild(img);
      obraItem.appendChild(etiqueta);
      portadasContenedor.appendChild(obraItem);
    });

    categoriaDiv.appendChild(portadasContenedor);
    galeria.appendChild(categoriaDiv);
  });
}
