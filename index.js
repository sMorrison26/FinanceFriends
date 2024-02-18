var budget = 1800;
var minutes = 480;
$(document).ready(function () {

    getBusinesses();

})


mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucnlyb2JiIiwiYSI6ImNsc3E5cWZwbTB6MWQybm51ZWhnNXZqdGYifQ.VP-6WVFeERn_zB1sN8PZdA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/henryrobb/clsqtqx3i00fd01o4b21p132d',
    center: [-73.691482, 42.732983],
    zoom: 15,
    maxZoom: 25,
    pitch: 60,
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

// function addMarker() {
//     const popup = new mapboxgl.Popup({ offset: [0, -15] })
//         .setLngLat([-87.637596, 41.940403])
//         .setHTML(
//             `<h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p>`

//         )
//         .addTo(map);
// }
// Make a button at the top right of the map that recenters the map camera to the coordinates given in the start of this file
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset';
resetButton.className = 'reset-button';
resetButton.onclick = function () {
    map.flyTo({
        center: [-73.691482, 42.732983],
        zoom: 15,
        pitch: 65,
        bearing: 125
    });
};

// Create a div to hold the tasks list
const tasksdiv = document.createElement('div');
tasksdiv.id = 'tasks';
tasksdiv.innerHTML = `<div id="tasksList"></div>`;

// Create a div to hold the budget information
const budgetdiv = document.createElement('div');
budgetdiv.id = 'budget';
budgetdiv.innerHTML = `<div>
<p style="display:flex;justify-content:space-between;align-items:center;"   >My Budget:           
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="wallet">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
</svg>
 
</p>
<p>My Transactions:</p>
<p>Remaining Balance: </p>
</div>
`;

// Add the divs to the map
map.getCanvas().parentNode.appendChild(tasksdiv);
map.getCanvas().parentNode.appendChild(budgetdiv);
map.getCanvas().parentNode.appendChild(resetButton);

function loadMarkers() {
    $.ajax({
        url: './businesses.geojson', // Update to the actual path
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            // Use forEach, not foreach (JavaScript is case-sensitive)
            data.features.forEach(feature => {
                let firstSpaceIndex = (feature.properties.name).indexOf(' '); // Find the index of the first space
                var substringUpToFirstSpace = '';
                // Check if there's a space in the string
                if (firstSpaceIndex !== -1) { substringUpToFirstSpace = (feature.properties.name).substring(0, firstSpaceIndex); }
                else { substringUpToFirstSpace=feature.properties.name; }

                let output = `<h2>${feature.properties.name}</h2>`;
                output += `<h3>${feature.properties.taskInfo.task}</h3>`;
                output += `<p>${feature.properties.description}</p>`;
                output += `<a href="${feature.properties.website}">Website</a>`;
                output += `<div id="${substringUpToFirstSpace}">`;
                output += `<input id="ye${substringUpToFirstSpace}" class="yesButton" type="submit" value="Yes">`;
                output += `<input id="no${substringUpToFirstSpace}" class="noButton" type="submit" value="No">`;
                output += `</div>`;
                const div = document.createElement('div');
                div.id = feature.properties.name;
                div.innerHTML = output;
                // Create a new popup with the div's content
                const popup = new mapboxgl.Popup().setDOMContent(div);
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
//onclick="console.log(this.id);
$(document).ready(async function () {
    await loadMarkers();
    $(document).on('click', '.yesButton', function () {
        let id = this.id; // Get the id of the clicked element
        id = id.substring(2);
        $(`#${id}`).html('');
    });
    $(document).on('click', '.noButton', function () {
        let id = this.id; // Get the id of the clicked element
        id = id.substring(2);
        $(`#${id}`).html('');
        denied(id);
    });
});

function denied(id){
    $.ajax({
        type: 'GET',
        url: './businesses.geojson',
        dataType: 'json',
        success: function(data){
            $(`#${id}`).html(`<p>${data.feat}`);
            data.features.forEach(feature => {
                let firstSpaceIndex = (feature.properties.name).indexOf(' '); // Find the index of the first space
                var substringUpToFirstSpace = '';
                // Check if there's a space in the string
                if (firstSpaceIndex !== -1) { substringUpToFirstSpace = (feature.properties.name).substring(0, firstSpaceIndex); }
                else { substringUpToFirstSpace=feature.properties.name; }
                if (id == substringUpToFirstSpace){
                    $(`#${id}`).html(`${feature.properties.taskInfo.noMessage}`);
                }                
            });
        },
        error: function(err){
            console.error(err)
        }
    })
}


function getBusinesses() {
    $.ajax({
        type: 'GET',
        url: './businesses.geojson',
        content: 'json',
        success: function(data) {
            let output = `
            <p style="display:flex; justify-content:space-between;align-items:center; margin-bottom:0.5em;">
                My Tasks: 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="listbullet">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </p>`;
            let i=0;
            output+=`<table class="tasksTable">`;
            $(data.features).each(function() {
                if (i==0 || i==5 || i == 11){
                    output += `
                        <tr style="text-align:left;">
                            <th style="padding-top:1rem;">`;
                            if (i == 0) output += `Need to Do:`
                            if (i == 5) output += `Want to Do:`
                            if (i == 11) output += `Ways to Earn:`
                    output += `</th>
                            <th style="padding-top:1rem;">HP:&nbsp;</th>
                            <th style="padding-top:1rem;">Cost:&nbsp;</th>
                            <th style="padding-top:1rem;">Time:&nbsp;</th>
                        </tr>`;
                }
                output += `
                    <tr>
                        <td class="table-hover" onclick="">`+this.properties.taskInfo.task+`</td>
                        <td>`+this.properties.taskInfo.utility+`</td>
                        <td>`+this.properties.taskInfo.cost+`</td>
                        <td>`+this.properties.taskInfo.time+`</td>
                    <tr>                   
                `;
                i++;
            });
            output += `</table>`
            $("#tasksList").html(output);
        },
        error: function (err) {
            console.error(err);
        }
    })
}
