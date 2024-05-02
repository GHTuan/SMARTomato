const AIO_USERNAME = "ducvinh2910";
const AIO_KEY = "aio_zMoY56IEfLbSczn5aaxqXj4uOTmy";
const FEED_NAMES = ["handmade", "light", "pump", "awning", "fan"];

async function controlDevice(feedName, value) {
  const result = await fetch(`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-AIO-Key": AIO_KEY,
    },
    body: JSON.stringify({
      value: value,
    })
  })
  const data = await result.json();
  return data.value;   
}

async function fetchData(feedName) {
  // console.log("Fetch data from : " + feedName);
    const result = await fetch(
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data/last`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AIO-Key": AIO_KEY,
        },
      }
    )
    const data = await result.json();
    return data.value;    
}

module.exports = {fetchData, controlDevice}
