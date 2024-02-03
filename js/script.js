// const axios = require('axios');

const citys = ['القاهرة', 'الشرقية', 'الجيزة', 'الدقهلية', 'الغربية'];
const dayOfMonth = new Date().getDate();
const times = document.querySelector('.times');
let selections = document.querySelector('.selection');
citys.forEach((city) => {
  selections.innerHTML += `<option class="city" value=${city} >${city}</option>`;
});

selections.addEventListener('change', () => {
  const month = new Date().getMonth();
  document.querySelector('.title').innerHTML = selections.value;
  getCityTime(selections.value, month);
});

getCityTime = (city, month) => {
  axios
    .get(`http://api.aladhan.com/v1/calendarByCity/2024/${month}?city=${city}&country=egypt&method=5`)
    .then((res) => {
      const timing = res.data.data[dayOfMonth - 1].timings;
      const keysOfTiming = Object.keys(res.data.data[dayOfMonth - 1].timings);
      console.log(timing);
      times.innerHTML = '';
      keysOfTiming.forEach((item) => {
        times.innerHTML += `
        <div class="time-item  ">
          <h3 class="time-title fs-4">${item}</h3>
          <p class="time">${timing[item].slice(0, 5)}</p>
        </div>
      `;
      });
    })
    .catch((error) => console.log(error));
  console.log();
};
document.querySelector('.title').innerHTML = selections.value;
document.querySelector('.day').innerHTML = new Date().toLocaleDateString();
getCityTime('القاهرة', 2);
