window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);
};

function staticLoadPlaces() {
 return [
     {
         name: 'Magnemite',
         location: {
             lat: 44.496470,
             lng: 11.320180,
         }
     },
     {
        name: 'myplace',
        location: {
          lat: 41.86011887217522,
          lng: 12.706108401832232, 
        }
     }
 ];
}

function renderPlaces(places) {
 let scene = document.querySelector('a-scene');

 places.forEach((place) => {
     let latitude = place.location.lat;
     let longitude = place.location.lng;

     let model = document.createElement('a-entity');
     model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
     model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
     model.setAttribute('rotation', '0 0 0');
     model.setAttribute('animation-mixer', '');
     model.setAttribute('scale', '1.5 1.5 1.5');

     model.addEventListener('loaded', () => {
         window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
     });

     scene.appendChild(model);
 });
}