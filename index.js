$(document).ready(function () {
    getBusinesses();
})


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
const tasksdiv = document.createElement('div');
tasksdiv.id = 'tasks';
tasksdiv.innerHTML = `<div id="tasksList"></div>`;
map.getCanvas().parentNode.appendChild(tasksdiv);

map.getCanvas().parentNode.appendChild(resetButton);

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
                div.id = feature.properties.name;
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


function getBusinesses(){
    $.ajax({
        type: 'GET',
        url: './businesses.geojson',
        content: 'json',
        success: function(data) {
            let output = `
            <p style="display:flex; justify-content:space-between;align-items:center;">
                My Tasks: 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="listbullet">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </p>`;
            output += `
            <table id="tasksTable">
                <tr style="text-align:left">
                    <th>To complete:</th>
                    <th>HP:&nbsp;</th>
                    <th>Cost:&nbsp;</th>
                    <th>Time:&nbsp;</th>
                <tr>
            `;
            $(data.features).each(function() {
                console.log(this)
                output += `
                    <tr>
                        <td>`+this.properties.taskInfo.task+`</td>
                        <td>`+this.properties.taskInfo.utility+`</td>
                        <td>`+this.properties.taskInfo.cost+`</td>
                        <td>`+this.properties.taskInfo.time+`</td>
                    <tr>                   
                `;
            });
            output += `</table>`
            $("#tasksList").html(output);
        },
        error: function(err){
            console.error(err);
        }
    })
}
