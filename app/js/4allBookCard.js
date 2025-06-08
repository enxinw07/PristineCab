"use strict"

/**
 * allBooking.js contains functions to display cards in the html for all bookings 
 * and is seperated to three parts which is Scheduled, Commenced, snd Completed bookings
 * this js also contains button function that will be displayed on the card which is 
 * see details, and cancel booking (only for scheduled bookings). 
 */


/**
 * 
 * @param {array} scheduledData 
 * @returns list of cards for all scheduled bookings
 * @description this function will take all scheduled bookings data as parameter and
 * it will loop through all the scheduled bookings to display the card. The date, pick up point,
 * and destination of the particular card will be shown on the card according to the iteration 
 * of the loop. There will be two button for scheduled booking card which is see details and 
 * cancel booking. Both will also run by taking the iteration of the card as input
 */

function displayScheduledData(scheduledData)
{
    let output = "";
    for(let i=0; i < scheduledData.length; i++)
    {
    output +=`<div class="demo-card-wide mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Scheduled Booking<br>${scheduledData[i].bookingDate}</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <div> <b>Pickup point:</b><div>${scheduledData[i].pickUpPoint.address}</div></div>
            <div> <b>Destination:</b><div>${scheduledData[i].destination.address}</div></div>
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="viewScheduledSummary(${i})">
              See Details
            </a>
            <!-- Colored raised button -->
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onclick="cancelBookingPage4(${i})">
                Cancel
            </button>
          </div>
        </div> <br>`
    }
    return output;    
}

// get summary data by creating a new summary class to store all Bookings data
let summary = new Summary()
//get all bookings data from local storage
let data = getData(SUMMARY_KEY)
//converting the data taken from local storage to class.
summary.fromData(data);
//Sort the cards acording to date
summary.sortBooking();
//Update the sorted date data into local storage
updateData(SUMMARY_KEY,summary);


/**
 * 
 * @param {number} index 
 * @description this function cancel the scheduled booking and will be runned when 
 * the cancel button was pressed on the scheduled booking card. it will confirm with
 * user whether to cancel booking, if user confirm to cancel booking, it will remove
 * whole class of booking from the scheduled booking array from the summary class, and
 * update the removed booking data to the local storage, and finally redisplay all scheduled
 * booking cards to show the newest data(removed booking will no longer show on the page)
 */
function cancelBookingPage4(index)
{
    let confirmation = confirm("Are you sure you want to cancel this booking?");
    if (confirmation == true)
    {
      summary.cancelBooking(index);
      updateData(SUMMARY_KEY,summary);
      scheduledBookingWrite.innerHTML = displayScheduledData(scheduledData);
    }
    else
    {
      alert("Booking not canceled"); //if user didn't confirm to cancel booking, nothing sill be done
    }
}

/**
 * 
 * @param {number} index 
 * @description This function is for the "see details" button. It will take the index of scheduled
 * booking as input and update the value into local storage for future use, and then it will
 * jump to the page where will display booking summary.
 */
function viewScheduledSummary(index)
{
  updateData(SCHEDULED_BOOKING_INDEX_KEY, index);
  window.location.assign("5schedSum.html");
}


/**
 * 
 * @param {array} completedData
 * @returns list of cards for all completed bookings
 * @description this function will take all completed bookings data as parameter and
 * it will loop through all the completed bookings to display the card. The booking date, pick up point,
 * and destination of the particular card will be shown on the card according to the iteration 
 * of the loop. There will be a button for completed booking card which is see details.
 * It will run by taking the iteration of the card as input.
 */
function displayCompletedData(completedData) {
    let output = "";
    for (let i = 0; i < completedData.length; i++) {
      output += `<div class="demo-card-wide mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
              <h2 class="mdl-card__title-text">Completed Booking<br>${completedData[i].bookingDate}</h2>
            </div>
            <div class="mdl-card__supporting-text">
              <div> <b>Pickup point:</b><div>${completedData[i].pickUpPoint.address}</div></div>
              <div> <b>Destination:</b><div>${completedData[i].destination.address}</div></div>
            </div>
            <div class="mdl-card__actions mdl-card--border">
              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="viewCompletedSummary(${i})">
                See Details
              </a>
              <!-- Colored raised button -->
              
            </div>
          </div> <br>`
    }
    return output;
  
  }
  
  /**
 * 
 * @param {number} index 
 * @description This function is for the "see details" button. It will take the index of completed
 * booking as input and update the value into local storage for future use, and then it will
 * jump to the page where will display booking summary.
 */
  function viewCompletedSummary(index)
  {
    updateData(COMPLETED_BOOKING_INDEX_KEY, index);
    window.location.assign("7compSum.html");
  }




/**
 * 
 * @param {array} commencedData
 * @returns list of cards for all completed bookings
 * @description this function will take all completed bookings data as parameter and
 * it will loop through all the completed bookings to display the card. The booking date, pick up point,
 * and destination of the particular card will be shown on the card according to the iteration 
 * of the loop. There will be a button for completed booking card which is see details.
 * It will run by taking the iteration of the card as input.
 */
function displayCommencedData(commencedData)
{
    let output = "";
    for(let i=0; i < commencedData.length; i++)
    {
    output +=`<div class="demo-card-wide mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Commenced Booking<br>${commencedData[i].bookingDate}</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <div><b>Pickup point:</b><div>${commencedData[i].pickUpPoint.address}</div></div>
            <div><b>Destination:</b><div>${commencedData[i].destination.address}</div></div>
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="viewCommencedSummary(${i})">
              See Details
            </a>
          </div>
        </div><br>`
    }
    return output;    
}

 /**
 * 
 * @param {number} index 
 * @description This function is for the "see details" button. It will take the index of commenced
 * booking as input and update the value into local storage for future use, and then it will
 * jump to the page where will display booking summary.
 */
function viewCommencedSummary(index)
{
  updateData(COMMENCED_BOOKING_INDEX_KEY, index);
  window.location.assign("6commSum.html");
}

 /**
 * 
 * @param {array} array
 * @description This function will take the booking type array as input and loop through all the 
 * datas. If the date is earlier than the previous it will change possition with it's 
 * previous. If it is the same date, time will be used to sort.
 * The whole loop will be rerun to make sure all data has been sorted according to date and time.
 */
function sortByDates(array)
{
  for(let i = array.length-1;i >= 0; i--)
  {
    for(let j = 1; j<=1 ; j++)
    {
      if(Date.parse(array[j-1].bookingDate) > Date.parse(array[j].bookingDate))
      {
        let temp = array[j-1];
        array[j-1] = array[j];
        array[j] = temp;
      }
      else if (Date.parse(array[j-1].bookingDate)== Date.parse(array[j].bookingDate) && array[j - 1].startTime > array[j].startTime)
      {
        let temp = array[j-1];
        array[j -1] = array[j];
        array[j] = temp;
      } 
    }
  }
  return array;
}

/**
 * This function is used to check if an array of data is needed to be sort by date.
 * If the array has more than one data, it needs to be sort by time.
 */
function checkForSorting()
{
  if (scheduledData.length > 1)
  {
    sortByDates(scheduledData);
  }
  if (completedData.length > 1)
  {
    sortByDates(completedData);
  }
  if (commencedData.length > 1)
  {
    sortByDates(commencedData);
  }  
}
//assigning all type of bookings array
let scheduledData = summary.scheduledBookings;
let completedData = summary.completedBookings;
let commencedData = summary.commencedBookings;
//sortByDates(scheduledData);
checkForSorting();

//Run the functions to display these data in HTML.
let scheduledBookingWrite = document.getElementById("scheduledContent");
scheduledBookingWrite.innerHTML = displayScheduledData(scheduledData);


let completedBookingWrite = document.getElementById("completedContent");
completedBookingWrite.innerHTML = displayCompletedData(completedData);


let commencedBookingWrite = document.getElementById("commencedContent");
commencedBookingWrite.innerHTML = displayCommencedData(commencedData);