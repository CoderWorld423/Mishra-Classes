// =====================================
// MISHRA CLASSES AUTH SYSTEM
// FIXED PROFESSIONAL VERSION
// PART 1
// =====================================


import { auth, db } from "./firebase-config.js";


import {

createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
signOut,
onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


import {

doc,
setDoc,
getDoc,
serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


console.log("AUTH JS CONNECTED");



// =====================================
// MESSAGE SYSTEM
// =====================================


function showMessage(id,text,type="error"){

const box=document.getElementById(id);

if(!box) return;

box.className="message "+type;

box.innerText=text;

}




// =====================================
// GOOGLE PROVIDER
// =====================================


const googleProvider = new GoogleAuthProvider();




// =====================================
// SIGNUP
// =====================================


const signupForm=document.getElementById("signupForm");


if(signupForm){


signupForm.addEventListener("submit",async(e)=>{


e.preventDefault();



const name=
document.getElementById("signupName").value.trim();


const email=
document.getElementById("signupEmail").value.trim();


const password=
document.getElementById("signupPassword").value;


const confirmPassword=
document.getElementById("confirmPassword").value;


const studentClass=
document.getElementById("studentClass").value;




if(password !== confirmPassword){

showMessage(
"signupMessage",
"❌ Password does not match"
);

return;

}




try{


const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);



const user=userCredential.user;



await setDoc(

doc(db,"users",user.uid),

{

uid:user.uid,

name:name,

email:email,

class:studentClass,

role:"student",

createdAt:serverTimestamp()

}

);



showMessage(
"signupMessage",
"✅ Account Created Successfully",
"success"
);



setTimeout(()=>{

window.location.href="dashboard.html";

},1000);



}



catch(error){


console.error(error);



switch(error.code){


case "auth/email-already-in-use":

showMessage(
"signupMessage",
"❌ This email is already registered"
);

break;



case "auth/password-does-not-meet-requirements":

showMessage(
"signupMessage",
"❌ Password must contain uppercase letter and special character"
);

break;



case "auth/weak-password":

showMessage(
"signupMessage",
"❌ Password is too weak"
);

break;



case "auth/invalid-email":

showMessage(
"signupMessage",
"❌ Invalid email address"
);

break;



default:

showMessage(
"signupMessage",
error.message
);


}



}



});


}






// =====================================
// LOGIN
// =====================================


const loginForm=
document.getElementById("loginForm");


if(loginForm){


loginForm.addEventListener("submit",async(e)=>{


e.preventDefault();



const email=
document.getElementById("loginEmail").value.trim();



const password=
document.getElementById("loginPassword").value;




try{


const result=

await signInWithEmailAndPassword(

auth,
email,
password

);



const user=result.user;



const userDoc=

await getDoc(

doc(db,"users",user.uid)

);



showMessage(
"loginMessage",
"✅ Login Successful",
"success"
);



setTimeout(()=>{


if(userDoc.exists()){


const data=userDoc.data();



if(data.role==="admin"){


window.location.href="admin.html";


}

else{


window.location.href="dashboard.html";


}


}

else{


window.location.href="dashboard.html";


}


},800);



}



catch(error){


console.error(error);



switch(error.code){


case "auth/invalid-credential":

showMessage(
"loginMessage",
"❌ Incorrect email or password"
);

break;



case "auth/user-not-found":

showMessage(
"loginMessage",
"❌ Account not found"
);

break;



case "auth/invalid-email":

showMessage(
"loginMessage",
"❌ Invalid email"
);

break;



default:

showMessage(
"loginMessage",
error.message
);


}



}



});


}


// =====================================
// GOOGLE LOGIN / SIGNUP
// PART 2
// =====================================


let googleLoading = false;


async function googleAuth(){


if(googleLoading) return;


googleLoading = true;


try{


const result = await signInWithPopup(

auth,
googleProvider

);



const user = result.user;



const userRef = doc(

db,
"users",
user.uid

);



const userSnap = await getDoc(userRef);



if(!userSnap.exists()){


await setDoc(

userRef,

{

uid:user.uid,

name:user.displayName || "Google User",

email:user.email,

role:"student",

createdAt:serverTimestamp()

}

);


}



showMessage(
"loginMessage",
"✅ Google Login Successful",
"success"
);



setTimeout(()=>{

window.location.href="dashboard.html";

},800);



}



catch(error){


console.error(error);



if(error.code==="auth/cancelled-popup-request"){

showMessage(
"loginMessage",
"⚠️ Google login already running"
);

}

else if(error.code==="auth/popup-closed-by-user"){


showMessage(
"loginMessage",
"❌ Google login cancelled"
);


}

else{


showMessage(
"loginMessage",
error.message
);


}



}


finally{


googleLoading=false;


}



}






// Google Login Button


const googleLogin =
document.getElementById("googleLogin");


if(googleLogin){


googleLogin.addEventListener(
"click",
(e)=>{


e.preventDefault();

googleAuth();


}

);


}




// Google Signup Button


const googleSignup =
document.getElementById("googleSignup");


if(googleSignup){


googleSignup.addEventListener(
"click",
(e)=>{


e.preventDefault();

googleAuth();


}

);


}







// =====================================
// LOGOUT
// =====================================



const logoutButtons=[

document.getElementById("logoutBtn"),

document.getElementById("adminLogout"),

document.getElementById("logoutSettings")

];



logoutButtons.forEach((btn)=>{


if(btn){


btn.addEventListener(

"click",

async()=>{


await signOut(auth);


window.location.href="login.html";


}

);


}


});







// =====================================
// AUTH STATE CHECK
// =====================================



onAuthStateChanged(auth,(user)=>{


if(user){


console.log(
"Current User:",
user.email
);


}

else{


console.log(
"No User Login"
);


}


});








// =====================================
// PASSWORD SHOW / HIDE
// =====================================



function setupPasswordToggle(inputId,iconId){


const input =
document.getElementById(inputId);


const icon =
document.getElementById(iconId);



if(!input || !icon) return;



icon.addEventListener(
"click",
()=>{


if(input.type==="password"){


input.type="text";


icon.classList.remove(
"fa-eye"
);


icon.classList.add(
"fa-eye-slash"
);



}

else{


input.type="password";


icon.classList.remove(
"fa-eye-slash"
);


icon.classList.add(
"fa-eye"
);



}


}

);


}




setupPasswordToggle(
"signupPassword",
"toggleSignupPassword"
);



setupPasswordToggle(
"confirmPassword",
"toggleConfirmPassword"
);



setupPasswordToggle(
"loginPassword",
"toggleLoginPassword"
);