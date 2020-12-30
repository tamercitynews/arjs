window.onload = () => {
  const button = document.querySelector('button[data-action="change"]');
  button.innerText = '﹖';

  let places = staticLoadPlaces();
  renderPlaces(places);
};

function staticLoadPlaces() {
 return [
     {
         name: 'Maury',
         location: {
            lat: 41.966133735889414,
            lng: 12.660829397694757 
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

var models = [
  {
      url: './assets/magnemite/scene.gltf',
      scale: '2 2 2',
      info: 'Magnemite, Lv. 5, HP 10/10',
      rotation: '180 0 0',
  },
  {
      url: './assets/kratos/scene.gltf',
      scale: '2 2 2',
      rotation: '180 0 0',
      info: 'Articuno, Lv. 80, HP 100/100',
  },
  {
      url: './assets/scene/scene.gltf',
      scale: '2 2 2',
      rotation: '180 0 0',
      info: 'Dragonite, Lv. 99, HP 150/150',
  },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}