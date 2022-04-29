function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    const jsonData = JSON.parse(jsonString);
    const thingId = jsonData.thingId.split(':');
    const pathTemperature = '/features/temperature/properties/';
    const pathHumidity = '/features/humidity/properties/';
    const pathBrightness = '/features/brightness/properties/';
    const valueTemperature = { value: jsonData.temperature };
    const valueHumidity = { value: jsonData.humidity };
    const valueBrightness = { value: jsonData.brightness };
    const dittoProtocolMsgTemperature = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathTemperature, headers, valueTemperature);
    const dittoProtocolMsgHumidity = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathHumidity, headers, valueHumidity);
    const dittoProtocolMsgBrightness = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathBrightness, headers, valueBrightness);
    const array = [dittoProtocolMsgTemperature, dittoProtocolMsgHumidity, dittoProtocolMsgBrightness];
return array; }