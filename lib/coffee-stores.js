// Initialize unsplash
import {createApi} from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
})


const getUrlForCoffeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

const getListOfCoffeeStorePthots = async()=> {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage:10,
  })
  const unsplashResults = photos.response.results
  return unsplashResults.map((result) => result.urls['small'])
}
export const fetchCoffeeStores = async (latLong='43.6532,-79.3832', query='Coffee Stores', limit=7) =>{
  const photos = await getListOfCoffeeStorePthots()  

  const response = await fetch(getUrlForCoffeStores(latLong, query, limit), {
      headers: {
        // "User-Agent": 'Windows NT 10.0',
        "Authorization": process.env.FOURSQUARE_AUTHORIZATION
      }
    }
  )
  const data = await response.json()
  console.log(data);
  return data.results.map((result, idx) => {
    return {
      ...result,
      imgUrl: photos[idx]
    }
  });
}