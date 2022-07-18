import { galleryApi } from './fetchTrendingFilms';

export const createArrayOfGenres = () => {
  galleryApi.fetchGenres().then(data => {
    galleryApi.arrayOfGenres = data;
  });
};

export const changeIdOfGenreToName = arrayOfResults => {
  const arrayIdOfGenres = arrayOfResults.map(el => el.genre_ids);

  for (let i = 0; i < arrayIdOfGenres.length; i++) {
    arrayIdOfGenres[i].forEach((el, index, array) => {
      const object = galleryApi.arrayOfGenres.find(genre => genre.id === el);
      array[index] = object.name;
    });
  }
  arrayOfResults.map((el, index) => (el.genre_ids = arrayIdOfGenres[index]));
};

export const changeDateInArrayOfResults = arrayOfResults => {
  const arrayDateOfMovies = arrayOfResults.map(el => el.release_date);

  arrayDateOfMovies.forEach((el, index, array) => {
    array[index] = el.split('-')[0];
  });
  arrayOfResults.map(
    (el, index) => (el.release_date = arrayDateOfMovies[index])
  );
};
