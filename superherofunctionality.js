const home_page = document.getElementById("home");
const about_page = document.getElementById("about");
const favourites_page = document.getElementById("favourites");
const search_button = document.getElementsByTagName("button")[0];
const not_found_info = document.getElementById("not-found-info");
const superhero_img = document.getElementsByClassName("card-img")[0];
const name_info = document.getElementsByTagName("p")[0];
const fav_icon = document.getElementById("fav-icon");
const header = document.getElementById("header");
const about_superhero_img = document.getElementsByClassName("about-superhero-img")[0];
const power_stats = document.getElementById("powerstats");
const strength = document.getElementById("strength");
const power = document.getElementById("power");
const speed = document.getElementById("speed");
const intelligence = document.getElementById("intelligence");
const bio = document.getElementById("bio");
const home_nav = document.getElementById("home-nav");
const fav_nav = document.getElementById("fav-nav");
const fav_unfav_info = document.getElementById("fav-unfav-info");
const fav_list =document.getElementById("superhero-card");

var superhero_name = "";
var superhero_powerstats = "";
var superhero_img_url = "";
var superhero_biography = "";
const api = "https://www.superheroapi.com/api.php/877798263154340/search/";




var hero_title = document.getElementById("sh-title");
var fav_img = document.getElementById("fav-img");


about_page.style.display="none";
favourites_page.style.display="none";

//search button is clicked
search_button.addEventListener("click",function(){
    
    superhero_name = document.getElementsByTagName("input")[0].value;
    var req = new XMLHttpRequest();
    req.onload = function(){
        var responseJson = JSON.parse(req.response);
        console.log(responseJson);
        if(responseJson.response==="error"){
            not_found_info.innerHTML="search is not found";
            setTimeout(function(){
                not_found_info.innerHTML="";
            },2000);
        }
        else{
            superhero_img_url = responseJson.results[0].image.url;
            superhero_powerstats = responseJson.results[0].powerstats;
            superhero_biography = responseJson.results[0].biography;
            
            
            superhero_img.style.height="300px";
            superhero_img.style.width="200px";
            
            fav_icon.style.height="20px";
            fav_icon.style.width="20px";
            
            if(localStorage.getItem(superhero_name)==="false" || localStorage.getItem(superhero_name)===null){
                fav_icon.src="assets/star.svg";
                localStorage.setItem(superhero_name,false);
            }
            else {
                fav_icon.src="assets/solid-star.svg";
                localStorage.setItem(superhero_name,true);
            }
            name_info.innerHTML=superhero_name;
            superhero_img.src=superhero_img_url;
        }
    };
    
    req.open("get",api+superhero_name);
    req.send();
});

//superhero-img is clicked
superhero_img.addEventListener("click",function(){
    favourites_page.style.display="none";
    home.style.display="none";
    about_page.style.display="block";
    header.innerHTML=superhero_name;
    about_superhero_img.src=superhero_img_url;
    strength.innerHTML = "Strength : "+superhero_powerstats.strength;
    speed.innerHTML = "Speed : "+superhero_powerstats.speed;
    power.innerHTML = "Power : "+superhero_powerstats.power;
    intelligence.innerHTML = "Intelligence : "+superhero_powerstats.intelligence;
    bio.innerHTML="My full name is "+superhero_biography["full-name"]+". My birth place is "+superhero_biography["place-of-birth"]+". I first appeared in "+superhero_biography["first-appearance"]+".";
});


//home is clicked
home_nav.addEventListener("click",function(){
    favourites_page.style.display="none";
    about_page.style.display="none";
    home_page.style.display="block";
    header.innerHTML="SuperHero Search!"
});





//favourites is clicked
fav_nav.addEventListener("click",function(){
    home_page.style.display="none";
    about_page.style.display="none";
    favourites_page.style.display="block";
    header.innerHTML="Favourites"
});



//fav-img-icon is click
fav_icon.addEventListener("click",function(){
    if(localStorage.getItem(superhero_name)==="false"){
        localStorage.setItem(superhero_name,true);
        fav_icon.src="assets/solid-star.svg";
        fav_unfav_info.innerHTML="Added to Favourites";
        var card_lists = document.createElement("div");
        card_lists.id=superhero_name; 
        card_lists.innerHTML=fav_list.innerHTML;
        favourites_page.appendChild(card_lists);
    }else if(superhero_name!==""){
        localStorage.setItem(superhero_name,false);
        fav_icon.src="assets/star.svg";
        fav_unfav_info.innerHTML="Removed from Favourites";
        for(var i=0;i<favourites_page.childElementCount;i++){
            if(favourites_page.children[i].id===superhero_name)favourites_page.removeChild(favourites_page.children[i]);
        }
    }
    setTimeout(function(){fav_unfav_info.innerHTML="";},500);
});
