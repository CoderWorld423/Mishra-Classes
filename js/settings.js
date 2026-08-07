// =====================================
// MISHRA CLASSES SETTINGS SYSTEM
// =====================================


import { auth } from "./firebase-config.js";


import {

onAuthStateChanged,
signOut

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";







// =====================================
// ELEMENTS
// =====================================


const logoutBtn =
document.getElementById("logoutBtn");


const logoutSettings =
document.getElementById("logoutSettings");


const darkModeToggle =
document.getElementById("darkModeToggle");









// =====================================
// AUTH CHECK
// =====================================


onAuthStateChanged(auth,(user)=>{


if(!user){


window.location.href="login.html";


return;


}



console.log(
"Settings User:",
user.email
);



});









// =====================================
// LOGOUT FUNCTION
// =====================================


async function logoutUser(){


try{


await signOut(auth);


window.location.href="login.html";


}

catch(error){


console.log(error.message);


}


}







if(logoutBtn){


logoutBtn.addEventListener(

"click",

logoutUser

);


}





if(logoutSettings){


logoutSettings.addEventListener(

"click",

logoutUser

);


}









// =====================================
// DARK MODE SYSTEM
// =====================================



if(darkModeToggle){



// Load saved theme


const savedTheme =
localStorage.getItem("theme");




if(savedTheme === "dark"){


document.body.classList.add("dark-mode");


darkModeToggle.checked = true;


}







darkModeToggle.addEventListener(

"change",

()=>{



if(darkModeToggle.checked){



document.body.classList.add(
"dark-mode"
);



localStorage.setItem(
"theme",
"dark"
);



}

else{


document.body.classList.remove(
"dark-mode"
);



localStorage.setItem(
"theme",
"light"
);



}



}


);



}