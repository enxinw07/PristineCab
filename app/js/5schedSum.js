"use strict"
/**
 * scheduledSum.js will contains codes to display the details of the particular
 * scheduled bookings.
 */


function writeToPage()
{
    let bookingDateRef = document.getElementById("bookingDate");
    let bookingTimeRef = document.getElementById("bookingTime");
    let pickUpPointRef = document.getElementById("pickUpPoint");
    let stopsRef = document.getElementById("stops");
    let destinationsRef = document.getElementById("destination");
    let taxiTypeRef = document.getElementById("taxiType");
    let plateNumberRef = document.getElementById("plateNumber");
    let distanceRef = document.getElementById("distance");
    let fareRef = document.getElementById("fare");

    

    bookingDateRef.innerText = viewScheduledBookingRef._bookingDate;
    bookingTimeRef.innerText = viewScheduledBookingRef._pickUpTime;
    pickUpPointRef.innerText = viewScheduledBookingRef._pickUpPoint.address;
    destinationsRef.innerText = viewScheduledBookingRef._destination.address;
    taxiTypeRef.innerText = viewScheduledBookingRef._taxiType;
    plateNumberRef.innerText = viewScheduledBookingRef._carPlate;
    distanceRef.innerText = viewScheduledBookingRef._distance;
    fareRef.innerText = viewScheduledBookingRef._fare;
    let stopsChecker = viewScheduledBookingRef._stops;
    let stopsWriting = "";
    if (stopsChecker !== [])
    {
        for(let i = 0; i< stopsChecker.length;i++)
        {
            
            stopsWriting += `<span>${i+1}: ${stopsChecker[i][2]}</span><br>`;
        }
        
    }
    stopsRef.innerHTML = stopsWriting;
} 

/**
 * This function is used to change taxi type after booking in scheduled booking.
 * It change the taxi type and update back to the local storage
 * @returns 
 */
function changeTaxiType()
{
    let taxiTypeRef = document.getElementById("taxiTypeChange").value;
    let confirmation = confirm("Change Taxi Type?")
    if(confirmation == true)
    {
        allBooking.changeTaxi(scheduledInd,taxiTypeRef);
        updateData(SUMMARY_KEY,allBooking);
        writeToPage();
    }
    else
    {
        return;
    }
    

}

//Create a new summary class
let allBooking = new Summary();
let data = getData(SUMMARY_KEY);//get data from local storage
allBooking.fromData(data);//convert the local storage data to class
let scheduledInd = getData(SCHEDULED_BOOKING_INDEX_KEY);//get the index from local storage stored previously
let viewScheduledBookingRef = allBooking.getScheduledBooking(scheduledInd);
writeToPage();



 

