const authorName = document.getElementById('author')

fetch(' https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature') 
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        authorName.textContent = `By: ${data.user.name}`
    })

    .catch(error => {
        document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1448518340475-e3c680e9b4be?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTcwNDAxOTA&ixlib=rb-1.2.1&q=80')`
    })

const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
document.getElementById('timeText').textContent = `${currentTime}`

fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
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

    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            document.getElementById('adviceText').textContent =
            `Quote #${data.slip.id}: "${data.slip.advice}"`
            })

    
    
    
    

    

    