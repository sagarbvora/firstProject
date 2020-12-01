showTable();
	var addtask = document.getElementById('submit');

	addtask.addEventListener("click",function(){

			var name=document.getElementById('name').value;
			var address=document.getElementById('address').value;
			var country = document.getElementById('country').value; 
		
			var hobbys = [];
			var check = document.querySelectorAll("input[type=checkbox]:checked");
			
			for (var i = 0; i<check.length; i++) {
				hobbys.push(check[i].value);
				
			}

			
			var gender;
			if(document.getElementById('male').checked){
				gender = document.getElementById('male').value;
			}else if(document.getElementById('female').checked){
				gender = document.getElementById('female').value;
			}
			var detail = {
				name:name,
				address:address,
				hobby:hobbys,
				gender:gender,
				country:country
			};
// ------------- get value in localStorage--------------
		let webtask = localStorage.getItem('localtask');
		if (webtask == null) {
			users = [];
		}else{
			users = JSON.parse(webtask);
		}

// ----------- Add and Edit-----------------------------
		if (rowIndex === -1) {
			users.push(detail);
		}else{
			users[rowIndex] = detail;
			document.getElementById('submit').disabled = true;

		}
		localStorage.setItem('localtask',JSON.stringify(users));
		showTable();
		clearData();
		
	})
function clearData(){
		document.getElementById('name').value='';
		document.getElementById('address').value='';
		document.getElementById('Cricket').checked='';
		document.getElementById('Footbol').checked='';
		document.getElementById('male').checked='';
		document.getElementById('female').checked='';
		document.getElementById('country').value='';
}

function showTable(){
	$('#demo').empty();
	var webtask = localStorage.getItem('localtask');
	if (webtask == null) {
		users = [];
	}else{
		users = JSON.parse(webtask);
	}

	var table = document.getElementById('demo');
	var x = users.length;
	for(var i = 0; i<x; i++){
		var row = "<tr>";
		row+="<td>"+[i+1]+"</td>";
		row+="<td>"+users[i].name+"</td>";
		row+="<td>"+users[i].address+"</td>";
		row+="<td>"+users[i].hobby+"</td>";
		row+="<td>"+users[i].gender+"</td>";
		row+="<td>"+users[i].country+"</td>";
		row += "<td><button onclick='EditData("+i+")' id='editbtn' style='background-color:#4CAF50;border:none;border-radius:4px;cursor: pointer;'>Edit</button></td>"; 
		row += "<td><button onclick='DeleteData("+i+")' id='deletebtn' style='background-color:#4CAF50;border:none;border-radius:4px;cursor: pointer;'>Delete</button></td>";
		row+="</tr>";

		$('#demo').append(row);
	}

} 

var rowIndex = -1;
function EditData(index) {

	var webtask = localStorage.getItem('localtask');
	var users = JSON.parse(webtask);
	rowIndex = index;
	var detailObj = users[index];
	document.getElementById('name').value = detailObj.name;
	document.getElementById('address').value = detailObj.address;

	for(var i=0; i<detailObj.hobby.length; i++){
		document.getElementById(detailObj.hobby[i]).checked = true;
	}

	if (detailObj.gender == 'Male') {
		document.getElementById('male').checked = detailObj.gender;
	}else{
		document.getElementById('female').checked = detailObj.gender;
	}

	document.getElementById('country').value = detailObj.country;

	document.getElementById('submit').innerHTML = 'Save';
	document.getElementById('submit').disabled = false;

}
// -----------Delete Data----------------------------------
function DeleteData(index){
	var webtask = localStorage.getItem('localtask');
	var users = JSON.parse(webtask);

	users.splice(index,1);
	localStorage.setItem('localtask',JSON.stringify(users));
	showTable();
}