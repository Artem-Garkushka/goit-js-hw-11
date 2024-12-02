// api.js
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = 'YOUR_PIXABAY_API_KEY';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return [];
    }

    return data.hits;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Щось пішло не так. Спробуйте ще раз!',
    });
    return [];
  }
}
