// Copyright 2024 Sabrina Ferreira Lins Couto
// Licensed under the MIT License.

const apiKey = 'WD3HNYY2JPHR'; // sua chave do TimeZoneDB
let selectedZone = null;
let offsetSeconds = 0;

function formatTime(n) {
  return n < 10 ? `0${n}` : n;
}

function updateClock() {
  const nowUTC = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
  const local = new Date(nowUTC.getTime() + offsetSeconds * 1000);

  const hr = formatTime(local.getHours());
  const min = formatTime(local.getMinutes());
  const s = formatTime(local.getSeconds());
  const dia = formatTime(local.getDate());
  const mes = formatTime(local.getMonth() + 1);
  const ano = local.getFullYear();

  document.getElementById("div_relogio").innerHTML = `${hr}:${min}:${s}<br><span class="data">${dia}/${mes}/${ano}</span>`;
}

setInterval(updateClock, 1000);

// Mapeamento de país para coordenadas aproximadas
const countryCoords = {
  "Brazil": [-15.793889, -47.882778],
  "United States": [38.89511, -77.03637],
  "Canada": [45.4215, -75.699],
  "Mexico": [19.4326, -99.1332],
  "Argentina": [-34.6037, -58.3816],
  "United Kingdom": [51.5074, -0.1278],
  "Germany": [52.52, 13.405],
  "France": [48.8566, 2.3522],
  "Spain": [40.4168, -3.7038],
  "Italy": [41.9028, 12.4964],
  "Portugal": [38.7169, -9.1399],
  "South Africa": [-26.2041, 28.0473],
  "Russia": [55.7558, 37.6173],
  "India": [28.6139, 77.209],
  "China": [39.9042, 116.4074],
  "Japan": [35.6895, 139.6917],
  "South Korea": [37.5665, 126.978],
  "Australia": [-33.8688, 151.2093],
  "New Zealand": [-41.2865, 174.7762],
  "Indonesia": [-6.2088, 106.8456],
  "Saudi Arabia": [24.7136, 46.6753],
  "United Arab Emirates": [25.2048, 55.2708],
  "Nigeria": [9.0579, 7.4951],
  "Egypt": [30.0444, 31.2357],
  "Turkey": [41.0082, 28.9784]
};

async function getTimeZone(lat, lng) {
  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status === "OK") {
    selectedZone = data.zoneName;
    offsetSeconds = data.gmtOffset;
    document.getElementById("resultado").textContent = `Fuso horário: ${data.zoneName} (${data.abbreviation}) - Hora local: ${data.formatted}`;
  } else {
    document.getElementById("resultado").textContent = `Erro: ${data.message}`;
  }
}

function handleZoneChange() {
  const selected = document.getElementById("timezone-select").value;
  if (selected && countryCoords[selected]) {
    const [lat, lng] = countryCoords[selected];
    getTimeZone(lat, lng);
  }
}