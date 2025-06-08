"use strict"

/* map.js file included all the functions which will related to the map 
*  this file contain Mapbox token, geocoding token, web service request, 
*  both forward and reverse geocoding method function,
*  addToPickUpPoint, addToDestination, addToStops functions,
*  and showPolyline function will included in this map.js file 
*/

// Mapbox token
const MAPBOX_TOKEN = "pk.eyJ1IjoianVua2VhdCIsImEiOiJja29sMzBkNm4wZ2IzMnZvNjhrZHVyMW1wIn0.Od77Q9u9tNNMWb7ZkuQpdQ";
// Geocoding token
const GEOCODING_TOKEN = "171e4c952761445886159a293678e14e";

// web service request function
/**
 * 
 * @param {string} url 
 * @param {object} data 
 * @description this function use to generate the request to the web service. 
 */
function webServiceRequest(url,data)
{
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}

//pre allocate empty coordinate
let locationObjLng = 0;
let locationObjLat = 0;
let locationObjAddress = "" ;

// show map (global code)
mapboxgl.accessToken = MAPBOX_TOKEN;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [101.6016009,3.0652995 ], // starting position [lng, lat]
    zoom: 15 // starting zoom
});

// initiate the marker and popup class
let marker = new mapboxgl.Marker({"color":"#ff5757" , draggable: true});
let popup = new mapboxgl.Popup({offset:45});

// get current location (button)
function getLocation(){
    navigator.geolocation.getCurrentPosition(currentPosition);
}

function currentPosition(position){
    // update the pre allocated empty array
    let coordinatesLatLng = [position.coords.latitude,position.coords.longitude] 

    let data = {
        countrycode: "my",
        q: coordinatesLatLng,
        key: GEOCODING_TOKEN,
        jsonp: "showData",
    }

    webServiceRequest(`https://api.opencagedata.com/geocode/v1/json`, data);
}

// forward Geocoding -- from coordinate
map.on('click', function (e) 
{
    // get the coorindates of the location when the map is clicked	
    locationObjLng = e.lngLat.lng;
    locationObjLat = e.lngLat.lat;  

    let data = {
        countrycode: "my",
        q:`${locationObjLat},${locationObjLng}`,
        key: GEOCODING_TOKEN,
        jsonp: "showData",
    }

    webServiceRequest(`https://api.opencagedata.com/geocode/v1/json`, data);
});

// reverse geocoding -- input address
function getSearch()
{
    // retrieve the user input for the address from HTML
    let locationAddressRef = document.getElementById("locationAddress").value ;

    // define the data to pass for the query string to the web service request function
    // reverse geocoding if locationAddressRef is not blank
    let data;
    if(locationAddressRef != null)
    {
        data = {
            countrycode:"my",
            q:locationAddressRef,
            key:GEOCODING_TOKEN ,
            jsonp: "showData",
        }
    }

    webServiceRequest(`https://api.opencagedata.com/geocode/v1/json`,data);
}

// the callback function to show data 
function showData(result)
{

    // remove previous marker and popup
    marker.remove();
    popup.remove();

    // access the result
    let data = result.results[0];

    // update the result's coordinates and address to the pre allocated variables  
    locationObjLng = data.geometry.lng;
    locationObjLat = data.geometry.lat;
    locationObjAddress = data.formatted;

    // let the map pan to the set location
    map.panTo( [locationObjLng, locationObjLat]);
    
    // set marker location
    marker.setLngLat([locationObjLng, locationObjLat]);

    // set popup content
    popup.setHTML(`${data.formatted}`);

    // Attach the popup to the marker
    marker.setPopup(popup);
        
    // Add the marker to the map
    marker.addTo(map);
        
    // Add the popup to the map
    popup.addTo(map);

}

// draggable marker function
function onDragEnd() {
    let lngLat = marker.getLngLat();
    locationObjLng = lngLat.lng;
    locationObjLat = lngLat.lat;  

    let data = {
        countrycode: "my",
        q:`${locationObjLat},${locationObjLng}`,
        key: GEOCODING_TOKEN,
        jsonp: "showData",
    }

    webServiceRequest(`https://api.opencagedata.com/geocode/v1/json`, data);
}
     
// show the result after dragging the marker
marker.on('dragend', onDragEnd);


// addToPickUpPoint (button)
/**
 * @description this function used to push the pickupPoint coordinates and address to booking class 
 *              and show the result's address in the division box 
 *              finally update the booking class to local storage.
 */
function addToPickUpPoint()
{
    // using setPickUpPoint method to assign the coordinates and address into private attribute
    booking.setPickUpPoint(locationObjLng,locationObjLat,locationObjAddress) ; //lng,lat,address

    // show the pickUpPoint address in DOM
    let pickUpPointRef = document.getElementById("pickUpPoint");
    pickUpPointRef.innerText = `${locationObjAddress}`;

    // update data to local storage
    updateData(BOOKING_KEY, booking);

}

// addToDestination (button)
/**
 * @description this function used to push the destination coordinates and address to booking class 
 *              and show the result's address in the division box 
 *              finally update the booking class to local storage.
 */
function addToDestination()
{
    // using setDestination method to assign the coordinates and address into private attribute
    booking.setDestination(locationObjLng,locationObjLat,locationObjAddress) ; //lng,lat,address

    // show the destination address in DOM
    let destinationRef = document.getElementById("destination");
    destinationRef.innerText = `${locationObjAddress}` ;

    // update Data to local storage
    updateData(BOOKING_KEY,booking);

}

// addToStop (button)

// creaate an empty array
let temporaryStops = [];

/**
 * @description this function used to push the stops' coordinates and address to an empty pre allocated temporaryStops array
 *              and show the result's address in the division box in table format
 *              then assign the stops array into private attribute of the class 
 *              finally update the booking class to local storage.
 * 
 *              this function will also calculate the distance and fare from pick up point to the stops and finally to the destination
 */
function addToStops()
{   
    //let temporaryStops = [];
    // push the current selected location's lng lat and address in the temporary array
    temporaryStops.push([locationObjLng, locationObjLat, locationObjAddress]);

    // reference for stops output area
    let stopsRef = document.getElementById("stops");

    // displaying by the table format
    let stopsOutput = "<table>"

    // loops through all the stops and extract the address from the indexed array
    for (let i = 0; i < temporaryStops.length; i++) {
        stopsOutput += `<tr><td><b> Stop ${i + 1}:</b></td>`
        stopsOutput += `<td>${temporaryStops[i][2]}</td>
            <td>
            <span>
            <a class="mdl-list__item-secondary-action" onclick="removeStop(${i})">
            <i class="material-icons">delete</i></a>
            </span> 
            </td>
            </tr>` ;
    }
    

    // print the output in the division box
    stopsRef.innerHTML = stopsOutput;

    // upload to booking class and local storage
    //booking.addStops(temporaryStops);
    let booking = new Booking;
    let data = getData(BOOKING_KEY);//._scheduledBookings;
    //let summary = allBooking.fromData(yes)
    booking.fromData(data);
    //summary.sortBooking();
    updateData(BOOKING_KEY,booking);
    //booking._stops.push(temporaryStops);
    booking._stops = temporaryStops;
    booking.countDistance();
    booking.countFare();
    updateData(BOOKING_KEY,booking);

    //showPolyLine()
}
//let stopsRef = document.getElementById("stops");

/**
 * @param {number} stopIndex 
 * @description this function is used to remove the stops by inputting the particular stops index 
 */
function removeStop(stopIndex)
{
    //let stopsOutput = "";
    let booking = new Booking;
    let data = getData(BOOKING_KEY);//._scheduledBookings;
    //let summary = allBooking.fromData(yes)
    booking.fromData(data)
    let stopsRef = document.getElementById("stops");
    booking.removeStops(stopIndex);
    updateData(BOOKING_KEY,booking);
    temporaryStops.splice(stopIndex,1);
    stopsRef.innerHTML = showStop(booking._stops);
}
