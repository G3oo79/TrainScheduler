$(document).ready(function(){
/*1.start firebase
2.Create variable and assing fire base database 
3.create click event, use methods .val . trim
4.create object to hold trains data and push to firebase
5.pull data from firebase by using childSnapshot and put it into the html using the .html and 
the .append method
*/

var config = {
    apiKey: "AIzaSyDF1LzohbYYdvw4Mm-1Vd3OF8pXH1ks6w8",
    authDomain: "train-schedule-6296f.firebaseapp.com",
    databaseURL: "https://train-schedule-6296f.firebaseio.com",
    storageBucket: "train-schedule-6296f.appspot.com",
    messagingSenderId: "762916237990"
  };
  firebase.initializeApp(config);
//variable created to refence firebase
var database = firebase.database();

//click funtions for train schedule input
$("#search").on("click", function() {
	//capturing user inputs
	var trainName = $('#traininput').val().trim(); 
	//
	var destination = $('#destinput').val().trim(); 
	/*console.log("time=",$("#timeinput").val().trim());*/

	var firstTrain = $("#timeinput").val().trim();
	var firstTrain = moment.unix().format("HH:mm");
	/*console.log("**********************************")
	console.log("minutes=", firstTrain);*/
	var frequency = $('#frequinput').val().trim(); 
	alert("congrats");

	console.log(frequency);
	/*Create an object to hold trains data*/
	var newTrain = {
		'train': trainName,
		'dest': destination,
		'first': firstTrain,
		'freq': frequency
		
		
 
	}

	


//pushes train info into the database
	database.ref().push(newTrain);

	//console log making sure it is working as intended
	console.log(newTrain.train);
	console.log(newTrain.dest);
	console.log(newTrain.first);
	console.log(newTrain.freq);

	//clear input boxes
	$("#traininput").val("");
	$("#destinput").val("");
	$("#timeinput").val("");
	$("#frequinput").val("");

	return false;

	
	});
//create a refresh function for 1 minute fail attempt
setInterval(function(){ 
    var currentdate = new Date(); 
    var bro = currentdate.getSeconds();
   /* console.log(bro);*/

}, 1000);

//pulling data from firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey){
	//
	var trainName = childSnapshot.val().train; 
	var destination = childSnapshot.val().dest; 
	var frequency = childSnapshot.val().freq; 
	
	//
	/*console.log(trainName);
	console.log(destination);
	console.log(trainTime);
	console.log(frequency);*/
	//create a function that refreshes every minute grab var from top example trainName
	var timeDifference = moment().diff(moment.unix(frequency), "minutes");
	var trainTime = moment(trainTime, 'HH:MM A')
	// console.log("time=", timeDifference);
	var minutesAway = frequency - (timeDifference % frequency);
	/*console.log("second=", minutesAway);*/
	var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');
	

	//adding to Html.
				var newArrivals = $('<tr>');
				var trainNew = $('<td>');
				var destinationNew = $('<td>');
				var frequescyNew = $('<td>');
				var newpotato= $('<td>');
				var newMinutes= $('<td>');
				
				
				trainNew.html(trainName);
				destinationNew.html(destination);
				frequescyNew.html(frequency);
				newpotato.html(nextTrain);
				newMinutes.html(minutesAway);
				

				newArrivals.append(trainNew);
				newArrivals.append(destinationNew);
				newArrivals.append(frequescyNew);
				newArrivals.append(newpotato);
				newArrivals.append(newMinutes);
				$('#tbody').prepend(newArrivals);


});


});











