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

map.on('click', (event) => {
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['businesses-test']
    });
    if (!features.length) {
        return;
    }
    const feature = features[0];

    const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
            `<h3>${feature.properties.name}</h3><p>${feature.properties.description}</p><a href="${feature.properties.website}">Swag</a>`

        )
        .addTo(map);


});
function addMarker() {
    const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat([-87.637596, 41.940403])
        .setHTML(
            `<h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p>`

        )
        .addTo(map);
}
// Make a button at the top right of the map that recenters the map camera to the coordinates given in the start of this file
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset';
resetButton.className = 'reset-button';
resetButton.onclick = function () {
    map.flyTo({
        center: [-73.691482, 42.732983],
        zoom: 16,
        pitch: 65,
        bearing: 125
    });
};
map.getCanvas().parentNode.appendChild(resetButton);


