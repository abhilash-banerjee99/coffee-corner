import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 40,
  });
  console.log(photos);
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async (
  latLong = '12.9716,77.5946',
  query = 'Cafe',
  limit = 9
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const response = await fetch(getUrlForCoffeeStores(latLong, query, limit), {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_AUTHORIZATION,
    },
  });
  const data = await response.json();
  console.log(data);

  return (
    data.results?.map((result, idx) => {
      return {
        id: result.fsq_id,
        address: result.location.address || '',
        name: result.name,
        neighborhood:
          result.location.neighborhood || result.location.cross_street || '',
        imgUrl: photos[idx],
      };
    }) || []
  );
};
