import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryContainer = document.querySelector('.gallery');

console.log(galleryItems);

const galleryMarkup = onRanderGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function onRanderGalleryMarkup(elements) {
  return elements
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__link" href="large-image.jpg">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}" />
            </a>
        </div>`;
    })
    .join(' ');
}

// Получение большое картинки

galleryContainer.addEventListener('click', onSelectedImg);

function onSelectedImg(evt) {
  console.log(evt.target);

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  evt.preventDefault();

  const selectImage = basicLightbox.create(`<img src="${evt.target.dataset.source}">`, {
    onclose: () => {
      document.removeEventListener('keydown', onCloseModal);
    },
  });
  selectImage.show();

  document.addEventListener('keydown', onCloseModal);

  function onCloseModal(evt) {
    if (evt.key === 'Escape') {
      selectImage.close();
    }
  }
}
