"use strict"

/**
 * page3.js file included confirm booking button's function, cancel booking button function 
 * and a display detail function to show the booking information to the user in summary page.
 */


let allBooking = new Summary();
if (checkStorage(SUMMARY_KEY) == true)
{
    let data = getData(SUMMARY_KEY);
    allBooking.fromData(data);
}

/**
 * @description this function used to upload the booking class data to the local storage after user confirm to make the booking
 */
function confirmBooking()
{
    let confirmation = confirm("Do you want to confirm booking?");

    if (confirmation == true)
    {
        //getData(BOOKING_KEY);
        // use addToScheduledBooking method 
        allBooking.addToScheduledBooking(getData(BOOKING_KEY));
        updateData(SUMMARY_KEY,allBooking);
        //booking = new Booking();
        window.location.assign("4allBookCard.html");//add booking will check condition
    }
    else
    {
        alert("Booking not confirmed");
    }

}

/**
 * @description this function used to cancel the booking data from local storage and redirect user to view booking page 
 */
function cancelBookingButton()
{
    let confirmation = confirm("Do you want to cancel booking?")
    if (confirmation == true)
    {   
        // use cancelBooking method to clear the booking data 
        allBooking.cancelBooking(allBooking.scheduledBookings.length);
        updateData(allBooking,allBooking);
        window.location.assign("4allBookCard.html");
    }
    else
    {
        alert("Booking not cancelled");
    }
}


function displayDetails()
{   
    
    let bookingDateRef = document.getElementById("bookingDate");
    let bookingTimeRef = document.getElementById("bookingTime");
    let pickUpPointRef = document.getElementById("pickUpPoint");
    let stopsRef = document.getElementById("stops");
    let destinationsRef = document.getElementById("destination");
    let taxiTypeRef = document.getElementById("taxiType");
    let plateNumber = document.getElementById("plateNumber");
    let distanceRef = document.getElementById("distance");
    let fareRef = document.getElementById("fare");
    
    bookingDateRef.innerText = data._bookingDate;
    bookingTimeRef.innerText = data._pickUpTime;
    pickUpPointRef.innerText = data._pickUpPoint.address;
    destinationsRef.innerText = data._destination.address;
    taxiTypeRef.innerText = data._taxiType;
    plateNumber.innerText = data._carPlate;
    distanceRef.innerText = data._distance;
    fareRef.innerText = data._fare;

    let stopsWriting = "";
    let stopsChecker = data._stops;
    if (stopsChecker !== [])
    {
        for(let i = 0; i< stopsChecker.length;i++)
        {
            
            stopsWriting += `<span>${i+1}: ${stopsChecker[i][2]}</span><br>`;
        }
        
    }
    stopsRef.innerHTML = stopsWriting;
    
}

let booking = new Booking
let data = getData(BOOKING_KEY);
booking.fromData(data);

displayDetails(data);

/**
 * function for the add stop button at the route summary page
 * jump to add stop page when activated
 */

 function addStopButton()
 {
   window.location.assign("3addStops.html");
 }
