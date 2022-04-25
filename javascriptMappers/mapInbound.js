function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    const jsonData = JSON.parse(jsonString);
    const thingId = jsonData.thingId.split(':');
    const value = {
        temperature: {
            properties: {
                value: jsonData.temperature
            }
        },
        humidity: {
            properties: {
                value: jsonData.humidity
            }
        },
        brightness: {
            properties: {
                value: jsonData.brightness
            }
        }
    };
    return Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify','/features', headers, value); }