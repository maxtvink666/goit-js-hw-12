import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '54674078-cc29e36c5df6708fa2caeef42';

export async function getImagesByQuery(query, page, per_page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: per_page, 
  };
  try {
    const response = await axios({
      method: 'get',
      url: 'https://pixabay.com/api/',
      params,
    });
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    throw error;
  }
}
