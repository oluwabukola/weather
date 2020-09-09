const closeModal = document.querySelector('.close-modal');
const information = document.querySelector('.information');
const input = document.querySelector('input[type=text]');
const submitBtn = document.querySelector('button[type=submit]');
const form = document.querySelector('form');
const abode = document.querySelector('.abode');
const wrapper = document.querySelector('.wrapper');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const description = document.querySelector('.description');
const degree = document.querySelector('.degree p');
const longitude = document.querySelector('.long');
const latitude = document.querySelector('.lat'); 
const apiKey = '5a7e7c0acf4554982a3378c260549c9f';
let inputValue = "";
const kelvin = 273;
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputValue = input.value;
    console.log(inputValue);
    fetchData(inputValue);
    information.style.display = "block";
    wrapper.style.display = "none";
});

closeModal.addEventListener('click', function () {
    information.style.display = "none";
    wrapper.style.display = "block";
})

async function  fetchData() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
        
        const fetchResult = fetch(url);
        const data = await fetchResult;
        if (data.ok) {
            const jsonData = await data.json();
            console.log(jsonData);
            const { lon, lat } = jsonData.coord;
            //set DOM elements from tha api
            let name = jsonData.name;
            let country = jsonData.sys.country;
            abode.innerHTML = `<p> ${name},<span class="country"> ${country} </span></p>`
            description.textContent = jsonData.weather[0].description;
            icon.src = `http://openweathermap.org/img/wn/${jsonData.weather[0].icon}.png`;
            //degree.textContent = jsonData.main.temp;
            let celcius = Math.floor(jsonData.main.temp - kelvin);
            degree.innerHTML = `${celcius}<sup>o</sup><span>C</span>`;
            console.log(country);
            latitude.textContent =  lat;
            longitude.textContent = lon;
            //date
            let now = new Date();
            date.innerHTML = currentDate(now);

            //time
            let clock = new Date();
            time.innerHTML = currentTime(clock);
            console.log(time);

                
       }
       else {
        console.log('error');
       }
}
fetchData();

// date
function currentDate(d) {
    const months = ['January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'];

    const days = ['Sunday','Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday'];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();
    return `${day}, ${month} ${date}, ${year}`;  
}

//time
function currentTime(t) {
    let hour = t.getHours();
    let mins = t.getMinutes();
    let secs = t.getSeconds();
    let am = 'AM';
    if (hour > 11) am = 'PM';
    return `${hour}:${mins}:${secs} ${am}`;
}

//setting up local storage
function getLocalStorage() {
    return localStorage.getItem('data')
        ? JSON.parse(localStorage.getItem('data'))
        : [];
}