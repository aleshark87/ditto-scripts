//COMMAND TO TEST EXACT THE SAME AS ESP
/*mosquitto_pub -h test.mosquitto.org -t "com.greenhouse/com.project.thesis:greenhouse" -m "{\"thingId\":\"com.project.thesis:greenhouse\",\"temperature\":20.9,\"humidity\":60,\"brightness\":75}"*/
let payload = "{\"thingId\":\"com.project.thesis:greenhouse\",\"temperature\":20.9,\"humidity\":59,\"brightness\":68}";
console.log(payload);
const jsonData = JSON.parse(payload);
const pathTemperature = "/features/temperature/properties/";
const pathHumidity = "/features/humidity/properties/";
const pathBrightness = "/features/brightness/properties/";;
const thingId = jsonData.thingId.split(':');

const valueTemperature = { value: jsonData.temperature }
const valueHumidity = { value: jsonData.temperature }
const valueBrightness = { value: jsonData.brightness }

console.log(jsonData);