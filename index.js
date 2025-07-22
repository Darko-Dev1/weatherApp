backgroundIMG = ["https://crownpointecommunities.com/wp-content/uploads/2017/06/sky-sunny-clouds-cloudy-scaled.jpg", "https://images.pexels.com/photos/2682122/pexels-photo-2682122.jpeg", "https://images.pexels.com/photos/391522/pexels-photo-391522.jpeg", "https://images.pexels.com/photos/436792/pexels-photo-436792.jpeg?cs=srgb&dl=pexels-dan-hamill-144328-436792.jpg&fm=jpg", "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/noaa-iewhxjjaewy-unsplash-676f3dea13037.jpg?crop=1.00xw:0.846xh;0,0.0367xh&resize=1200:*", "https://images.squarespace-cdn.com/content/v1/63ceaffd33529a45e572bf90/1674497647090-7JRP5KMB2B80P3043HPA/image-asset.jpeg",  "https://www.getinflow.io/cdn-cgi/image/fit=contain,format=auto,width=null/https://cdn.prod.website-files.com/623a0044a408ef57d0c818a3/651db0c5c04672d47996dc9f_less-stressed-nighttime.jpg", "https://guideposts.org/wp-content/uploads/2017/05/full_moon-1024x576.jpg.optimal.jpg"]
let conthour = 0
let srue = 0

let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
async function gettingWeather() {

  let Weather = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=icon_seamless")
  let a = await Weather.json()
  try {
    console.log(a)
  } catch {
    console.error("no work")
  }

  const date = new Date();
  let hoursLeft = []
  let actualMonth = date.getMonth() + 1
  document.getElementById("today").innerText += ":  " + daysOfTheWeek[date.getDay()] + " " + date.getDate() + "/" + actualMonth
  document.getElementById("loading").style.display = "none"
  document.querySelector("main").style.opacity = "100%"
  document.querySelector("#Wweek").style.opacity = "100%"
  document.querySelector("#Wtoday").style.opacity = "100%"
  let Wweek = document.querySelector("#Wweek")
  let weekDayC = 0
  setInterval(() => {
    const date = new Date(); minutes = date.getMinutes(); let hour = date.getHours(); const year = date.getFullYear(); const month = date.getMonth() + 1; const day = date.getDate();
    let fullDate = `${year}-0${month}-${day}T${hour}:00`;

    if (hour.toString().length < 2) {
      fullDate = `${year}-0${month}-${day}T0${hour}:00`;
    } else {
      fullDate = `${year}-0${month}-${day}T${hour}:00`;
    }
    if (a["hourly"]["time"].includes(fullDate) === true) {
      let indexTemp = a["hourly"]["time"].indexOf(fullDate)
      if (minutes.toString().length < 2) {
        minutes = "0" + minutes
      }
      document.querySelector("h1").innerText = `${a["hourly"]["temperature_2m"][indexTemp]}${a["hourly_units"]["temperature_2m"]}`
      if (hour > 5 && hour < 21) {
        if (a["hourly"]["temperature_2m"][indexTemp] < 12 && a["hourly"]["temperature_2m"][indexTemp] > 0) {
          document.querySelector("h4").innerText = `Feels chill at ${hour}:${minutes}`
          document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[1]})`
        } else if (a["hourly"]["temperature_2m"][indexTemp] < 0) {
          document.querySelector("h4").innerText = `Feels cold at ${hour}:${minutes}`
          document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[3]})`
        } else if (a["hourly"]["temperature_2m"][indexTemp] > 20) {
          document.querySelector("h4").innerText = `Feels warm at ${hour}:${minutes}`
          document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[0]})`
        } else {
          document.querySelector("h4").innerText = `Feels okay at ${hour}:${minutes}`
          document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[2]})`
        }
      } else {
        if (a["hourly"]["temperature_2m"][indexTemp] < 12 && a["hourly"]["temperature_2m"][indexTemp] > 0) {
          document.querySelector("h4").innerText = `Feels chill at ${hour}:${minutes}`
          document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[4]})`
        } else if (a["hourly"]["temperature_2m"][indexTemp] < 0) {
          document.querySelector("h4").innerText = `Feels cold at ${hour}:${minutes}`
          document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[5]})`
        } else if (a["hourly"]["temperature_2m"][indexTemp] > 20) {
          document.querySelector("h4").innerText = `Feels warm at ${hour}:${minutes}`
          document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[6]})`
        } else {
          document.querySelector("h4").innerText = `Feels okay at ${hour}:${minutes}`
          document.querySelector("body").style.backgroundImage = `url(${backgroundIMG[7]})`
        }
      }
      const Wtoday = document.getElementById("Wtoday")
      while (hour + conthour <= 23) {
        if (a["hourly"]["time"].includes(`${year}-0${month}-${day}T${hour + conthour}:00`) === true) {
          srue++
        }
        conthour++
        hoursLeft.push(a["hourly"]["time"].indexOf(`${year}-0${month}-${day}T${hour + conthour}:00`))
        let createDay = document.createElement("div")
        if (hour + conthour > 22) {
          createDay.innerHTML = `<h4>${a["hourly"]["temperature_2m"][hour + conthour]}${a["hourly_units"]["temperature_2m"]}</h4></p> <br> <svg stroke="currentColor" fill="yellow" stroke-width="0" viewBox="0 0 512 512" height="1em" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg> <br> ${hour + conthour} : 00`
        } else {
          createDay.innerHTML = `<h4>${a["hourly"]["temperature_2m"][hour + conthour]}${a["hourly_units"]["temperature_2m"]}</h4></p> <br> <svg stroke="currentColor" fill="yellow" stroke-width="0" viewBox="0 0 24 24" height="1em" width="100%" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 4V2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1zm7.36 3.05 1.41-1.42a.996.996 0 1 0-1.41-1.41l-1.41 1.42a.996.996 0 1 0 1.41 1.41zM22 11h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1zm-10 8c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1zM5.64 7.05 4.22 5.64c-.39-.39-.39-1.03 0-1.41s1.03-.39 1.41 0l1.41 1.41c.39.39.39 1.03 0 1.41s-1.02.39-1.4 0zm11.31 9.9a.996.996 0 0 0 0 1.41l1.41 1.41c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.41-1.41a.996.996 0 0 0-1.41 0zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm3.64 6.78 1.41-1.41c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.41 1.41a.996.996 0 0 0 0 1.41c.38.39 1.02.39 1.41 0zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path></svg> <br> ${hour + conthour} : 00`
        }

        document.querySelector("#Wtoday").appendChild(createDay)
        if (hour + conthour === 24) {
          hoursLeft.pop()
          console.log(hoursLeft)
          break
        }
      }

      let keepCountindex = []
      let keepingCounttNightindex = []
      if (weekDayC < 8) {
        for (i of daysOfTheWeek) {
          if (weekDayC < 7) {
            if (weekDayC === 1) {
              let wdiv = document.createElement("div")

              wdiv.setAttribute("class", "wdivs")

              let keepingCountt = a["hourly"]["time"].indexOf(`${year}-0${month}-${day + weekDayC}T${12}:00`)
              let keepingCounttNight = a["hourly"]["time"].indexOf(`${year}-0${month}-${day + weekDayC}T${23}:00`)
              let newday = new Date(`${year}-0${month}-${day + weekDayC}`)
              let wp = document.createElement("h3")
              wp.innerHTML = `Tomorrow: `

              keepCountindex.push(keepingCountt)
              keepingCounttNightindex.push(keepingCounttNight)
              let tempchild = document.createElement("div")
              tempchild.innerHTML = `<div>${a["hourly"]["temperature_2m"][keepCountindex[weekDayC]]} ${a["hourly_units"]["temperature_2m"]} <svg stroke="currentColor" fill="yellow" stroke-width="0" viewBox="0 0 24 24" height="2em" width="100%" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 4V2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1zm7.36 3.05 1.41-1.42a.996.996 0 1 0-1.41-1.41l-1.41 1.42a.996.996 0 1 0 1.41 1.41zM22 11h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1zm-10 8c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1zM5.64 7.05 4.22 5.64c-.39-.39-.39-1.03 0-1.41s1.03-.39 1.41 0l1.41 1.41c.39.39.39 1.03 0 1.41s-1.02.39-1.4 0zm11.31 9.9a.996.996 0 0 0 0 1.41l1.41 1.41c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.41-1.41a.996.996 0 0 0-1.41 0zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm3.64 6.78 1.41-1.41c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.41 1.41a.996.996 0 0 0 0 1.41c.38.39 1.02.39 1.41 0zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path></svg> </div><div>${a["hourly"]["temperature_2m"][keepingCounttNightindex[weekDayC]]} ${a["hourly_units"]["temperature_2m"]} <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg> </div>`

              wdiv.appendChild(wp)
              if (month.toString().length < 2) {
                wp.innerHTML = `Tomorrow: <h5>0${month}-${day + weekDayC}</h5>`
              } else {
                wp.innerHTML = `Tomorrow: <h5> ${month}-${day + weekDayC} </h5>`
              }
              wdiv.appendChild(tempchild)
              Wweek.appendChild(wdiv)
              weekDayC++
            } else if (weekDayC === 0) {
              let wdiv = document.createElement("div")

              wdiv.setAttribute("class", "wdivs")

              let keepingCountt = a["hourly"]["time"].indexOf(`${year}-0${month}-${day + weekDayC}T${12}:00`)
              let keepingCounttNight = a["hourly"]["time"].indexOf(`${year}-0${month}-${day + weekDayC}T${23}:00`)
              let newday = new Date(`${year}-0${month}-${day + weekDayC}`)
              let wp = document.createElement("h3")
              keepCountindex.push(keepingCountt)
              keepingCounttNightindex.push(keepingCounttNight)
              let tempchild = document.createElement("div")
              tempchild.innerHTML = tempchild.innerHTML = `<div>${a["hourly"]["temperature_2m"][keepCountindex[weekDayC]]} ${a["hourly_units"]["temperature_2m"]} <svg stroke="currentColor" fill="yellow" stroke-width="0" viewBox="0 0 24 24" height="2em" width="100%" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 4V2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1zm7.36 3.05 1.41-1.42a.996.996 0 1 0-1.41-1.41l-1.41 1.42a.996.996 0 1 0 1.41 1.41zM22 11h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1zm-10 8c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1zM5.64 7.05 4.22 5.64c-.39-.39-.39-1.03 0-1.41s1.03-.39 1.41 0l1.41 1.41c.39.39.39 1.03 0 1.41s-1.02.39-1.4 0zm11.31 9.9a.996.996 0 0 0 0 1.41l1.41 1.41c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.41-1.41a.996.996 0 0 0-1.41 0zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm3.64 6.78 1.41-1.41c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.41 1.41a.996.996 0 0 0 0 1.41c.38.39 1.02.39 1.41 0zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path></svg> </div><div>${a["hourly"]["temperature_2m"][keepingCounttNightindex[weekDayC]]} ${a["hourly_units"]["temperature_2m"]} <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg> </div>`
              wdiv.appendChild(wp)
              if (month.toString().length < 2) {
                wp.innerHTML = `Today: <h5>0${month}-${day + weekDayC}</h5>`
              } else {
                wp.innerHTML = `Today: <h5> ${month}-${day + weekDayC} </h5>`
              }
              wdiv.appendChild(tempchild)
              Wweek.appendChild(wdiv)
              weekDayC++


            } else {

              let wdiv = document.createElement("div")

              wdiv.setAttribute("class", "wdivs")

              let keepingCountt = a["hourly"]["time"].indexOf(`${year}-0${month}-${day + weekDayC}T${12}:00`)
              let keepingCounttNight = a["hourly"]["time"].indexOf(`${year}-0${month}-${day + weekDayC}T${23}:00`)
              let newday = new Date(`${year}-0${month}-${day + weekDayC}`)
              let wp = document.createElement("h3")

              console.log(keepingCounttNightindex)

              keepCountindex.push(keepingCountt)
              keepingCounttNightindex.push(keepingCounttNight)
              let tempchild = document.createElement("div")
              tempchild.innerHTML = tempchild.innerHTML = `<div>${a["hourly"]["temperature_2m"][keepCountindex[weekDayC]]} ${a["hourly_units"]["temperature_2m"]} <svg stroke="currentColor" fill="yellow" stroke-width="0" viewBox="0 0 24 24" height="2em" width="100%" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 4V2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1zm7.36 3.05 1.41-1.42a.996.996 0 1 0-1.41-1.41l-1.41 1.42a.996.996 0 1 0 1.41 1.41zM22 11h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1zm-10 8c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1zM5.64 7.05 4.22 5.64c-.39-.39-.39-1.03 0-1.41s1.03-.39 1.41 0l1.41 1.41c.39.39.39 1.03 0 1.41s-1.02.39-1.4 0zm11.31 9.9a.996.996 0 0 0 0 1.41l1.41 1.41c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.41-1.41a.996.996 0 0 0-1.41 0zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm3.64 6.78 1.41-1.41c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.41 1.41a.996.996 0 0 0 0 1.41c.38.39 1.02.39 1.41 0zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path></svg> </div><div>${a["hourly"]["temperature_2m"][keepingCounttNightindex[weekDayC]]} ${a["hourly_units"]["temperature_2m"]} <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg> </div>`
              wdiv.appendChild(wp)
              if (month.toString().length < 2) {
                wp.innerHTML = `${daysOfTheWeek[newday.getDay()]}: <h5>0${month}-${day + weekDayC}</h5>`
              } else {
                wp.innerHTML = `${daysOfTheWeek[newday.getDay()]}: <h5> ${month}-${day + weekDayC} </h5>`
              }
              wdiv.appendChild(tempchild)
              Wweek.appendChild(wdiv)
              weekDayC++
            }

          } else {
            return
          }

          console.log(keepCountindex)
        }
      }



    } else {
      console.error("something went wrong")
    }
  }, 500)


  console.log(hoursLeft)

}

document.addEventListener("scroll", (e) => {
  if (window.scrollY > 1) {
    document.querySelector("header").style.opacity = "100%"
  } else {
    document.querySelector("header").style.opacity = "0%"
  }
})

const trigger = document.querySelector(".Desktop")
const cinemati = document.getElementById("cinematic")
const triggerChild = document.querySelector(".DesktopMode")
deskMode.addEventListener("click", ()=> {
  console.log(trigger.classList.toString())
  if (trigger.classList.toString() !== "") {
      trigger.classList.remove("Desktop")
      cinemati.innerHTML = "Desktop Mode"
      console.log(cinemati)
  } else {
    trigger.classList.add("Desktop")
    cinemati.innerHTML = "Cinematic view"
  }
})



setTimeout(a => {
  gettingWeather()
}, 500)





