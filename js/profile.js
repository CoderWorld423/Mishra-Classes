// =====================================
// MISHRA CLASSES PROFILE SYSTEM
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
getDoc,
setDoc

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";








// =====================================
// ELEMENTS
// =====================================


const profileName =
document.getElementById("profileName");


const profileEmail =
document.getElementById("profileEmail");


const nameInput =
document.getElementById("profileNameInput");


const emailInput =
document.getElementById("profileEmailInput");


const classInput =
document.getElementById("profileClass");


const phoneInput =
document.getElementById("profilePhone");


const profileForm =
document.getElementById("profileForm");


const userRole =
document.getElementById("userRole");


const joinDate =
document.getElementById("joinDate");


const logoutBtn =
document.getElementById("logoutBtn");









// =====================================
// LOAD USER PROFILE
// =====================================


onAuthStateChanged(auth, async(user)=>{


if(user){



const userRef =
doc(db,"users",user.uid);



const userSnap =
await getDoc(userRef);





if(userSnap.exists()){


const data =
userSnap.data();





// Display Data


if(profileName){

profileName.innerText =
data.name || "Student";

}



if(profileEmail){

profileEmail.innerText =
data.email;

}





if(nameInput){

nameInput.value =
data.name || "";

}



if(emailInput){

emailInput.value =
data.email || "";

}



if(classInput){

classInput.value =
data.class || "";

}



if(phoneInput){

phoneInput.value =
data.phone || "";

}



if(userRole){

userRole.innerText =
data.role || "student";

}




if(joinDate && data.createdAt){


joinDate.innerText =
data.createdAt.toDate().toLocaleDateString();


}





}



}

else{


window.location.href="login.html";


}



});









// =====================================
// UPDATE PROFILE
// =====================================


if(profileForm){



profileForm.addEventListener(

"submit",

async(e)=>{


e.preventDefault();



const user =
auth.currentUser;



if(!user){

return;

}






try{


await setDoc(

doc(db,"users",user.uid),


{


name:nameInput.value,


class:classInput.value,


phone:phoneInput.value


},


{

merge:true

}


);





alert("Profile Updated Successfully!");





}

catch(error){


alert(error.message);


}



}

);



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