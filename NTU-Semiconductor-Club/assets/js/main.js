window.addEventListener("scroll",function(){
const nav=document.getElementById("nav");
if(window.scrollY>100){
nav.style.background="#001a38";
}else{
nav.style.background="#03254c";
}
});