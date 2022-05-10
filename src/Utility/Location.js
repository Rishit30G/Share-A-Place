//get the mapbox token from .env file
const MAPBOX_TOKEN = 'pk.eyJ1IjoicmlzaGl0MzBnIiwiYSI6ImNrdXhiZTA5ejJ4ajcyb3Fyb294YjAzNW0ifQ.8tmia-HeeyaCQpFlwRphwA';

export async function getAddressFromCoords(coords) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.latitude},${coords.longitude}.json?access_token=${MAPBOX_TOKEN}`
  );
  if (!response.ok) {
    throw new Error("Failed to get Address!");
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  const address = data.features[0].place_name;
  return address;

}

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlAddress}.json?types=address&access_token=${MAPBOX_TOKEN}`
  );
  if (!response.ok) {
    throw new Error("Failed to get Coordinates!");
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  const coordinates = {
    lat: data.features[0].geometry.coordinates[1],
    lng: data.features[0].geometry.coordinates[0],
  }
  return coordinates;
}
