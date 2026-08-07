// =====================================
// MISHRA CLASSES MAIN SCRIPT
// =====================================



// =====================================
// MOBILE MENU
// =====================================


const menuBtn =
document.querySelector(".menu-btn");


const nav =
document.querySelector(".navbar nav");



if(menuBtn && nav){


menuBtn.addEventListener("click",()=>{


nav.classList.toggle("active");


});


}









// =====================================
// NAVBAR SCROLL EFFECT
// =====================================


window.addEventListener("scroll",()=>{


const navbar =
document.querySelector(".navbar");



if(navbar){


if(window.scrollY > 50){


navbar.classList.add("scrolled");


}

else{


navbar.classList.remove("scrolled");


}


}



});









// =====================================
// SMOOTH SCROLL
// =====================================


document.querySelectorAll('a[href^="#"]')
.forEach(link=>{


link.addEventListener("click",(e)=>{


const target =
document.querySelector(
link.getAttribute("href")
);



if(target){


e.preventDefault();



target.scrollIntoView({

behavior:"smooth"

});


}



});


});









// =====================================
// LOGIN BUTTON ANIMATION
// =====================================


function openLogin(){



const loginCard =
document.querySelector(".auth-card");



if(loginCard){


loginCard.scrollIntoView({

behavior:"smooth",

block:"center"

});


}




}









// =====================================
// BUTTON RIPPLE EFFECT
// =====================================


document.querySelectorAll("button, .btn-primary")
.forEach(button=>{


button.addEventListener("click",function(e){



this.classList.add("clicked");



setTimeout(()=>{


this.classList.remove("clicked");


},300);



});


});









// =====================================
// CURSOR GLOW EFFECT
// =====================================


const cursorGlow =
document.createElement("div");



cursorGlow.className =
"cursor-glow";



document.body.appendChild(cursorGlow);





document.addEventListener("mousemove",(e)=>{


cursorGlow.style.left =
e.clientX + "px";


cursorGlow.style.top =
e.clientY + "px";


});









// =====================================
// BACK TO TOP BUTTON
// =====================================


const backTop =
document.createElement("button");



backTop.innerHTML =
"↑";


backTop.className =
"back-top";



document.body.appendChild(backTop);





window.addEventListener("scroll",()=>{


if(window.scrollY > 400){


backTop.classList.add("show");


}

else{


backTop.classList.remove("show");


}


});






backTop.addEventListener("click",()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});









// =====================================
// PAGE LOAD ANIMATION
// =====================================


window.addEventListener("load",()=>{


document.body.classList.add("loaded");


});









// =====================================
// CONTACT FORM DEMO
// =====================================


const contactForm =
document.querySelector(".contact-form form");



if(contactForm){



contactForm.addEventListener("submit",(e)=>{


e.preventDefault();



alert(
"Thank you! Your message has been received."
);



contactForm.reset();



});


}