const AIO_USERNAME = "ducvinh2910";
const AIO_KEY = "aio_zMoY56IEfLbSczn5aaxqXj4uOTmy";
const FEED_NAMES = ["handmade", "light", "pump", "awning", "fan"];

const toggleSwitches = document.querySelectorAll('input[type="checkbox"]');
const rangeSliders = document.querySelectorAll('input[type="range"]');
const rangLabels = document.querySelectorAll(".range-label");

const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const light = document.querySelector(".light");
// const soilMoisture = document.querySelector(".soil-moisture");
// console.log(light);

toggleSwitches.forEach((toggleSwitch, index) => {
  toggleSwitch.addEventListener("change", () => {
    let state;
    if (toggleSwitch.tagName === "INPUT") {
      state = toggleSwitch.checked ? "1" : "0";
    } else {
      state = toggleSwitch.value;
    }
    controlDevice(FEED_NAMES[index], state);
  });
});

rangeSliders.forEach((rangeSlider, index) => {
  rangeSlider.addEventListener("change", () => {
    const value = rangeSlider.value;
    controlDevice(FEED_NAMES[index + toggleSwitches.length], value);
  });
});

function controlDevice(feedName, value) {
  const data = {
    value: value,
  };
w
  axios
    .post(
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-AIO-Key": AIO_KEY,
        },
      }
    )
    .catch((error) => {
      console.error(error);
      alert(`Failed to control device ${feedName}`);
    });
}

function fetchData(feedName) {
  axios
    .get(
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data/last`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-AIO-Key": AIO_KEY,
        },
      }
    )
    .then((response) => {
      const data = response.data;
      console.log(`${feedName}: ${data.value}`);
      if (feedName == "temperature-sensor") {
        temperature.innerHTML = `Nhiệt độ: ${data.value}`;
      } else if (feedName == "humidity-sensor") {
        humidity.innerHTML = `Độ ẩm không khí: ${data.value}`;
      } else if (feedName == "light-sensor") {
        light.innerHTML = `Cường độ ánh sáng: ${data.value}`;
      }
      // else if (feedName == "soil-moisture-sensor") {
      //   soilMoisture.innerHTML = `Độ ẩm đất: ${data.value}`;
      // }
      // Thay console.log bằng hàm hiển thị dữ liệu ra màn hình của bạn nếu cần
    })
    .catch((error) => {
      console.error(error);
      alert(`Failed to fetch data from ${feedName}`);
    });
}

// Gọi fetchData với các feedName cần lấy dữ liệu
fetchData("temperature-sensor");
fetchData("humidity-sensor");
fetchData("light-sensor");
// fetchData("soil-moisture-sensor");

setInterval(() => {
  fetchData("temperature-sensor");
  fetchData("humidity-sensor");
  fetchData("light-sensor");
  // fetchData("Soil_Moisture_Sensor");
}, 5000);
