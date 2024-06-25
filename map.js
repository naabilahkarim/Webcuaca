   // Inisialisasi peta menggunakan Leaflet.js
   var map = L.map('map').setView([-2, 117], 5); // Pusat peta dan zoom awal

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
    { name: 'Palembang', lat: -2.9761, lon: 104.7759 },
    { name: 'Tangerang', lat: -6.1783, lon: 106.6313 },
    { name: 'Depok', lat: -6.4025, lon: 106.7942 },
    { name: 'Batam', lat: 1.106, lon: 104.0409 },
    { name: 'Padang', lat: -0.9536, lon: 100.351 },
    { name: 'Bandar Lampung', lat: -5.429, lon: 105.2663 },
    { name: 'Denpasar', lat: -8.6525, lon: 115.2193 },
    { name: 'Banjarmasin', lat: -3.3199, lon: 114.5901 },
    { name: 'Pekanbaru', lat: 0.5071, lon: 101.447 },
    { name: 'Malang', lat: -7.9778, lon: 112.6341 },
    { name: 'Balikpapan', lat: -1.2675, lon: 116.8289 },
    { name: 'Jambi', lat: -1.6115, lon: 103.6158 },
    { name: 'Serang', lat: -6.1153, lon: 106.1541 },
    { name: 'Surakarta', lat: -7.5667, lon: 110.8167 },
    { name: 'Cimahi', lat: -6.872, lon: 107.5425 },
    { name: 'Pontianak', lat: -0.0225, lon: 109.3425 },
    { name: 'Manado', lat: 1.487, lon: 124.8455 },
    { name: 'Bogor', lat: -6.5944, lon: 106.7892 },
    { name: 'Yogyakarta', lat: -7.7956, lon: 110.3695 },
    { name: 'Banda Aceh', lat: 5.548, lon: 95.319 },
    { name: 'Ambon', lat: -3.6954, lon: 128.1832 },
    { name: 'Palu', lat: -0.8986, lon: 119.8707 },
    { name: 'Kupang', lat: -10.1656, lon: 123.6075 },
    { name: 'Mataram', lat: -8.5833, lon: 116.1167 },
    { name: 'Samarinda', lat: -0.5025, lon: 117.1537 },
    { name: 'Ternate', lat: 0.7919, lon: 127.3846 },
    { name: 'Jayapura', lat: -2.5337, lon: 140.7181 },
    { name: 'Sorong', lat: -0.8762, lon: 131.2558 },
    { name: 'Manokwari', lat: -0.8615, lon: 134.0625 },
    { name: 'Biak', lat: -1.1826, lon: 136.0785 },
    { name: 'Merauke', lat: -8.4934, lon: 140.4018 },
    { name: 'Timika', lat: -4.5448, lon: 136.8881 },
    { name: 'Nabire', lat: -3.3627, lon: 135.4978 },
    { name: 'Wamena', lat: -4.1004, lon: 138.9398 },
    { name: 'Fakfak', lat: -2.9244, lon: 132.2956 },
    { name: 'Kaimana', lat: -3.6554, lon: 133.7549 },
    { name: 'Gorontalo', lat: 0.5525, lon: 123.0656 },
    { name: 'Bitung', lat: 1.4456, lon: 125.1825 },
    { name: 'Bau-Bau', lat: -5.4538, lon: 122.6085 },
    { name: 'Luwuk', lat: -0.9516, lon: 122.7875 },
    { name: 'Parepare', lat: -4.0135, lon: 119.6282 },
    { name: 'Tomohon', lat: 1.3245, lon: 124.8391 },
    { name: 'Palangkaraya', lat: -2.2096, lon: 113.9213 },
    { name: 'Tarakan', lat: 3.3131, lon: 117.5912 },
    { name: 'Banjarbaru', lat: -3.4424, lon: 114.8275 },
    { name: 'Bontang', lat: 0.1321, lon: 117.4976 },
    { name: 'Tanjung Selor', lat: 2.8429, lon: 117.3732 },
    { name: 'Singkawang', lat: 0.9092, lon: 108.9841 }
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
                   case 'Sun':
                       weatherIcon = 'sun'; // Cuaca cerah
                       break;
                   case 'Clear':
                        weatherIcon = 'sun'; // Cuaca cerah
                        break;
                   case 'Clouds':
                       weatherIcon = 'clouds'; // Cuaca berawan
                       break;
                   case 'Rain':
                       weatherIcon = 'rain'; // Cuaca hujan
                       break;
                   case 'Haze' :
                        weatherIcon = 'haze'; // Cuaca kabut asap
                        break;
                   case 'Mist' :
                        weatherIcon = 'mist'; // Cuaca lembab
                        break;
                   case 'Thunderstorm' :
                        weatherIcon = 'storm'; // Cuaca hujan petir
                        break;
                   default:
                       weatherIcon = 'question'; // Cuaca tidak terdefinisi
               }
   
               // Tambahkan marker di peta dengan ikon cuaca yang sesuai
               var customIcon = L.icon({
                   iconUrl: `img/${weatherIcon}.png`,
                   iconSize: [50, 50],
                   iconAnchor: [25, 50],
                   popupAnchor: [0, -50]
               });
   
               var marker = L.marker([location.lat, location.lon], { icon: customIcon }).addTo(map);
               marker.bindPopup(`<b>${location.name}</b><br>Cuaca: ${weatherData.weather}`).openPopup();
           });
   });
   