const todayBlock = document.querySelector('.today');
const forecastBlock = document.querySelector('.forecast');

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247+')
.then((response) =>  response.json())
.then((data) => {
    todayWeater(data);
    forecastWeater(data);
})
.catch(errorMessage())

const todayWeater = (data) => {
    const date = new Date();

    const chooseFormat = (time) => {
        return time < 10 ? '0'+ time : time;
    }

    console.log(data.list[0].weather[0].main)
    const template = `
    <div class="city-time">
                <p>${data.city.name}</p>
                <p>${chooseFormat(date.getHours())}:${chooseFormat(date.getMinutes())}</p>
            </div>
            <div class="weather">
                <img src="${setPictureWeather(data.list[0].weather[0].main)}" alt="weather">
                <p>${data.list[0].weather[0].main} </p>
                <p>${(+data.list[0].main.temp-273.15).toFixed(1)}°C</p>
            </div>
            <div class="wind">
                <p>Speed</p>
                <p>${data.list[0].wind.speed} m/s</p>
            </div>
    `
    todayBlock.innerHTML = template;
}

const forecastWeater = (data) => {
    for(let i = 8; i < data.list.length; i+=8){
        const template = `
        <div class="day-weather">
            <div class="box-sizing">
                <p>${data.list[i].dt_txt.slice(0, 10)}</p>
                <p>${data.list[0].dt_txt.slice(11)}</p>
            </div>
            <div class="box-sizing center-img">
                <img src="${setPictureWeather(data.list[i].weather[0].main)}" alt="weather-img">
            </div>
            <p class="box-sizing center-temp">${(+data.list[i].main.temp-273.15).toFixed(1)}°C</p>
        </div>
    `

    forecastBlock.innerHTML += template;
    }
    
}

const setPictureWeather = (weather) => {
    switch (weather) {
        case 'Clouds':
            return './images/clouds-50.png';
            break;

        case 'Clear':
            return './images/sun-50.png';
            break;

            case 'Snow':
        return './images/snow-50.png';
        break;
    
        default:
            break;
    }
}

function errorMessage(){
    todayBlock.innerHTML = `<p>Error</p>`
}