let searchbtn = document.querySelector("#searchbtn");
let city = document.querySelector("#city")
let inp = document.querySelector("#inp")
let alert = document.querySelector("#alert")
let icon = document.querySelector("#icon")
let temp = document.querySelector("#temp")
let desc = document.querySelector("#desc")
let windspeed = document.querySelector("#windspeed")
let humidity = document.querySelector("#humidity")
let loading = document.querySelector("#loading");
let locationbtn = document.querySelector("#locationbtn")

locationbtn.addEventListener("click", function(){
     navigator.geolocation.getCurrentPosition(function(position){
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
           getweatherbyloc(lat,lon)
     },
    function(error){
        if(error.code === 1){
        alert.textContent = "Location Permission Denied !!"
        }
        else if(error.code === 2){
        alert.textContent = "Location Unavailable !!"
        }
        else if(error.code === 3){
        alert.textContent = "Permission Request Timeout !!"
        }
        else{
            alert.textContent = "Unknown Location Error !!"
        }
    })
})

 async function getweatherbyloc(lat, lon){
    loading.textContent = "Loading..."
    try{
   const apiKey = "532d130a0810a947e95826e9928e75fc";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
     loading.textContent = ""
    console.log(data);
    if(response.ok){
        displayweather(data);
    }
    else{
        clearweather()
        city.textContent = data.message;
    }
 }
 catch(error){
    console.error(error);
        clearweather();
     loading.textContent = "";
        alert.textContent = "Something Went Wrong !!"
 }
}
 async function getWeather(val) {
    loading.textContent = "Loading..."
    try{
    const apiKey = "532d130a0810a947e95826e9928e75fc";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    loading.textContent = ""
    if(response.ok){
    displayweather(data);
}
    else{
        clearweather();
        city.textContent = data.message
    }
}
    catch(error){
        console.log(error);
       clearweather()
     loading.textContent = "";
        alert.textContent = "Something Went Wrong !!"
    }
}

inp.addEventListener("keyup", function(event){
    if(event.key === "Enter")
    searchbtn.click();
})

searchbtn.addEventListener("click",function(){
    alert.textContent = "";
   const val = inp.value.trim();
   inp.value = "";
    if(val)
     getWeather(val);
    else
    alert.textContent = "NO TEXT FOUND !"
})
function displayweather (data){   
    alert.textContent = "";
    const iconCode = data.weather[0].icon;
    city.textContent = data.name;
    temp.textContent = Math.round(data.main.temp)+"°C"
    const description = data.weather[0].description;
desc.textContent =
    description.charAt(0).toUpperCase() + description.slice(1);
    windspeed.textContent = `${data.wind.speed} m/s`
   humidity.textContent = `Humidity: ${data.main.humidity}%`;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }

function clearweather(){
    city.textContent = "";
    temp.textContent = "";
    desc.textContent = "";
    windspeed.textContent = "";
    humidity.textContent = "";
    icon.src = "";
}