const authorName = document.getElementById('author')
const container = document.querySelector(".container")
const greetingText = document.querySelector('.greeting')

// The fetch request from the Unsplash API for the document's background image

    fetch('https://api.unsplash.com/search/photos?query=nature&per_page=20&client_id=RCPdqXnOWsf2C1dFCQlPSmsfwMREmSW-wrETwp7i-qU') 
    .then(response => response.json())
    .then(data => {
        let dataResults = data.results;
        let randomData = Math.floor(Math.random() * dataResults.length)
        container.style.backgroundImage = `url(${dataResults[randomData].urls.full})`
        authorName.textContent = `By: ${dataResults[randomData].user.name}`  
    })
    .catch(error => {
        container.style.backgroundImage = `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzOTE2OTJ8MHwxfHNlYXJjaHwxOHx8bmF0dXJlfGVufDB8fHx8MTY3OTE3NjU2Ng&ixlib=rb-4.0.3&q=80')`
    })

// Setting the time and adding a condition to render the greeting variable based on the time of the day.

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('timeText').textContent = `${currentTime}`
    let greeting;
    let currentHour = new Date().getHours()
    console.log(currentHour)

    if (currentHour >= 00 && currentHour < 6) {
        greeting = "🌚Take charge of your mornings!!!";
    } else if (currentHour >= 6 && currentHour < 12) {
        greeting = "Good morning☀! Today is going to be a great day!";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good afternoon🌞! What a bright and pleasant day!";
    } else if(currentHour >= 18 && currentHour < 21) {
        greeting = "Good evening🌗! Relax and enjoy the calm of a closing day";
    } else {
        greeting = "Good Night😴! Enjoy a cozy night rest!!!";
    } 
    console.log(greeting)
    greetingText.textContent = greeting;
  
// The fetch request call to the Coingecko API. This will render only the price updates for Ethereum.    

fetch('https://api.coingecko.com/api/v3/coins/ethereum')
    .then(response => {
        if (!response.ok) {
            throw Error("Crypto info not available")
        }
        return response.json()
    })
    .then(data => {
        document.getElementById('bitcoin').innerHTML = `
        <img src=${data.image.small} alt="" />
        <p class="coinName">${data.id}</p>`
        document.getElementById('crypto').innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👍: $${data.market_data.high_24h.usd}</p>
        <p>👎: $${data.market_data.low_24h.usd}</p>`
    })
    .catch(err => {
        document.getElementById('bitcoin').textContent = `${err}`
    })

// Request call to the Open Weather API, to get the current waether update for the location tracked by the browser's geolocation

    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=0fa51c81d6335125b76f912569ce927c`)
        .then(response => {
            if (!response.ok) {
                throw Error("weather info not available")
            }
            return response.json()
        })
        .then(data => {
            const weatherIcon =  `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById('weatherInfo').innerHTML = `<img class="icon" src=${weatherIcon} alt="" />
            <p class="temp">${data.main.temp}°</p>`
            document.getElementById('weather').innerHTML += `<p class="city">${data.name}</p>`
        })
        .catch(err => {
            document.getElementById('weather').innerHTML = `${err}`
        })
    });

// Fetch request to the Advice slip API for random quotes.

    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            document.getElementById('adviceText').textContent =
            `Quote #${data.slip.id}: “${data.slip.advice}”`
        })

// using user input value to make fetch request to the Coingecko API

    const searchBtn = document.getElementById('btn');
    const inputVal = document.getElementById('Search');

    searchBtn.addEventListener('click', getByID);
    
    function getByID() {
        let coinName = inputVal.value.toLowerCase();

        fetch(`https://api.coingecko.com/api/v3/coins/${coinName}`)
        .then(response => {
            if (!response.ok) {
                throw Error("Crypto info not available")
            }
            return response.json()
        })
        .then(data => {
            document.querySelector('.livePrice').innerHTML = `
            <div class="topInfo">
            <img src=${data.image.thumb} alt="" />
            <span class='coinName'>${data.id}</span>
            </div>
            <div class="price">
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👍: $${data.market_data.high_24h.usd}</p>
            <p>👎: $${data.market_data.low_24h.usd}</p></div>`
        })
        .catch(err => {
            document.getElementById('bitcoin').textContent = `${err}`
        })
    }