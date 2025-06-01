// js/lightbox.js

export function crearLightbox() {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";

  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-arrow left" id="prev">&#10094;</button>
      <div class="lightbox-image-container">
        <img id="lightbox-img" src="" alt="Obra" />
        <div id="lightbox-description"></div>
      </div>
      <button class="lightbox-arrow right" id="next">&#10095;</button>
    </div>
  `;

  document.body.appendChild(lightbox);
  return lightbox;
}
