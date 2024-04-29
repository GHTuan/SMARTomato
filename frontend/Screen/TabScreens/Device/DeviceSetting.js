const mainPath = "http://localhost:4000/"

const TempSetting = {
    'bottomRange': 0,
    'topRange': 100,
    'unitOfMeasure': 'Celsius',
    'title': 'Temperature',
    'text': 'Temperature',
    'api': mainPath + 'temp'
}
const SoilSetting = {
    'bottomRange': 0,
    'topRange': 100,
    'unitOfMeasure': '%',
    'title': 'Soil Moisture',
    'text': 'Soil Moisture',
    'api': mainPath + 'soil'
}
const LightSetting = {
    'bottomRange': 0,
    'topRange': 100,
    'unitOfMeasure': 'Lux',
    'title': 'Light',
    'text': 'Light',
    'api': mainPath + 'light'
}
const HumiditySetting = {
    'bottomRange': 0,
    'topRange': 100,
    'unitOfMeasure': '%',
    'title': 'Humidity',
    'text': 'Humidity',
    'api': mainPath + 'humidity'
}

export {
    TempSetting,
    SoilSetting,
    LightSetting,
    HumiditySetting
}


