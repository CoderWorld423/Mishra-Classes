// =====================================
// MISHRA CLASSES DASHBOARD SYSTEM
// =====================================


import { auth, db } from "./firebase-config.js";


import {

onAuthStateChanged,
signOut

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



import {

doc,
getDoc

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";






// =====================================
// GET ELEMENTS
// =====================================


const userName =
document.getElementById("userName");


const userEmail =
document.getElementById("userEmail");


const userClass =
document.getElementById("userClass");


const logoutBtn =
document.getElementById("logoutBtn");









// =====================================
// AUTH CHECK
// =====================================


onAuthStateChanged(auth, async(user)=>{


if(user){



// Show Email

if(userEmail){

userEmail.innerText = user.email;

}





// Get Firestore Data


const userRef =
doc(db,"users",user.uid);



const userSnap =
await getDoc(userRef);





if(userSnap.exists()){


const data =
userSnap.data();




// Name

if(userName){

userName.innerText =
data.name || "Student";

}




// Class

if(userClass){

userClass.innerText =
data.class || "-";

}





}



}

else{


// Not Logged In

window.location.href="login.html";


}



});









// =====================================
// LOGOUT
// =====================================


if(logoutBtn){


logoutBtn.addEventListener("click",async()=>{


try{


await signOut(auth);


window.location.href="login.html";


}


catch(error){


console.log(error.message);


}



});


}