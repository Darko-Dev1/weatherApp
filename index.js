backgroundIMG = ["https://crownpointecommunities.com/wp-content/uploads/2017/06/sky-sunny-clouds-cloudy-scaled.jpg", "https://images.report.az/photo/72fc9b61-097b-3493-bb81-e5478bb5c310_850.jpeg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpQvV4WqSJ4sm5snDOi0ysIG1-bEmAmH6Nsg&s", "https://images.pexels.com/photos/436792/pexels-photo-436792.jpeg?cs=srgb&dl=pexels-dan-hamill-144328-436792.jpg&fm=jpg"]
  let conthour = 0
  let srue = 0
async function gettingWeather() {

  console.log("hey")
  let Weather = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=icon_seamless")
  let a = await Weather.json()
  try{
    console.log(a)
  }catch{
    console.error("no work")
  }

  let hoursLeft = []

  document.getElementById("loading").style.display = "none"
  document.querySelector("main").style.opacity = "100%"
  document.querySelector("#Wweek").style.opacity = "100%"
  document.querySelector("#Wtoday").style.opacity = "100%"
  setInterval( () => {  const date = new Date(); minutes = date.getMinutes();   let hour = date.getHours();   const year = date.getFullYear();   const month = date.getMonth() + 1;   const day = date.getDate();       
    let fullDate = `${year}-0${month}-${day}T${hour}:00`;
    if (hour.toString.length < 2) {
      fullDate = `${year}-0${month}-${day}T0${hour}:00`;
    }else {
      fullDate = `${year}-0${month}-${day}T${hour}:00`;
    }
    if (a["hourly"]["time"].includes(fullDate) === true) {
      let indexTemp = a["hourly"]["time"].indexOf(fullDate)
      if (minutes.toString().length < 2) {
        minutes = "0"+minutes
      }
      document.querySelector("h1").innerText = `${a["hourly"]["temperature_2m"][indexTemp]}${a["hourly_units"]["temperature_2m"]}` 
      if(a["hourly"]["temperature_2m"][indexTemp] < 12) {
        document.querySelector("h4").innerText = `Feels chill ${hour}:${minutes}`
        document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[2]})`
      } else if (a["hourly"]["temperature_2m"][indexTemp] < 0){
        document.querySelector("h4").innerText = `Feels cold ${hour}:${minutes}`
        document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[3]})`
      } else if (a["hourly"]["temperature_2m"][indexTemp] > 20) {
        document.querySelector("h4").innerText = `Feels warm ${hour}:${minutes}`
        document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[0]})`
      } else {
        document.querySelector("h4").innerText = `Feels okay ${hour}:${minutes}`
        document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[1]})`
      }
      const Wtoday = document.getElementById("Wtoday")
      while(hour+conthour <= 23) {
        if (a["hourly"]["time"].includes(`${year}-0${month}-${day}T${hour+conthour}:00`) === true) {
          srue++
        }
        conthour++
        hoursLeft.push(a["hourly"]["time"].indexOf(`${year}-0${month}-${day}T${hour+conthour}:00`))
        let createDay = document.createElement("div")
        createDay.innerHTML = `${a["hourly"]["temperature_2m"][hour+conthour]}${a["hourly_units"]["temperature_2m"]} <br> ${hour + conthour} : 00`
        document.querySelector("#Wtoday").appendChild(createDay)
        if (hour+conthour === 24) {
          hoursLeft.pop()
          console.log(hoursLeft)
          break
        }

      }


    } else {
      console.error("something went wrong")
    }
  }, 500)
  
  console.log(hoursLeft)

}




setTimeout(a => {
  gettingWeather()
}, 2000)





