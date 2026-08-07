// =====================================
// MISHRA CLASSES ADMIN PANEL
// =====================================


import { auth, db } from "./firebase-config.js";



import {

onAuthStateChanged,
signOut

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



import {

collection,
getDocs,
doc,
getDoc,
orderBy,
query

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";







// =====================================
// ELEMENTS
// =====================================


const totalUsers =
document.getElementById("totalUsers");


const studentUsers =
document.getElementById("studentUsers");


const adminUsers =
document.getElementById("adminUsers");


const usersTable =
document.getElementById("usersTable");


const adminEmail =
document.getElementById("adminEmail");


const logoutBtn =
document.getElementById("adminLogout");







// =====================================
// AUTH + ADMIN CHECK
// =====================================


onAuthStateChanged(auth, async(user)=>{


if(!user){


window.location.href="login.html";


return;


}





// Show Email

if(adminEmail){

adminEmail.innerText=user.email;

}






// Check Role


const adminRef =
doc(db,"users",user.uid);



const adminSnap =
await getDoc(adminRef);





if(adminSnap.exists()){


const data =
adminSnap.data();




if(data.role !== "admin"){



alert("Access Denied!");


window.location.href="dashboard.html";


return;


}





loadUsers();



}

else{


window.location.href="dashboard.html";


}



});









// =====================================
// LOAD USERS
// =====================================


async function loadUsers(){



try{


const usersQuery =
query(

collection(db,"users"),

orderBy("createdAt","desc")

);



const snapshot =
await getDocs(usersQuery);





let total = 0;

let students = 0;

let admins = 0;



let rows = "";





snapshot.forEach((item)=>{



const user =
item.data();



total++;




if(user.role === "admin"){

admins++;

}

else{

students++;

}






rows += `

<tr>

<td>
${user.name || "No Name"}
</td>


<td>
${user.email}
</td>


<td>
${user.class || "-"}
</td>


<td>
${user.role || "student"}
</td>


</tr>

`;



});








// Update Cards


if(totalUsers){

totalUsers.innerText = total;

}



if(studentUsers){

studentUsers.innerText = students;

}



if(adminUsers){

adminUsers.innerText = admins;

}







// Update Table


if(usersTable){


usersTable.innerHTML = rows;


}







// Create Chart


createChart(snapshot);



}


catch(error){


console.log(error.message);


}



}









// =====================================
// CHART JS
// =====================================


function createChart(snapshot){



const chartElement =
document.getElementById("userChart");



if(!chartElement){

return;

}





let months = [

"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec"

];





let monthlyData = [

0,0,0,0,0,0,
0,0,0,0,0,0

];







snapshot.forEach((item)=>{


const data =
item.data();



if(data.createdAt){



const date =
data.createdAt.toDate();



const month =
date.getMonth();



monthlyData[month]++;



}



});







new Chart(chartElement, {


type:"bar",


data:{


labels:months,


datasets:[{

label:"New Users",

data:monthlyData


}]


},



options:{


responsive:true,


plugins:{


legend:{


display:true


}


}



}



});




}









// =====================================
// LOGOUT
// =====================================


if(logoutBtn){



logoutBtn.addEventListener(

"click",

async()=>{


await signOut(auth);


window.location.href="login.html";


}


);



}