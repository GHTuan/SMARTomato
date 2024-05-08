const mainPath = "http://localhost:4000/"

const TempSetting = {
    'bottomRange': 0,
    'topRange': 100,
    'unitOfMeasure': 'Celsius',
    'title': 'Temperature',
    'text': 'Temperature',
    'api': mainPath + 'temp',
    'device': 'fan'
}
const SoilSetting = {
    'bottomRange': 0,
    'topRange': 100,
    'unitOfMeasure': '%',
    'title': 'Soil Moisture',
    'text': 'Soil Moisture',
    'api': mainPath + 'soil',
    'device': 'pump'
}
const LightSetting = {
    'bottomRange': 0,
    'topRange': 100,
    'unitOfMeasure': 'Lux',
    'title': 'Light',
    'text': 'Light',
    'api': mainPath + 'light',
    'device': 'light'
}
const HumiditySetting = {
    'bottomRange': 0,
    'topRange': 100,
    'unitOfMeasure': '%',
    'title': 'Humidity',
    'text': 'Humidity',
    'api': mainPath + 'humid',
    'device': 'awning'
}

export {
    TempSetting,
    SoilSetting,
    LightSetting,
    HumiditySetting
}


