"use strict"
/* shared.js file includes the functions and classes that are shared to be used in every page
*  this file contains Booking class and Summary class with the getters,setters and methods
*  it also contains updateData(),checkStorage(), and getData()
*/
const SCHEDULED_BOOKING_INDEX_KEY = "scheduledBookingIndex";
const COMPLETED_BOOKING_INDEX_KEY = "completeBookingIndex";
const COMMENCED_BOOKING_INDEX_KEY = "commencedBookingIndex";
const BOOKING_KEY = "bookingData";
const SUMMARY_KEY = "bookingAppData";
let taxiList = [
	{"rego":"VOV-887","type":"Car","available":true},
	{"rego":"OZS-293","type":"Van","available":false},
	{"rego":"WRE-188","type":"SUV","available":true},
	{"rego":"FWZ-490","type":"Car","available":true},
	{"rego":"NYE-874","type":"SUV","available":true},
	{"rego":"TES-277","type":"Car","available":false},
	{"rego":"GSP-874","type":"SUV","available":false},
	{"rego":"UAH-328","type":"Minibus","available":true},
	{"rego":"RJQ-001","type":"SUV","available":false},
	{"rego":"AGD-793","type":"Minibus","available":false}
];

// Booking class
/**
 * @description this class is used to store individual booking details. It contains getters, setters and methods required
 * to successfully make a booking.
 */
class Booking
{
    constructor()
    {
        this._pickUpPoint = []; 
        this._destination = [];
        this._stops = [];
        this._pickUpTime =""; 
        this._bookingDate =""; 
        this._taxiType =""; 
        this._carPlate = "";
        this._distance =""; 
        this._fare = "";
        
    }
    get pickUpPoint()
    {
        return this._pickUpPoint;
    }
    get destination()
    {
        return this._destination;
    }
    get stops()
    {
        return this._stops;
    }
    get pickUpTime()
    {
        return this._pickUpTime;
    }
    get bookingDate()
    {
        return this._bookingDate;
    }
    get taxiType()
    {
        return this._taxiType;
    }
    get carPlate()
    {
        return this._carPlate;
    }
    get fare()
    {
        return this._fare;
    }
    get distance()
    {
        return this._distance;
    }   
    set pickUpTime(pickUpTime)
    {
        this._pickUpTime = pickUpTime;
    }
    set taxiType(taxiType)
    {
        this._taxiType = taxiType;
    }
    
    /* @description this method is used to remove the stops added from the booking
    * @param {stopsIndex} : The index of which the stops are in the stops array
    */
    removeStops(stopsIndex)
    {
        this._stops.splice(stopsIndex,1);
    }
    /* @description this method is used to add the stops added to the booking
    * @param {stopsName} : The name of the Stop
    */
    addStops(stopName)
    {
        this._stops = stopName;
    }
    /* @description this method is used to find an available taxi and set the carplate number assigned 
    *  to the available taxi according to type
    */
    findTaxi()
    {
        let taxiType = this._taxiType;
        for(let i=0;i<taxiList.length;i++)
        {
            if(taxiType == taxiList[i].type)
            {
              if(taxiList[i].available == true)
              {
                this._carPlate = taxiList[i].rego;
                return
              }
              else if(taxiList[i].available == false)
              {
                alert("This taxi type is unavailable");
                return false;
              }
            }
        }
    }
    /* @description this method is set the pick up point in the form of an object 
    *@param{lng,lat,address}: longitude, latitude and address of pick up point
    */
    setPickUpPoint(lng,lat,address)
    {
        this._pickUpPoint = 
        {
            lng:lng ,
            lat:lat ,
            address:address
        }
    }
    /* @description this method is used set the destination in the form of an object 
    *@param{lng,lat,address}: longitude, latitude and address of destination
    */
    setDestination(lng,lat,address)
    {
        this._destination=
        {
            lng:lng,
            lat:lat ,
            address: address
        }
    }
    /* @description this method is used to calculate the fare of the trip using an algorithm
    */
    countFare()
    {
        let fare = 0.10*this._distance*1000/115;
        let midnight = "00:00";
        let sixAM = "06:00";
        let suvAdd = 5;
        let vanAdd = 10;
        let miniBusAdd = 15;
        let nightLevy = 1.5;
        let currentDate = new Date().toISOString().slice(0, 10);
        let advancedBooking = 2;
        let bookDate = this._bookingDate;
        bookDate = Date.parse(bookDate);
        currentDate = Date.parse(currentDate);
        if (this._taxiType == "Car")
        {
            fare = fare;
        }
        else if (this._taxiType == "SUV")
        {
           fare += suvAdd;
        }
        else if (this._taxiType == "Van")
        { 
           fare += vanAdd;
        }
        else if (this._taxiType == "Minibus")
        {
           fare += miniBusAdd;
        }
        if(currentDate > bookDate)
        {
            fare += advancedBooking;
        } 
        if (this._pickUpTime > midnight && this._pickUpTime < sixAM)
        {
            fare = nightLevy*fare;   
        }
        
        this._fare = fare.toFixed(2);
    }
    /* @description this method is used to calculate the distance of the trip using an algorithm
    * It uses the haversine function to estimate the distance.
    */
    countDistance()
    {   
        let startPoint = this._pickUpPoint;
        let endPoint = this._destination;
        let distance = 0;
        const R = 6371; // km
        if (this._stops == [])
        {
            let lonStart = startPoint.lng;
            let latStart = startPoint.lat;
            let lonEnd = endPoint.lng;
            let latEnd = endPoint.lat;
            const phi1 = latStart * Math.PI/180; // φ, λ in radians
            const phi2 = latEnd * Math.PI/180;
            const deltaPhi = (latEnd-latStart) * Math.PI/180;
            const deltaLambda = (lonEnd-lonStart) * Math.PI/180;

            const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            distance = R * c; // in km
            
        }
        else 
        { 
             
            let tempStart = [];
            tempStart.push(startPoint.lng);
            tempStart.push(startPoint.lat);
            let tempEnd = [];
            tempEnd.push(endPoint.lng);
            tempEnd.push(endPoint.lat);
            let tempArray = [];
            tempArray.push(tempStart);
            for(let i = 0;i<this._stops.length;i++)
            {
                tempArray.push(this._stops[i]);
            }
            tempArray.push(tempEnd); 
            for(let j = 0;j<tempArray.length-1;j++) 
            {
                let phi1 = tempArray[j][1] * Math.PI/180; // φ, λ in radians
                let phi2 = tempArray[j+1][1] * Math.PI/180;
                let deltaPhi = (phi2-phi1) * Math.PI/180;
                let deltaLambda = (tempArray[j+1][0]-tempArray[j][0]) * Math.PI/180;

                let a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
                Math.cos(phi1) * Math.cos(phi2) *
                Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                distance += R * c; // in km
                
                
            }

        }
        
        
        this._distance = distance.toFixed(2);
    }
    /* @description this method is used to form the dataObject back in to a class after it has been parsed
    *@param{dataObject}: the data in the form of an object
    */
    fromData(dataObject)
    {
        
        this._pickUpPoint = dataObject._pickUpPoint;
        this._destination = dataObject._destination;
        this._bookingDate = dataObject._bookingDate;
        this._stops = dataObject._stops;
        this._pickUpTime = dataObject._pickUpTime;
        this._taxiType = dataObject._taxiType;
        this._carPlate = dataObject._carPlate;
        this._distance = dataObject._distance;
        this._fare = dataObject._fare;
    }
    
}

// Summary class
/**
 * @description this class is used to store all the bookings made . It contains getters, setters and methods required
 * to successfully store and sort the bookings.
 */
class Summary
{
    constructor()
    {
        this._scheduledBookings = [];
        this._completedBookings = [];  
        this._commencedBookings =[];
    }
    get scheduledBookings()
    {
        return this._scheduledBookings;
    }
    get completedBookings()
    {
        return this._completedBookings;
    }
    get commencedBookings()
    {
        return this._commencedBookings
    }
    /**
    * @description this method is used to add bookings to the scheduledBookings array
    */
    addToScheduledBooking(bookingInstance)
    {
        
        this._scheduledBookings.push(bookingInstance);
    }
    /**
    * @description this method is used to add bookings to the completedBookings array
    */
    addtoCompletedBooking(scheduledBookingIndex)
    {  
        this._completedBookings.push(this._scheduledBookings[scheduledBookingIndex]); // push the scheduled booking selected to the completedBookings array
        this._scheduledBookings.splice(scheduledBookingIndex,1); // take the index of the scheduled booking selected and remove it
    }
    /**
    * @description this method is used to cancel bookings made
    * @param{index} the index of booking in scheduled bookings array
    */
    cancelBooking(index)
    {
        
        this._scheduledBookings.splice(index,1);
    }
    /**
    * @description this method is used to get the booking
     
    */
    getBooking(bookingType, index) 
    {
        
        let booking = bookingType[index]
    
        return booking;
    }
    /**
    * @description this method is used to get the scheduled booking
    * @param{index} index of the booking in the array
    */
    getScheduledBooking(index)
    {
        let booking = this._scheduledBookings[index]

        return booking;
    }
    /**
    * @description this method is used to get the commenced booking
    * @param{index} index of the booking in the array
    */
    getCommencedBooking(index)
    {
        let booking = this._commencedBookings[index]

        return booking;
    }
    /**
    * @description this method is used to get the completed booking
    * @param{index} index of the booking in the array
    */
    getCompletedBooking(index)
    {
        let booking = this._completedBookings[index]

        return booking;
    }
    /**
    * @description this method is used to sort all the bookings into their respective categories
    * of scheduled,commenced and completed 
    */
    sortBooking()
    {
        let currentDate = new Date().toLocaleDateString();
        let eightHours = 28800000;
        currentDate = Date.parse(currentDate) + eightHours;//+8 hours for difference in time zone from UTC to GMT  

        for(let i = 0; i< this._scheduledBookings.length;i++)
        {
            let bookDate = this._scheduledBookings[i].bookingDate;
            bookDate = Date.parse(bookDate);  
            if(bookDate == currentDate)
            {
                this._commencedBookings.push(this._scheduledBookings[i]);
                this._scheduledBookings.splice(i,1);
            }
            else if (bookDate < currentDate)
            {
                this._completedBookings.push(this._scheduledBookings[i]);
                this._scheduledBookings.splice(i,1);
            }

        }
        for(let j =0; j<this._commencedBookings.length;j++)
        {
            let bookDate = this._commencedBookings[j].bookingDate;
            bookDate = Date.parse(bookDate);
            if (bookDate < currentDate)
            {
                this._completedBookings.push(this._commencedBookings[j]);
                this._commencedBookings.splice(j,1);
            }
        }
    }
    /**
    * @description this class is used to change the taxi type of a selected booking
    * @param{object}: index of the booking and taxi type
    */
    changeTaxi(index,taxi)
    {
        let bookedRef = this.getScheduledBooking(index);
        bookedRef.taxiType = taxi;
        bookedRef.findTaxi();
        bookedRef.countFare();
    }
    /**
    * @description this method is used to reform a class from the data in the form of an object
    * @param{dataObject}: data in the form of an object
    */
    fromData(dataObject)
    {
        
        let scheduledBookings = dataObject._scheduledBookings;
        let completedBookings = dataObject._completedBookings;
        let commencedBookings = dataObject._commencedBookings;
        let schedTemp = [];
        let compTemp = [];
        let commencedTemp = [];
        for(let i = 0; i<scheduledBookings.length;i++)
        {
            let newBooking = new Booking();
            newBooking.fromData(scheduledBookings[i]);
            schedTemp.push(newBooking);
        }
        this._scheduledBookings = schedTemp;
        for(let j = 0; j<completedBookings.length;j++)
        {
            let newBooking = new Booking();
            newBooking.fromData(completedBookings[j]);
            compTemp.push(newBooking);
            
        }
        this._completedBookings = compTemp;
        for(let k = 0; k<commencedBookings.length;k++)
        {
            let newBooking = new Booking();
            newBooking.fromData(commencedBookings[k]);
            commencedTemp.push(newBooking);
            
        }
        this._commencedBookings = commencedTemp;
    }
}
 /**
    * @description this method is used to check the local storage if there us data
    * @param{dataObject}: data in the form of an object
    */
function checkStorage(key)
{
    let jsonString = localStorage.getItem(key);
    if (jsonString == null)
    {
        return false;
    } 
    else 
    {
        return true;
    }

}
 /**
    * @description this function is used to update data to local storage
    * @param{key,data}: key associated to local storage and data to be saved
    */
function updateData(key,data)
{
    localStorage.setItem(key,JSON.stringify(data));
}
 /**
    * @description this function is retrieve the data from local storage
    * @param{key}: data in the form of an object
    */
function getData(key)
{
    
    // retrieve data from local storage
    let retrieveData = localStorage.getItem(key) ;
    let data = "";
    // turn the data into object
    try
    {
       data = JSON.parse(retrieveData);
    }
    catch(error)
    {
       data = retrieveData;
    }
    finally
    {
       return data; // will return a string data
    }

}

/**
 * function for the back functions 
 * jump to page that display all page
 */
 function allBookingCardButton()
 {
   window.location.assign("4allBookCard.html");
 }