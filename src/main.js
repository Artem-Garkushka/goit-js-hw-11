// app.js
import { fetchImages } from './api';
import { displayImages, showLoader, hideLoader } from './render';

const form = document.getElementById('search-form');
const input = document.getElementById('query');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Поле пошуку не може бути порожнім',
    });
    return;
  }

  searchAndDisplayImages(query);
});

async function searchAndDisplayImages(query) {
  showLoader();
  const images = await fetchImages(query);
  hideLoader();

  if (images.length > 0) {
    displayImages(images);
  }
}
