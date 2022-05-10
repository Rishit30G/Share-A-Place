import { Map } from "./UI/Map.js";

class LoadedPlace {
    constructor(coordinates, address) {
        new Map(coordinates);
        const headerTitleEl = document.querySelector("header h1");
        headerTitleEl.textContent = address;
    }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
    lat: parseFloat(queryParams.get("lat")),
    lng: parseFloat(queryParams.get("lng")),
   
};
const address = queryParams.get("address");
console.log(coords);


new LoadedPlace(coords, address);