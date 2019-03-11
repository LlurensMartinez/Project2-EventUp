'use strict';

const main = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmNvZGVyOTIiLCJhIjoiY2pkbmRmdno4MGQ2ODJ4bWtxcG02dnk1ciJ9.DehQETKEOyrOha4hqclYvg';
  const mapOptions = {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [2.1577406, 41.387982],
    zoom: 15
  };

  const longitudeP = document.querySelector('.longitude-p');
  const latitudeP = document.querySelector('.latitude-p');

  const map = new mapboxgl.Map(mapOptions);

  // if (!navigator.geolocation) {
  //   console.log('Geolocation is not supported by your browser');
  // } else {
  //   navigator.geolocation.getCurrentPosition(hasLocation, error);
  // }

  const latitude = latitudeP.innerText;
  const longitude = longitudeP.innerText;
  const coordinates = [longitude, latitude];
  map.setCenter(coordinates);
  const marker = new mapboxgl.Marker({
    color: 'red',
    offset: {
      x: -20,
      y: -20
    }
  })
    .setLngLat(coordinates)
    .addTo(map);

  map.setZoom(17);
};

window.addEventListener('load', main);
