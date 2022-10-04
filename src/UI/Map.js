export class Map {
  constructor(coords, coordsCallback) {
    this.render(coords, coordsCallback);
  }

  render(coordinates, coordsCallback) {
    if (!mapboxgl) {
      Swal.fire({
        icon: 'info',
        title: 'MapboxGL is not supported by your browser',
        showConfirmButton: false,
        timer: 1500,
      })
      return;
    }
    mapboxgl.accessToken =
      "pk.eyJ1IjoicmlzaGl0MzBnIiwiYSI6ImNrdXhiZTA5ejJ4ajcyb3Fyb294YjAzNW0ifQ.8tmia-HeeyaCQpFlwRphwA";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/satellite-v9", // style URL
      center: coordinates, // starting position [lng, lat]
      zoom: 14, // starting zoom
      cooperativeGestures: true,
    });

    //Add a marker to the map
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
    .setLngLat(coordinates)
    .addTo(map);
    marker.on('dragend',function(e){
        const lngLat = e.target.getLngLat();
        coordsCallback(lngLat['lat'], lngLat['lng']);
    })
    //Add a Zoom in button
    map.addControl(new mapboxgl.NavigationControl());
    //Add a Zoom out button
    map.addControl(new mapboxgl.FullscreenControl());
    // Add a redirect button
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    const layerList = document.getElementById("menu");
    const inputs = layerList.getElementsByTagName("input");

    for (const input of inputs) {
      input.onclick = (layer) => {
        const layerId = layer.target.id;
        map.setStyle("mapbox://styles/mapbox/" + layerId);
      };
    }
  }
}
