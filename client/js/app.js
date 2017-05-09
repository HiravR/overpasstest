/*
*
* Developed By : Hirav Raval
* Date : 5/5/2017
* Input : get a json url 
* Output : display parking data on index.html
* Description: Usinga a json url display the data on index.html page.
*
*Last Edited By: Hirav Raval
*When: 5/8/2017
*Why: found a bug on while loading the data. As data is long enough it was taking a lot of time to load and display. So now displaying 150 at first and adding 150 on a button click.
*
*
*
*
*/


//define global varialbes 

var textHTML="", parking_rate=2.99, keys =[], values=[], parking_data = new JSdict();

//function to get the json data asynchronously. When packet arrives it makes a function call and release the data. 
//Input : url Output : call function.
function getJson(url){
	var resp, xmlHttp ;   

    	//create a new xmlhttp request
        xmlHttp = new XMLHttpRequest();	

        //check if it is not null	
        if(xmlHttp != null){
        	xmlHttp.open('GET',url,true);
        	xmlHttp.send();        	        	
        	try{
        		xmlHttp.onload = function(){        		       			
        				resp=xmlHttp.responseText; 
        				resp = JSON.parse(resp);
        				//send it to the method to assign the data.
        				assignData(resp);         		        		 
        		}; 
        	}catch(e){	
        		console.log("Error : " +e);
        		document.getElementById("parkingDisplay").innerHTML += "<h1> Sorry we are  not able to get the data from third party application.</h1>"; 
        	}	
        }else{
        	console.log("Error in XMLHttpRequest");
        }     
}


//Input : json data. Output : display on page.
function assignData(myData){
	var inDate = new Date(), outDate=new Date();		

	 	//let's sort the date in ascending order.
		myData.sort(function(a,b){
			return a.out - b.out;
		});
		
		//insert tht data in to dictionary
		for (var i=0;i<myData.length;i++){
			parking_data.add(myData[i].license,{'in':myData[i].in,'out':myData[i].out});
		}
     
}

//Input : in and out time. Output : duration. 
function getDuration(inTime,outTime){	
	if(inTime > 0 && outTime > 0){
		if(outTime > inTime){
			var diff = (outTime - inTime)/3600000;
			return Math.round(diff*100)/100;
		}else{
			return 0;
		}
	}else{
		//console.log("Check the dates you have inserted.");
	}
}

//Input : duration. Output : payment price.
function getPrice(duration){
	return Math.round(((duration-1)*parking_rate)*100)/100;
}

//Input : miliseconds. Output : date in a locale String e.g. 05/23/2017 12:30:00 PM
function jsonGetDate(date){
	tempDate = new Date(date);	
	return tempDate.toLocaleString();
}

