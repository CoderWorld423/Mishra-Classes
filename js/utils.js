// =====================================
// MISHRA CLASSES UTILITY FUNCTIONS
// =====================================



// =====================================
// SHOW MESSAGE
// =====================================


export function showMessage(message, type="success"){


const box = document.createElement("div");


box.className = `message-box ${type}`;


box.innerText = message;



document.body.appendChild(box);




setTimeout(()=>{


box.remove();


},3000);



}









// =====================================
// LOADING BUTTON
// =====================================


export function setLoading(button, loading=true){



if(!button){

return;

}




if(loading){


button.disabled = true;


button.dataset.text =
button.innerText;


button.innerText =
"Loading...";


}

else{


button.disabled = false;


button.innerText =
button.dataset.text || "Submit";


}



}









// =====================================
// CHECK EMPTY FIELD
// =====================================


export function validateInput(value){


if(!value || value.trim()===""){


return false;


}


return true;


}









// =====================================
// EMAIL VALIDATION
// =====================================


export function validateEmail(email){



const pattern =

/^[^\s@]+@[^\s@]+\.[^\s@]+$/;



return pattern.test(email);



}









// =====================================
// FORMAT DATE
// =====================================


export function formatDate(timestamp){



if(!timestamp){

return "-";

}



return timestamp
.toDate()
.toLocaleDateString("en-IN");



}









// =====================================
// GET CURRENT USER
// =====================================


export function getUserId(auth){



if(auth.currentUser){


return auth.currentUser.uid;


}



return null;



}









// =====================================
// ADMIN CHECK
// =====================================


export function isAdmin(role){



return role === "admin";



}









// =====================================
// PASSWORD CHECK
// =====================================


export function checkPassword(password){



return password.length >= 6;



}









// =====================================
// SCROLL TOP
// =====================================


export function scrollTop(){



window.scrollTo({

top:0,

behavior:"smooth"


});


}









// =====================================
// LOCAL STORAGE
// =====================================


export function saveData(key,value){



localStorage.setItem(

key,

JSON.stringify(value)

);



}





export function getData(key){



const data =
localStorage.getItem(key);



return data ?

JSON.parse(data)

:

null;



}





export function removeData(key){


localStorage.removeItem(key);


}