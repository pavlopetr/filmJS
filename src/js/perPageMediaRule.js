import { galleryApi } from './fetchTrendingFilms';

export const changePerPageOfQuery = () => {
  const mediaScreen = document.documentElement.clientWidth;

  if (mediaScreen < 1280 && mediaScreen >= 768) {
    galleryApi.perPage = 18;
  } else {
    galleryApi.perPage = 20;
  }
};
