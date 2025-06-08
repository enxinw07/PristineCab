"use strict"

/*
 * stops(7).js file included functions which realated to add or remove stops
 *  
 * 
 */ 

// addStopDone (button)
/**
 * @description this function is used to redirect user to the route summary page when finish editing stops
 */
function addStopDone()
{
  window.location.assign("2routeSum.html");
}


/**
 * 
 * @param {array} stops 
 * @returns this function is used to re-display the stops to the user after they remove a stop
 */
function showStop(stops)
{
  // displaying by the table format
  let stopsOutput = "<table>"
    
  // loops through all the stops and extract the address from the indexed array
  for (let i = 0; i < stops.length; i++) 
  {
    stopsOutput += `<tr><td><b> Stop ${i + 1}:</b></td>`
    stopsOutput += `<td>${stops[i][2]}</td>
      <td>
      <span>
      <a class="mdl-list__item-secondary-action" onclick="removeStop(${i})">
      <i class="material-icons">delete</i></a>
      </span> 
      </td>
      </tr>` ;
  }

  // finally return the output
  return stopsOutput;
}


