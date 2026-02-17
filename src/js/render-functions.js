import SimpleLightboxModule from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const SimpleLightbox = SimpleLightboxModule.default || SimpleLightboxModule;
let lightbox;

export function createGallery(images) {
  const galleryContainer = document.querySelector('.gallery');
  const galleryMarkup = images
    .map(
      image =>
        `<li class="photo-card">
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags.split(',').slice(0, 3).join(', ')}"/>
            </a>
            <div class="info">
            <div class="info-item">
                <p class="info-item">
                    <b>Likes</b>${image.likes}
                </p>
                </div>
                <div class="info-item">
                <p class="info-item">
                    <b>Views</b>${image.views}
                </p>
                </div>
                <div class="info-item">
                <p class="info-item">
                    <b>Comments</b>${image.comments}
                </p>
                </div>
                <div class="info-item">
                <p class="info-item">
                    <b>Downloads</b>${image.downloads}
                </p>
                </div>
            </div>
        </li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
      closeText: '×',
      navText: ['←', '→'],
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  const loaderContainer = document.querySelector('.loader');
  loaderContainer.classList.remove('hidden');
}

export function hideLoader() {
  const loaderContainer = document.querySelector('.loader');
  loaderContainer.classList.add('hidden');
}

export function showLoadMoreBtn() {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreBtn() {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.add('hidden');
}

export function showImgTotal(images, imagesCount) {
  const jsImgTotal = document.querySelector('.img-total');
  imagesCount += images.hits.length;
  jsImgTotal.textContent = `Total images: ${imagesCount}/${images.totalHits}`;
  if (images.totalHits === imagesCount) {
    hideLoadMoreBtn();
    iziToast.info({
      title: 'Info',
      position: 'topRight',
      message: 'Sorry, it is all images we have',
    });
  } else {
    showLoadMoreBtn();
  }
  return imagesCount;
}