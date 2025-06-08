"use strict";
/* Add.js file included the function which allows the user to add booking details 
*  this file contains addBooking()
*/

// booking function
/**
 * 
 * @description this function is used to add booking details to the booking class and saving it to the local storage
 * according to its key  
 */
function addBooking()
{
    let bookingDateRef = document.getElementById("bookingDate").value;
    let bookingTimeRef = document.getElementById("bookingTime").value;
    let pickUpPointRef = document.getElementById("pickUpPoint").value;
    let destinationsRef = document.getElementById("destination").value;
    let taxiTypeRef = document.getElementById("taxiType").value;
    


    if (pickUpPointRef == [] )
    {
        alert("Please enter your pick up point")
        return;
    }
    if(taxiTypeRef == "(No Selection)")
    {
        alert("Please enter your taxi type") 
        return;
    }
    if(bookingTimeRef == "")
    {
        alert("Please enter your booking time") 
        return;
    }
    if(bookingDateRef == "")
    {
        alert("Please enter your booking date")
        return;
    }
    if(destinationsRef == [])
    {
        alert("Please enter your booking destination")
        return;
    }
    booking._bookingDate = bookingDateRef;
    booking._pickUpTime = bookingTimeRef;
    booking._taxiType = taxiTypeRef;
    if (booking.findTaxi() == false)
    {
        alert("Choose an available taxi type");
        return
    }
    else
    {
        booking.countDistance();
        booking.countFare();
        updateData(BOOKING_KEY,booking);
        window.location.assign("2routeSum.html");
    }
}
let booking = new Booking;


