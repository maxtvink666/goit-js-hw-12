import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showImgTotal,
  showLoadMoreBtn,
  hideLoadMoreBtn,
} from './js/render-functions.js';
import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const jsSearchQuery = document.querySelector('.js-search-query');
const loadMoreBtn = document.querySelector('.load-more');
const jsImgTotal = document.querySelector('.img-total');

let query = '';
let page = 1;
let imagesInPage = 15;
let imagesCount = 0;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault(); 

  clearGallery();
  showLoader();
  hideLoadMoreBtn();

  query = e.currentTarget.searchText.value.trim();
  imagesCount = 0;
  page = 1; 

  form.reset(); 

  if (query === '') {
    iziToast.warning({
      title: 'warning',
      position: 'topRight',
      message: 'Please enter a search query!',
    });
    jsImgTotal.textContent = ``;
    jsSearchQuery.textContent = `Search query :`;
    clearGallery();
    hideLoadMoreBtn(); 
    hideLoader(); 
    return;
  }

  jsSearchQuery.textContent = `Search query : "${query}"`;

  try {
    const images = await getImagesByQuery(query, page, imagesInPage);

    if (images.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoadMoreBtn(); 
    } else {

      createGallery(images.hits);
      imagesCount = showImgTotal(images, imagesCount);
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'Sorry, something went wrong. Please try again!',
    });
  } finally {
    hideLoader();
    page += 1;
  }
}

async function onLoadMoreClick() {
  showLoader();
  try {
    const images = await getImagesByQuery(query, page, imagesInPage);
    createGallery(images.hits);
    imagesCount = showImgTotal(images, imagesCount);
    page += 1;
    const firstCard = document.querySelector('.gallery').firstElementChild;
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } finally {
    hideLoader();
  }
}


