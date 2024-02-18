mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucnlyb2JiIiwiYSI6ImNsc3E5cWZwbTB6MWQybm51ZWhnNXZqdGYifQ.VP-6WVFeERn_zB1sN8PZdA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/henryrobb/clsqtqx3i00fd01o4b21p132d',
    center: [-73.691482, 42.732983],
    zoom: 16,
    maxZoom: 25,
    pitch: 65,
    bearing: 125
});

$.ajax({
    url: 'path/to/your/businesses.geojson', // Update to the path where your geojson file is located
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      console.log('GeoJSON data:', data);
      data.features.foreach(feature => {
        output = `<h2>${feature.properties.name}</h2>`;
        output += `<p>${feature.properties.description}</p>`;
        output += `<a href="${feature.properties.website}">Company Website</a>`;
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error fetching the GeoJSON data:', textStatus, errorThrown);
    }
  });
  