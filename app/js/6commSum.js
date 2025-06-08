"use strict"
/**
 * This page is used to store codes to display the summary data of route
 * for the commenced booking
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

    

    bookingDateRef.innerText = viewCommencedBookingRef._bookingDate;
    bookingTimeRef.innerText = viewCommencedBookingRef._pickUpTime;
    pickUpPointRef.innerText = viewCommencedBookingRef._pickUpPoint.address;
    destinationsRef.innerText = viewCommencedBookingRef._destination.address;
    taxiTypeRef.innerText = viewCommencedBookingRef._taxiType;
    plateNumberRef.innerText = viewCommencedBookingRef._carPlate;
    distanceRef.innerText = viewCommencedBookingRef._distance;
    fareRef.innerText = viewCommencedBookingRef._fare;
    let stopsChecker = viewCommencedBookingRef._stops;
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


//Create a new summary class
let allBooking = new Summary();
let data = getData(SUMMARY_KEY);//get data from local storage
allBooking.fromData(data);//convert the local storage data to class
let commencedInd = getData(COMMENCED_BOOKING_INDEX_KEY);//get the index from local storage stored previously
let viewCommencedBookingRef = allBooking.getCommencedBooking(commencedInd);
writeToPage();
