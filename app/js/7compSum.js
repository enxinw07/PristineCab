/**
 * completedSum.js will contains codes to display the details of the particular
 * completed bookings.
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

    

    bookingDateRef.innerText = viewCompletedBookingRef._bookingDate;
    bookingTimeRef.innerText = viewCompletedBookingRef._pickUpTime;
    pickUpPointRef.innerText = viewCompletedBookingRef._pickUpPoint.address;
    destinationsRef.innerText = viewCompletedBookingRef._destination.address;
    taxiTypeRef.innerText = viewCompletedBookingRef._taxiType;
    plateNumberRef.innerText = viewCompletedBookingRef._carPlate;
    distanceRef.innerText = viewCompletedBookingRef._distance;
    fareRef.innerText = viewCompletedBookingRef._fare;
    let stopsChecker = viewCompletedBookingRef._stops;
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
let completedInd = getData(COMPLETED_BOOKING_INDEX_KEY);//get the index from local storage stored previously
let viewCompletedBookingRef = allBooking.getCompletedBooking(completedInd);
writeToPage();