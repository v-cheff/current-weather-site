let form = document.forms[0];
let input = form.firstElementChild;

let q = "Lipetsk";

function getWeather() {
  let appId = "b03a2cfad336d11bd9140ffd92074504";
  let units = "metric";

  let data = "?q=" + encodeURIComponent(q) + "&appid=" + appId + "&units=" + units;

  let xhr;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP")
  }

  xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast" + data)
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      let res = JSON.parse(xhr.response);
      console.log(res)
      
      let date = new Date(res.list[0].dt * 1000);

      city.innerText = res.city.name;
      dateNow.innerText = date.toLocaleDateString();
      how.innerText = res.list[0].weather[0].main
      imgNow.src = "http://openweathermap.org/img/wn/" + res.list[0].weather[0].icon + "@2x.png"
      tempNowNumber.textContent = Math.floor(res.list[0].main.temp)
      minTemp.innerText = Math.floor(res.list[0].main.temp_min);
      maxTemp.innerText = Math.floor(res.list[0].main.temp_max);
      windNow.innerText = Math.floor(res.list[0].wind.speed);

      switch(date.getDay()) {
        case 1: dayOfWeek.innerText = "Monday"; break;
        case 2: dayOfWeek.innerText = "Tuesday"; break;
        case 3: dayOfWeek.innerText = "Wednesday"; break;
        case 4: dayOfWeek.innerText = "Thursday"; break;
        case 5: dayOfWeek.innerText = "Friday"; break;
        case 6: dayOfWeek.innerText = "Saturday"; break;
        case 7: dayOfWeek.innerText = "Sunday";
      }

      for(let i = 0; i < 6; i++) {
        let time = document.querySelector(`#time${i+1}`)
        time.innerText = new Date(res.list[i].dt * 1000).getHours() + ":00";
        
        let img = document.querySelector(`#img${i+1}`)
        img.src = "http://openweathermap.org/img/wn/" + res.list[i].weather[0].icon + "@2x.png"
        
        let how = document.querySelector(`#how${i+1}`)
        how.innerText = res.list[i].weather[0].main;
        
        let temp = document.querySelector(`#temp${i+1}`)
        temp.innerText = Math.floor(res.list[i].main.temp);
        
        let wind = document.querySelector(`#wind${i+1}`)
        wind.innerText = Math.floor(res.list[i].wind.speed);
      }
    } 
    if(xhr.status == 404) {
      window.location.href = "404.html"
    }
  }
  xhr.send();
}

getWeather();

form.addEventListener("submit", function(e) {
  e.preventDefault();
  q = input.value;
  getWeather();
})


