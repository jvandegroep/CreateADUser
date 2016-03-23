var BASEURL = "http://labmgmt.testlab.local:8080/api";

function getData(url,fn){
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
        	fn(xhttp.responseText);
        }
        else {
          console.log("connection failed, showing modal.");
          $("#myModal").modal();
        }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/////////////////////////////////////////////////////////////////////////////////////
//
// Fetch data from /api/queryad API and create a list from data.
//
function refreshList(){
	var url = BASEURL + "/queryad1";
	getData(url,function (data){
		var data2 = JSON.parse(data);
  		console.log("AD group membership data received from URL:", url ,data2);
  	        var l= document.getElementById("lijstje");
          	var i;
          	for(i=0;i< data2.length;i++){
          	    var option = document.createElement("option");
          	    option.text=data2[i];
          	    l.add(option);
  	       }
  });
}

refreshList();


/////////////////////////////////////////////////////////////////////////////////////
//
// delay execution of the RefreshList function
//
function delayRefreshList(){
  setTimeout( function () {
       refreshList();
   } , 1000 );
}


/////////////////////////////////////////////////////////////////////////////////////
//
// Put in dummy data when connection failed.
//
function getDummyData(){
	  var data = [
    "Database Team",
    "Engineering Team",
    "SAN Team",
    "Unix Team",
    "Windows Team"];
		console.log("Dummy data loaded: ",data);
	        var l= document.getElementById("lijstje");
        	var i;
        	for(i=0;i< data.length;i++){
        	    var option = document.createElement("option");
        	    option.text=data[i];
        	    l.add(option);
	        }
}


/////////////////////////////////////////////////////////////////////////////////////
//
// Print function to show input on #statusView element
//
function printStatus(input){
    console.log("Status data received: ", input);
    var para = document.createElement("P");
    var d = new Date();
    var xdate = d.toLocaleDateString();
    var xtime = d.toLocaleTimeString();
    var t = document.createTextNode(xdate + " " + xtime + " - " + input);
    para.appendChild(t);
    document.getElementById("statusView").appendChild(para);
}


/////////////////////////////////////////////////////////////////////////////////////
//
// Gathers input from the preview view and puts a get request to the createADUser API.
// Checks first if the AD account doesn't exist.
// The output is then passed to the 'printStatus' function and gets displayed on page.
//
function createUser(){
  var TuserName = document.getElementById("PrUserName").innerText;
  var TdisplayName = document.getElementById("PrDisplayName").innerText;
  var TemailAddress = document.getElementById("PrEmailAddress").innerText;
  var TfirstName = document.getElementById("firstName").value;
  var TlastName = document.getElementById("lastName").value;
  var Tinitials = document.getElementById("initials").value;
  var x = document.getElementById("lijstje");
  var i = x.selectedIndex;
  var TadGroup = x.options[i].text;

  //check if all the necessary field are filled.
  if ((TuserName === "") || (TdisplayName === "") || (TemailAddress === "") || (TfirstName === "") || (TlastName === "") || (Tinitials === "") || (TadGroup === "")){
    printStatus("Cannot process request, not all field are filled in");
    return;
  }

  printStatus("Processing user request, please note this can take up to one minute..");

  //check if eu account radio button is checked.
  if (document.getElementById('CreateEUaccount').checked) {
    createAdmin();
  }

  var URL4= BASEURL + "/createaduser?TuserName="+TuserName+"&TdisplayName="+TdisplayName+"&TemailAddress="+TemailAddress+"&TfirstName="+TfirstName+"&TlastName="+TlastName+"&Tinitials="+Tinitials+"&TadGroup="+TadGroup;
  console.log("URL", URL4);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          var data9 = xhttp.responseText;
          printStatus(data9);
      }
  };
  xhttp.open("GET", URL4, true);
  xhttp.send();

}

/////////////////////////////////////////////////////////////////////////////////////
//
// Gathers input from the preview view and puts a get request to the createAdminUser API.
// Checks first if the AD account doesn't exist.
// The output is then passed to the 'printStatus' function and gets displayed on page.
//
function createAdmin(){
  var TuserName = document.getElementById("PrEUAccount").innerText;
  var TeuDisplayName = document.getElementById("PrEUDisplayName").innerText;
  var TemailAddress = document.getElementById("PrEmailAddress").innerText;
  var TfirstName = document.getElementById("firstName").value;
  var TlastName = document.getElementById("lastName").value;
  var Tinitials = document.getElementById("initials").value;

  if ((TuserName === "") || (TeuDisplayName === "") || (TemailAddress === "") || (TfirstName === "") || (TlastName === "") || (Tinitials === "")){
    printStatus("Cannot process request, not all field are filled in (Admin)");
    return;
  }

  printStatus("Processing admin user request, please note this can take up to one minute..");

  var URL5= BASEURL + "/createadminuser?TuserName="+TuserName+"&TeuDisplayName="+TeuDisplayName+"&TemailAddress="+TemailAddress+"&TfirstName="+TfirstName+"&TlastName="+TlastName+"&Tinitials="+Tinitials;
  console.log("URL", URL5);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          var data10 = xhttp.responseText;
          printStatus(data10);
      }
  };
  xhttp.open("GET", URL5, true);
  xhttp.send();

}


/////////////////////////////////////////////////////////////////////////////////////
//
// Check username input in active directory and inform the user if the object already exists.
//
function checkUserName(){
  var YUserName = document.getElementById("PrUserName").innerText;
  var URL2= BASEURL + "/queryAdUser?YuserName="+YUserName;
  console.log("URL", URL2);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          var data5 = xhttp.responseText;
          console.log("checkUserName response:", data5);
          if (data5 == "True") {
            //document.getElementById('PrUserName').style.color = "#ff0000";
            document.getElementById('PrUserName').className = "danger";
            document.getElementById('button1').className="btn btn-default disabled";
          }
          if (data5 == "False") {
            document.getElementById('PrUserName').className = "success";
            document.getElementById('button1').className="btn btn-default active";
          }
          if (data5 === null) {
            document.getElementById('PrUserName').className = "";
            document.getElementById('button1').className="btn btn-default disabled";
          }
      }
  };
  xhttp.open("GET", URL2, true);
  xhttp.send();
}


/////////////////////////////////////////////////////////////////////////////////////
//
// Check EU account name input in active directory and inform the user if the object already exists.
//
function checkEUAccount(){
  var VUserName = document.getElementById("PrEUAccount").innerText;
  var URL3= BASEURL + "/queryAdminUser?VuserName="+VUserName;
  console.log("URL", URL3);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          var data6 = xhttp.responseText;
          console.log("checkEUAccount response:", data6);
          if (data6 == "True") {
            document.getElementById('PrEUAccount').className = "danger";
            document.getElementById('button1').className="btn btn-default disabled";
          }
          if (data6 == "False") {
            document.getElementById('PrEUAccount').className = "success";
            document.getElementById('button1').className="btn btn-default active";
          }
          if (data6 === null) {
            document.getElementById('PrEUAccount').className = "";
            document.getElementById('button1').className="btn btn-default disabled";
          }
      }
  };
  xhttp.open("GET", URL3, true);
  xhttp.send();

}


/////////////////////////////////////////////////////////////////////////////////////
//
// Set innerHTMl value of elementByID
//
function setOutput(id,value){
  var el = document.getElementById(id);
  el.innerHTML = value;
}


/////////////////////////////////////////////////////////////////////////////////////
//
// Preview users what their username, email address and displayname is while typing.
//
function PreviewUserInput(){
    var x = document.forms["form1"]["firstName"].value;
    var y = document.forms["form1"]["lastName"].value;
    var z = document.forms["form1"]["initials"].value;

  if (x !== null && x !== "" && y !== null && y !== "" && z !== null && z !== "")
  	  {
          //Format Surname
          var SurNameArray = y.split(" ");
          var SurNameLast = SurNameArray[SurNameArray.length - 1];
          var SurNameLength = SurNameArray.length;
          var XDisplayName;
          var NameAdds;
          var XUserName;
          var FirstNameDots;
          var SurNameDots;
          var XEmailAddress;

          //Create DisplayName
          if (SurNameLength == 1) {
              XDisplayName = SurNameLast + " " + z + " " + "(" + x + ")";
          }
          else if (SurNameLength == 2) {
              NameAdds = SurNameArray[0];
              XDisplayName = SurNameLast + " " + NameAdds + " " + z + " " + "(" + x + ")";
          }
          else if (SurNameLength == 3) {
              NameAdds = SurNameArray[0] + " " + SurNameArray[1];
              XDisplayName = SurNameLast + " " + NameAdds + " " + z + " " + "(" + x + ")";
          }

          //Create Username
          XUserName = SurNameLast + z;

          //Create Email Address
          if (x.indexOf(' ') >= 1) {
          	 FirstNameDots = x.replace(" ",".");
          }
          else {
              FirstNameDots = x;
          }

          if (y.indexOf(' ') >= 1) {
              SurNameDots = y.replace(" ",".");
              XEmailAddress = FirstNameDots + "." + SurNameDots + "@BankTest.com";
          	}
          else {
              XEmailAddress = FirstNameDots + "." + y + "@BankTest.com";
          }

          //Show results in elements
          setOutput('PrDisplayName',XDisplayName);
          setOutput('PrUserName',XUserName);
          setOutput('PrEmailAddress',XEmailAddress);

          //check if EU account is checked, then show preview
          var EUcheckbox = document.getElementById('CreateEUaccount').checked;
          if (EUcheckbox === true) {
              var XEUAccount = SurNameLast + z + ".eu";
              var XEUDisplayName = XDisplayName + " (eu)";
              setOutput('PrEUDisplayName' ,XEUDisplayName);
              setOutput('PrEUAccount',XEUAccount);
          }
          else {
              setOutput('PrEUDisplayName' ,"");
              setOutput('PrEUAccount' ,"");
          }
    }
}
