// const axios = require('axios');

const citys = ['القاهرة', 'الشرقية', 'الجيزة', 'الدقهلية', 'الغربية'];
const timingAr = ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء'];
const timingEn = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

const times = document.querySelector('.times');
const selections = document.querySelector('.selection');
const title = document.querySelector('.title');

citys.forEach((city) => {
  selections.innerHTML += `<option class="city">${city}</option>`;
});

title.innerHTML = selections.value;

selections.addEventListener('change', () => {
  title.innerHTML = selections.value;
  getCityTime(selections.value);
});

getCityTime = (city) => {
  axios
    .get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`)
    .then((res) => {
      const dataResponse = res.data.data;
      const timing = dataResponse.timings;

      const timingPray = {
        fajr: castingTime(timing.Fajr),
        dhuhr: castingTime(timing.Dhuhr),
        asr: castingTime(timing.Asr),
        maghrib: castingTime(timing.Maghrib),
        isha: castingTime(timing.Isha),
      };

      times.innerHTML = '';
      timingAr.forEach((item, idx) => {
        times.innerHTML += `
        <div class="time-item  ">
          <h3 class="time-title fs-4">${item}</h3>
          <p class="time">${timingPray[timingEn[idx]]}</p>
        </div>
      `;
      });
      document.querySelector('.day').innerHTML = dataResponse.date.hijri.weekday.ar + ' : ' + dataResponse.date.gregorian.date;
    })
    .catch((error) => console.log(error));
};
getCityTime(citys[0]);

const castingTime = (d) => {
  let time = Number(d.slice(0, 2));
  if (time > 12) return time - 12 + d.slice(2);
  return time + d.slice(2);
};
