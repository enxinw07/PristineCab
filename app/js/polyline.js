"use strict"

/**
 * polyline.js included the function to show the connected route for user. 
 * this file contain a map in global code, and a function named showPolyline(),
 * at the end of the file, a global call is used to run the showPolyline function.
 */

// Mapbox token
const MAPBOX_TOKEN = "pk.eyJ1IjoianVua2VhdCIsImEiOiJja29sMzBkNm4wZ2IzMnZvNjhrZHVyMW1wIn0.Od77Q9u9tNNMWb7ZkuQpdQ";

// get data from local storage
let polyBooking = new Booking;
let polyData = getData(BOOKING_KEY);
polyBooking.fromData(polyData);

// show the map
mapboxgl.accessToken = MAPBOX_TOKEN;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [polyBooking.pickUpPoint.lng,polyBooking.pickUpPoint.lat], // starting position [lng, lat]
    zoom: 13 // starting zoom
});



// show polyline function

// pre allocated array
let forPolyline = [];
/**
 * @description this function used to show the polyline between each selected points on the map
 */
function showPolyline() 
{
    // name the variables
    let pickUpPointSelected = polyBooking.pickUpPoint;
    let stopSelected = polyBooking.stops;
    let destinationSelected = polyBooking.destination;

    // clear array
    forPolyline = [];

    // push all the pick up point, stops and destination 's longitute and latitude into array
    forPolyline.push([pickUpPointSelected.lng, pickUpPointSelected.lat]);

    // loops the stops and extract the coordinates and push it into the forPolyline array
    if (polyBooking.stops != null) 
    {
        for (let i = 0; i < stopSelected.length; i++) 
        {
            let temporary;
            temporary = [stopSelected[i][0], stopSelected[i][1]];
            forPolyline.push(temporary);
        };
    }

    // finally push the destination coordinates
    forPolyline.push([destinationSelected.lng, destinationSelected.lat]);

    // delete previous line
    let hasPoly = map.getLayer('polyline');
    if (hasPoly !== undefined) 
    {
        map.removeLayer('polyline');
        map.removeSource('polyline');
    }

    // set up the marker
    for (let j = 0; j < forPolyline.length; j++) 
    {

        let marker = new mapboxgl.Marker({ "color": "#ff5757" });
        marker.setLngLat([forPolyline[j][0], forPolyline[j][1]]);

        let popup = new mapboxgl.Popup({ offset: 45});
        // set popup content
        if(j == 0)
        {
            popup.setHTML(`${pickUpPointSelected.address}`);
        }
        else if ( j == forPolyline.length-1)
        {
            popup.setHTML(`${destinationSelected.address}`);
        }
        else
        {
            let stopSelected = polyBooking.stops;
            popup.setHTML(`${stopSelected[j-1][2]}`);
        }

        // Attach the popup to the marker
        marker.setPopup(popup);

        // add the marker to the map
        marker.addTo(map);

        // Add the popup to the map
        popup.addTo(map);

    }

    // create polyline
    // create line
    map.on('load', function () {
        map.addSource('polyline', {
            'type': "geojson",
            'data': {
               'type': "Feature",
                'properties': {},
               'geometry': {
                   'type': "LineString",
                  'coordinates': forPolyline
               }
             }
        })
    })

    map.on('load', function () {
        map.addLayer(
            {
            'id': "polyline",
            'type': "line",
            'source': "polyline",
            'layout': {
                "line-join": "round",
                "line-cap": "round"
                },
            'paint': {
                "line-color": "#f82323",
                "line-width": 4
                }
            }
        );
    })

}


// call out the function
showPolyline();
