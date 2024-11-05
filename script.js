function getWeather() {
    const SearchCity = document.querySelector('input').value;
    const API_KEY = '571298107b41316be2b514c5808839ee';

    const City = document.querySelector('.city');
    const Timezone = document.querySelector('.timezone');
    const Icon = document.querySelector('.icon');
    const Degree = document.querySelector('.degree');
    const Main = document.querySelector('.main');
    const Min = document.querySelector('.min');
    const Max = document.querySelector('.max');
    const body = document.body; 

    if (SearchCity.trim().length !== 0) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${SearchCity}&appid=${API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                let date = new Date();
                let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];

                let day = days[date.getDay()];
                let month = months[date.getMonth()];
                let dayOfMonth = date.getDate();

                let formattedDate = `${day}, ${month} ${dayOfMonth}, ${date.getFullYear()}`;

                City.innerHTML = data.name;
                Degree.innerHTML = `${(data.main.temp - 273.15).toFixed(2)} °C`;
                Min.innerHTML = `${(data.main.temp_min - 273.15).toFixed(2)} °C`;
                Max.innerHTML = `${(data.main.temp_max - 273.15).toFixed(2)} °C`;
                Main.innerHTML = data.weather[0].main;
                Timezone.innerHTML = formattedDate;

                let bgImageUrl;
                if (data.weather[0].main === 'Clouds') {
                    Icon.innerHTML = '☁️';
                    bgImageUrl = "cloudy,jpg";
                } else if (data.weather[0].main === 'Rain') {
                    Icon.innerHTML = '⛈';
                    bgImageUrl = "rain.jpg";
                } else if (data.weather[0].main === 'Clear') {
                    Icon.innerHTML = '☀️';  
                    bgImageUrl = "sun.jpg";
                } else if (data.weather[0].main === 'Snow') {
                    Icon.innerHTML = '❄️';
                    bgImageUrl = "snow.jpg";
                }else if (data.weather[0].main === 'Mist') {
                    Icon.innerHTML = '🌫️';
                    bgImageUrl = "mist.jpg";
                }else if (data.weather[0].main === 'Mist') {
                    Icon.innerHTML = '🌫️';
                    bgImageUrl = "foggy.jpg";
                }
                
                body.style.backgroundImage = `url('${bgImageUrl}')`;
                body.style.backgroundPosition = "center";
                body.style.backgroundRepeat = "no-repeat";
                body.style.backgroundSize = "cover";
            })
            .catch(error => {
                console.error(error);
                alert('This City Do Not Exist Or You Wrote It Incorrectly Bruh');
            });
    } else {
        alert('Please enter a city');
    }
}




