document.getElementById('weather-form-search').addEventListener('submit', function(e) {
    e.preventDefault();

    const city = document.getElementById('city-input').value;
    const apiKey = '98bfeded838f3d9b711f4440b239d3a2';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Kota tidak ditemukan');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('city-name').textContent = `Kota: ${data.name}`;
            document.getElementById('temperature').textContent = `Suhu: ${data.main.temp}°C`;
            document.getElementById('weather').textContent = `Cuaca: ${data.weather[0].description}`;
            document.getElementById('wind-speed').textContent = `Kecepatan Angin: ${data.wind.speed} m/s`;
            document.getElementById('weather-result').style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
            document.getElementById('weather-result').style.display = 'none';
        });
});


// Daftar teks yang akan diketikkan
// Daftar teks yang akan diketikkan
const textToType = "⛅ Cek Cuaca Di Kota Anda ⛅";

// Inisialisasi indeks karakter saat ini
let currentIndex = 0;

// Fungsi untuk menambahkan karakter ke elemen dengan efek ketikan
function typeNextCharacter() {
    const headerTextElement = document.getElementById('header-text');
    headerTextElement.textContent += textToType[currentIndex];
    currentIndex++;
    // Memeriksa apakah sudah mencapai akhir teks
    if (currentIndex < textToType.length) {
        // Jeda sebelum mengetik karakter berikutnya
        setTimeout(typeNextCharacter, 100);
    }
}

// Memulai efek ketikan saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    typeNextCharacter();
});

// Inisialisasi peta menggunakan Leaflet.js
var map = L.map('map').setView([0, 0], 2); // Pusat peta dan zoom awal

// Tambahkan layer peta dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Array lokasi kota atau wilayah yang ingin dicek cuacanya
var locations = [
    { name: 'Jakarta', lat: -6.2088, lon: 106.8456 },
    { name: 'Surabaya', lat: -7.2575, lon: 112.7521 },
    { name: 'Bandung', lat: -6.9175, lon: 107.6191 },
    { name: 'Medan', lat: 3.5952, lon: 98.6722 },
    { name: 'Makassar', lat: -5.1477, lon: 119.4327 },
    { name: 'Semarang', lat: -6.9667, lon: 110.4167 },
    { name: 'Palembang', lat: -2.9761, lon: 104.7759 },
    // Tambahkan lokasi lainnya sesuai kebutuhan
];

// Fungsi untuk mendapatkan data cuaca dari API OpenWeatherMap
function getWeatherData(lat, lon) {
    var apiKey = '98bfeded838f3d9b711f4440b239d3a2';
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    // Kirim permintaan GET ke API
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            return {
                city: data.name,
                weather: data.weather[0].main // Ambil kondisi cuaca utama
            };
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Loop untuk memeriksa setiap lokasi
locations.forEach(location => {
    // Panggil fungsi getWeatherData untuk setiap lokasi
    getWeatherData(location.lat, location.lon)
        .then(weatherData => {
            // Tentukan ikon cuaca berdasarkan kondisi cuaca
            var weatherIcon;
            switch (weatherData.weather) {
                case 'Cuaca Cerah':
                    weatherIcon = 'sun'; // Cuaca cerah
                    break;
                case 'Cuaca Berawan':
                    weatherIcon = 'cloud'; // Cuaca berawan
                    break;
                case 'Cuaca Hujan':
                    weatherIcon = 'rain'; // Cuaca hujan
                    break;
                default:
                    weatherIcon = 'question'; // Cuaca tidak terdefinisi
            }

            // Tambahkan marker di peta dengan ikon cuaca yang sesuai
            var customIcon = L.icon({
                iconUrl: `icons/${weatherIcon}.png`,
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [0, -50]
            });

            var marker = L.marker([location.lat, location.lon], { icon: customIcon }).addTo(map);
            marker.bindPopup(`<b>${location.name}</b><br>Cuaca: ${weatherData.weather}`).openPopup();
        });
});