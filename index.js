var budget = 1800; // Initial budget
var minutes = 480; // Initial time
var utility = 0; // Initial happiness points
let markers = {}; // Object to store your markers by their unique IDs

//  Function to get the businesses from the GeoJSON file
$(document).ready(function () {
    getBusinesses();
    $("#logo").click(function() {
        window.location.href="./index.html";
    })
})

// Function to get the businesses from the GeoJSON file
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

// Add zoom and rotation controls to the map
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
            `<h3>${feature.properties.name}</h3><p>${feature.properties.description}</p><a href="${feature.properties.website}" target="_blank">Swag</a>`

        )
        .addTo(map);
});


// Default position for the camera
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset View';
resetButton.className = 'reset-button';
resetButton.onclick = function () {
    map.flyTo({
        center: [-73.691482, 42.732983],
        zoom: 15,
        pitch: 65,
        bearing: 125
    });
};

// Updating the budget and time
const endDay = document.createElement('button');
endDay.textContent = 'End Day';
endDay.className = 'endday';
endDay.onclick = function () {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    const modalContent = document.getElementsByClassName("modal-content")[0];
    var Happiness_outcome;
    var Budget_outcome;

    // Different outcomes based on the budget and happiness points
    if(budget < 200){
        Budget_outcome = `You saved ${budget} this month, keep it up to try and save more next month!`;
    }
    else {
        Budget_outcome = `You saved ${budget} this month, you're doing a great job saving money for the future!`;
    }
    if (utility <= 120 && budget < 200) {
        Happiness_outcome = "You did a good job keeping your necessities in check!";
    }
    else if (utility < 110 && budget > 200) {
        Happiness_outcome = "You may want to spend some of your hard earned dough on something fun!";
    }
    else {
        Happiness_outcome = "You did a good job keeping yourself happy, but you may want to make sure you're saving enough money for the future!";
    }
    modalContent.innerHTML = `
    <h2>Day End</h2>
    <h3>Final Stats:</h3>
    <p>Remaining Budget: $${budget}</p>
    <p>Remaining Time: ${minutes} min</p>
    <p>Happiness Points: ${utility}</p>
    <h3>Outcomes</h3>
    <p>${Budget_outcome}</p>
    <p>${Happiness_outcome}</p>
    <button id="closeModal" onclick="location.reload()">Close</button>
    `;

};


// Create a div to hold the tasks list
const tasksdiv = document.createElement('div');
tasksdiv.id = 'tasks';
tasksdiv.innerHTML = `<div id="tasksList"></div>`;

// Create a div to hold the budget information
const budgetdiv = document.createElement('div');
budgetdiv.id = 'budget';
budgetdiv.innerHTML = `<div>
<p style="display:flex;justify-content:space-between;align-items:center;">My Budget: $1800           
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="wallet">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
</svg>
 </p>
<p>My Transactions:</p>
<div id="budgetHistory">
 </div>
<h3 id="racks">Remaining Balance: $1800</h3>
<h3 id="motion">Remaining Time: 480 min</h3>
<h3 id="swag">Happiness Points: 0</h3>
</div>
`;

// Function to update the budget history
function updateBudgetHistory(cost, task) {
    let value = parseInt(cost);
    const transaction = document.createElement('div');
    transaction.className = 'budgetHistoryTransaction';
    if (value > 0) {
        transaction.innerHTML = `<p class="budgetHistoryTask">${task}</p><p class="positive">$${value}</p>`;
    }
    else {
        transaction.innerHTML = `<p class="budgetHistoryTask">${task}</p><p class="negative">$${value}</p>`;
    }

    $('#budgetHistory').append(transaction);
    $('#racks').html(`Remaining Balance: $${budget}`);
    $('#motion').html(`Remaining Time: ${minutes} min`);
    $('#swag').html(`Happiness Points: ${utility}`);
}

// Add the divs to the map
map.getCanvas().parentNode.appendChild(tasksdiv);
map.getCanvas().parentNode.appendChild(budgetdiv);
map.getCanvas().parentNode.appendChild(resetButton);
map.getCanvas().parentNode.appendChild(endDay);

// Function to load the markers from the GeoJSON file
function loadMarkers() {
    $.ajax({
        url: './businesses.geojson', // Update to the actual path
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            // Use forEach, not foreach (JavaScript is case-sensitive)
            data.features.forEach(feature => {
                // let firstSpaceIndex = (feature.properties.name).indexOf(' '); // Find the index of the first space
                // var substringUpToFirstSpace = '';
                // if (firstSpaceIndex !== -1) { substringUpToFirstSpace = (feature.properties.name).substring(0, firstSpaceIndex); }
                // else { substringUpToFirstSpace = feature.properties.name; }

                let output = `<h2>${feature.properties.name}</h2>`;
                output += `<h3>${feature.properties.taskInfo.task}</h3>`;
                output += `<p>${feature.properties.description}</p>`;
                output += `<a href="${feature.properties.website}" target="_blank">Website</a>`;
                output += `<div id="${feature.properties.name.replace(/ /g, "")}">`;
                output += `<input id="ye${feature.properties.name.replace(/ /g, "")}" class="yesButton" type="submit" value="Yes">`;
                output += `<input id="no${feature.properties.name.replace(/ /g, "")}" class="noButton" type="submit" value="No">`;
                output += `</div>`;
                const div = document.createElement('div');
                div.innerHTML = output;
                const popup = new mapboxgl.Popup().setDOMContent(div);
                markers[feature.properties.name.replace(/ /g, "_")] = new mapboxgl.Marker()
                    .setLngLat(feature.geometry.coordinates)
                    .setPopup(popup) // sets a popup on this marker
                    .addTo(map);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('Error fetching the GeoJSON data:', textStatus, errorThrown);
        }
    });
}
$(document).ready(async function () {
    loadMarkers();
    $(document).on('click', '.yesButton', function () {
        let id = this.id; // Get the id of the clicked element
        id = id.substring(2);
        $(`#${id}`).html('');
        accpeted(id);
    });
    $(document).on('click', '.noButton', function () {
        let id = this.id; // Get the id of the clicked element
        id = id.substring(2);
        $(`#${id}`).html('');
        denied(id);
    });
});

// Function to update the budget and time when a task is denied
function denied(id) {
    $.ajax({
        type: 'GET',
        url: './businesses.geojson',
        dataType: 'json',
        success: function (data) {
            $(`#${id}`).html(`<p>${data.feat}`);
            data.features.forEach(feature => {
                if (id == feature.properties.name.replace(/ /g, "")) {
                    $(`#${id}`).html(`${feature.properties.taskInfo.noMessage}`);
                }
            });
        },
        error: function (err) {
            console.error(err)
        }
    })
}

// Function to update the budget and time when a task is accepted
function accpeted(id) {
    $.ajax({
        type: 'GET',
        url: './businesses.geojson',
        dataType: 'json',
        success: function (data) {
            $(`#${id}`).html(`<p>${data.feat}`);
            data.features.forEach(feature => {
                if (id == feature.properties.name.replace(/ /g, "")) {
                    // Update the budget and time by the cost and time of the task using string to number conversion
                    if (0 > budget + parseInt(feature.properties.taskInfo.cost) && 0 > minutes - parseInt(feature.properties.taskInfo.time)) {
                        $(`#${id}`).html(`<p>You dont have the budget or the time for that!</p>`);
                    }
                    else if(0 > budget + parseInt(feature.properties.taskInfo.cost)) {
                        $(`#${id}`).html(`<p>You dont have the budget for that!</p>`);
                    }
                    else if(0 > minutes - parseInt(feature.properties.taskInfo.time)) {
                        $(`#${id}`).html(`<p>You dont have the budget or the time for that!</p>`);
                    }
                    else {
                        budget += parseInt(feature.properties.taskInfo.cost);
                        minutes -= parseInt(feature.properties.taskInfo.time);
                        utility += parseInt(feature.properties.taskInfo.utility);
                        $(`#${id}`).html(`${feature.properties.taskInfo.yesMessage}`);
                        updateBudgetHistory(feature.properties.taskInfo.cost, feature.properties.taskInfo.task);
                    }
                }
            });
        },

        error: function (err) {
            console.error(err)
        }
    })

}

// Function to get the businesses from the GeoJSON file
function getBusinesses() {
    // Get the businesses from the GeoJSON file
    $.ajax({
        type: 'GET',
        url: './businesses.geojson',
        content: 'json',
        success: function (data) {
            // Create the tasks list
            let output = `
            <p style="display:flex; justify-content:space-between;align-items:center; margin-bottom:0.5em;">
                My Tasks: 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="listbullet">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </p>`;
            let i = 0;
            output += `<table class="tasksTable">`;

            // Loop through the features and add them to the tasks list
            $(data.features).each(function () {
                if (i == 0 || i == 5 || i == 11) {
                    output += `
                        <tr style="text-align:left;">
                            <th style="padding-top:1rem;">`;
                    if (i == 0) output += `Need to Do:`
                    if (i == 5) output += `Want to Do:`
                    if (i == 11) output += `Ways to Earn:`
                    output += `</th>
                            <th style="padding-top:1rem;">*HP:&nbsp;</th>
                            <th style="padding-top:1rem;">Cost:&nbsp;</th>
                            <th style="padding-top:1rem;">Time:&nbsp;</th>
                        </tr>`;
                }
                let coords = this.geometry.coordinates[0] + "_" + this.geometry.coordinates[1];
                output += `
                    <tr>
                        <td id="task-`+ this.properties.name.replace(/ /g, "_") + `" class="table-hover" onclick='openPin(this,"` + coords + `");'>` + this.properties.taskInfo.task + `</td>
                        <td>`+ this.properties.taskInfo.utility + `</td>
                        <td>`+ this.properties.taskInfo.cost + `</td>
                        <td>`+ this.properties.taskInfo.time + `</td>
                    <tr>                   
                `;
                i++;
            });
            output += `</table>`;
            output += `<h3>*HP = Happiness Points (It's important to do what you need to, and what makes you happy too!)</h3>`
            $("#tasksList").html(output);
        },

        // Log the error if there is one
        error: function (err) {
            console.error(err);
        }
    })
}

function openPin(element, coords) {
    let id = element.id.substring(5); // Extract the correct part of the ID;
    // Check if the targeted marker exists and toggle its popup
    if (markers.hasOwnProperty(id)) {
        markers[id].togglePopup();
    }
    // Assuming you have a MapboxGL map object called 'map' and coordinates 
    // Convert string coordinates to numbers and fly to them
    let arr = coords.split("_").map(Number);
    map.flyTo({
        center: arr,
        zoom: 17,
        pitch: 65,
        bearing: 125
    });
    //wait untill after fly
    
    setTimeout(() => {
        //simulate a click on the marker
        click(863, 510);
        var width = window.innerWidth / 2;
        var height = window.innerHeight / 2;
        console.log(width);
        console.log(height);
    }, 2000);

}

function click(x, y)
{
    var ev = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': x,
        'clientY': y
    });

    var el = document.elementFromPoint(x, y);

    el.dispatchEvent(ev);
}