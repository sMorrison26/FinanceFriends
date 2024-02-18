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

function loadMarkers() {
    $.ajax({
        url: './businesses.geojson', // Update to the actual path
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            console.log('GeoJSON data:', data);
            // Use forEach, not foreach (JavaScript is case-sensitive)
            data.features.forEach(feature => {
                let output = `<h2>${feature.properties.name}</h2>`;
                output += `<p>${feature.properties.description}</p>`;
                output += `<a href="${feature.properties.website}">Company Website</a>`;
                console.log("Output: ", output);
                const div = document.createElement('div');
                div.innerHTML = output;
                console.log("div: ", div);
                // Create a new popup with the div's content
                const popup = new mapboxgl.Popup().setDOMContent(div);
                
                console.log("coords: ", feature.geometry.coordinates);
                new mapboxgl.Marker()
                    .setLngLat(feature.geometry.coordinates)
                    .setPopup(popup) // sets a popup on this marker
                    .addTo(map);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error fetching the GeoJSON data:', textStatus, errorThrown);
        }
    });
}

$(document).ready(function () {
    loadMarkers();
});
