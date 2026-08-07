// =====================================
// MISHRA CLASSES ANALYTICS SYSTEM
// =====================================


import { db } from "./firebase-config.js";



import {

collection,
getDocs

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



const chartCanvas =
document.getElementById("userChart");







// =====================================
// LOAD ANALYTICS DATA
// =====================================


async function loadAnalytics(){


try{



const usersSnapshot = 
await getDocs(

collection(db,"users")

);





let total = 0;

let students = 0;

let admins = 0;




let monthlyData = [

0,0,0,0,
0,0,0,0,
0,0,0,0

];





usersSnapshot.forEach((doc)=>{


const user =
doc.data();



total++;





if(user.role === "admin"){


admins++;


}

else{


students++;


}





// Monthly Count


if(user.createdAt){


const date =
user.createdAt.toDate();


const month =
date.getMonth();



monthlyData[month]++;


}




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







// Create Chart


createUserChart(monthlyData);






}

catch(error){


console.log(
"Analytics Error:",
error.message
);


}



}









// =====================================
// CHART JS
// =====================================


function createUserChart(data){



if(!chartCanvas){

return;

}




new Chart(chartCanvas,{


type:"bar",



data:{



labels:[

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

],




datasets:[{


label:"New Users",


data:data



}]


},






options:{


responsive:true,


maintainAspectRatio:false,



plugins:{


legend:{


display:true


}


},



scales:{


y:{


beginAtZero:true


}


}



}



});



}








// =====================================
// START ANALYTICS
// =====================================


loadAnalytics();