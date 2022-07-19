import { galleryApi } from './randomFilms';

export const createArrayOfGenres = () => {
  let newObject = {};
  galleryApi.fetchGenres().then(data => {
    galleryApi.arrayOfGenres = data;
    data.forEach(el => {
      newObject[el.id] = el.name;
    });
  });
  galleryApi.objectOfGenres = newObject;
};

export const changeIdOfGenreToName = arrayOfResults => {
  const arrayIdOfGenres = arrayOfResults.map(el => el.genre_ids);

  for (let i = 0; i < arrayIdOfGenres.length; i++) {
    arrayIdOfGenres[i].forEach((el, index, array) => {
      array[index] = galleryApi.objectOfGenres[el];
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
