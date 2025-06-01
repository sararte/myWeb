document.addEventListener("DOMContentLoaded", () => {
  const jsonPath = 'data/artworks.json';

  async function getAllImagePaths() {
    const response = await fetch(jsonPath);
    const data = await response.json();
    console.log("JSON cargado:", data);

    const imagePaths = [];

    for (const category in data) {
      const years = data[category];
      for (const year in years) {
        const works = years[year];
        works.forEach(work => {
          if (work.image) {
            const cleanedPath = work.image.replace(/^\.\.\//, '');
            imagePaths.push(cleanedPath);
          }
        });
      }
    }

    console.log("Imágenes encontradas:", imagePaths);
    return imagePaths;
  }

  async function startSlideshow() {
    const bg1 = document.getElementById('background');
    const bg2 = document.getElementById('background2');
    const images = await getAllImagePaths();
    let current = 0;

    function changeImage() {
      const randomImage = images[Math.floor(Math.random() * images.length)];

      if (current === 0) {
        bg2.style.backgroundImage = `url('${randomImage}')`;
        bg2.style.opacity = 1;
        bg1.style.opacity = 0;
        current = 1;
      } else {
        bg1.style.backgroundImage = `url('${randomImage}')`;
        bg1.style.opacity = 1;
        bg2.style.opacity = 0;
        current = 0;
      }

      console.log("Imagen aplicada:", randomImage);
    }

    changeImage(); // imagen inicial
    setInterval(changeImage, 8000); // cada 8 segundos
  }

  startSlideshow();
});
