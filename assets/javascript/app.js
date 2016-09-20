$(document).ready(function(){

/*1.start firebase
2.Create click functions for train inputs 
3.
4.
5.
6.
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
	var destination = $('#destinput').val().trim(); 
	/*console.log("time=",$("#timeinput").val().trim());*/
	var firstTrain = moment.unix($("#timeinput").val().trim()).format('HH:mm');
	console.log("minutes=", firstTrain);
	var frequency = $('#frequinput').val().trim(); 
	//Create an object to hold trains data
	var newTrain = {
		train: trainName,
		dest: destination,
		first: firstTrain
		freq: frequency,
		
		
 
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

//
database.ref().on("child_added", function(childSnapshot, prevChildKey){
	//
	var trainName = childSnapshot.val().train; 
	var destination = childSnapshot.val().dest; 
	var frequency = childSnapshot.val().freq; 
	var newArrivals = childSnapshot.val().freq; 
	var trainTime = childSnapshot.val().first;
	//
	console.log(trainName);
	console.log(destination);
	console.log(trainTime);
	console.log(frequency);
	//
	var timeDifference = moment().diff(moment.unix(trainTime), "minutes");
	console.log("time=", timeDifference);
	var minutesAway = frequency - (timeDifference % frequency);
	console.log("second=", minutesAway);
	var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');
	console.log("Next Train: " + nextTrain);


	//
				var newArrivals = $('<tr>');
				var trainNew = $('<td>');
				var destinationNew = $('<td>');
				var frequescyNew = $('<td>');
				nextTrain= $('<td>');
				minutesAway= $('<td>');
				
				
				trainNew.html(trainName);
				destinationNew.html(destination);
				frequescyNew.html(frequency);
				nextTrain.html(newArrivals);
				minutesAway.html(trainTime);
				

				newArrivals.append(trainNew);
				newArrivals.append(destinationNew);
				newArrivals.append(frequescyNew);
				/*newArrivals.append(nextTrain);*/
				newArrivals.append(minutesAway);
				$('#tbody').prepend(newArrivals);


});


});











