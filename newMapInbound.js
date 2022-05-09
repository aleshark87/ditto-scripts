function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    const jsonData = JSON.parse(jsonString);
    const thingId = jsonData.thingId.split(':');
    const type = jsonData.type;
    if(type == 'update'){
        const pathTemperature = '/features/temperature/properties/';
        const pathHumidity = '/features/humidity/properties/';
        const pathBrightness = '/features/brightness/properties/';
        const pathLight = '/features/light/properties/';
        const valueTemperature = { value: jsonData.temperature };
        const valueHumidity = { value: jsonData.humidity };
        const valueBrightness = { value: jsonData.brightness };
        const valueLight = { value: jsonData.light };
        const dittoProtocolMsgTemperature = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathTemperature, headers, valueTemperature);
        const dittoProtocolMsgHumidity = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathHumidity, headers, valueHumidity);
        const dittoProtocolMsgBrightness = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathBrightness, headers, valueBrightness);
        const dittoProtocolMsgLight = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathLight, headers, valueLight);
        const array = [dittoProtocolMsgTemperature, dittoProtocolMsgHumidity, dittoProtocolMsgBrightness, dittoProtocolMsgLight];
        return array;
    }
    else{
        const valueMsg = 'ciao' ;
        const headersMsg = {'content-type': 'text/plain'};
        const dittoProtocolEvent = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'live', 'messages', 'high_temperature', 'outbox/messages/high_temperature', headersMsg, valueMsg);
        return dittoProtocolEvent;
    }
}
//com.project.thesis:greenhouse01
let namespace = 'com.project.thesis';
let id = 'greenhouse01';
let headersMsg = {'content-type': 'text/plain'};
let dittoProtocol = buildDittoProtocolMsg(namespace, id, 'things', 'live', 'messages', 'eventname', 'outbox/messages/eventname', headersMsg, 'ciao');
console.log(dittoProtocol);

/**
 * Builds a Ditto Protocol message from the passed parameters.
 * @param {string} namespace - The namespace of the entity in java package notation, e.g.: "org.eclipse.ditto". Or "_"
 * (underscore) for connection announcements.
 * @param {string} name - The name of the entity, e.g.: "device".
 * @param {string} channel - The channel for the signal: "twin"|"live"|"none"
 * @param {string} group - The affected group/entity: "things"|"policies"|"connections".
 * @param {string} criterion - The criterion to apply: "commands"|"events"|"search"|"messages"|"announcements"|"errors".
 * @param {string} action - The action to perform: "create"|"retrieve"|"modify"|"delete". Or the announcement name:
 * "opened"|"closed"|"subjectDeletion". Or the subject of the message.
 * @param {string} path - The path which is affected by the message (e.g.: "/attributes"), or the destination
 * of a message (e.g.: "inbox"|"outbox").
 * @param {Object.<string, string>} dittoHeaders - The headers Object containing all Ditto Protocol header values.
 * @param {*} [value] - The value to apply / which was applied (e.g. in a "modify" action).
 * @param {number} [status] - The status code that indicates the result of the command. If setting a status code,
 * the Ditto Protocol Message will be interpreted as a response (e.g. content will be ignored when using 204).
 * @param {Object} [extra] - The enriched extra fields when selected via "extraFields" option.
 * @returns {DittoProtocolMessage} dittoProtocolMessage(s) -
 *  The mapped Ditto Protocol message or
 *  <code>null</code> if the message could/should not be mapped
 */
 function buildDittoProtocolMsg(namespace, name, group, channel, criterion, action, path, dittoHeaders, value, status, extra) {
    const topic = buildTopic(namespace, name, group, channel, criterion, action);

    return {
        topic: topic,
        path: path,
        headers: dittoHeaders,
        value: value,
        status: status,
        extra: extra,
    };
}

/**
 * Builds a Ditto Protocol topic from the passed parameters.
 * @param {string} namespace - The namespace of the entity in java package notation, e.g.: "org.eclipse.ditto". Or "_"
 * (underscore) for connection announcements.
 * @param {string} name - The name of the entity, e.g.: "device".
 * @param {string} channel - The channel for the signal: "twin"|"live"|"none"
 * @param {string} group - The affected group/entity: "things"|"policies"|"connections".
 * @param {string} criterion - The criterion to apply: "commands"|"events"|"search"|"messages"|"announcements"|"errors".
 * @param {string} action - The action to perform: "create"|"retrieve"|"modify"|"delete". Or the announcement name:
 * "opened"|"closed"|"subjectDeletion". Or the subject of the message.
 * @returns {string} topic - the topic.
 */
function buildTopic(namespace, name, group, channel, criterion, action) {
    const topicChannel = 'none' === channel ? '' : '/' + channel;

    return namespace + "/" + name + "/" + group + topicChannel + "/" + criterion + "/" + action;
}

/**
 * Builds an external message from the passed parameters.
 * @param {Object.<string, string>} headers - The external headers Object containing header values
 * @param {string} [textPayload] - The external mapped String
 * @param {ArrayBuffer} [bytePayload] - The external mapped bytes as ArrayBuffer
 * @param {string} [contentType] - The returned Content-Type
 * @returns {ExternalMessage} externalMessage - 
 *  the mapped external message
 *  or <code>null</code> if the message could/should not be mapped
 */
function buildExternalMsg(headers, textPayload, bytePayload, contentType) {

  return {
    headers: headers,
    textPayload: textPayload,
    bytePayload: bytePayload,
    contentType: contentType,
  };
}

/**
 * Transforms the passed ArrayBuffer to a String interpreting the content of the passed arrayBuffer as unsigned 8
 * bit integers.
 *
 * @param {ArrayBuffer} arrayBuffer the ArrayBuffer to transform to a String
 * @returns {String} the transformed String
 */
function arrayBufferToString(arrayBuffer) {

  return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
}

/**
 * Transforms the passed String to an ArrayBuffer using unsigned 8 bit integers.
 *
 * @param {String} string the String to transform to an ArrayBuffer
 * @returns {ArrayBuffer} the transformed ArrayBuffer
 */
function stringToArrayBuffer(string) {

  let buf = new ArrayBuffer(string.length);
  let bufView = new Uint8Array(buf);
  for (let i=0, strLen=string.length; i<strLen; i++) {
    bufView[i] = string.charCodeAt(i);
  }
  return buf;
}

/**
 * Transforms the passed ArrayBuffer to a {ByteBuffer} (from bytebuffer.js library which needs to be loaded).
 *
 * @param {ArrayBuffer} arrayBuffer the ArrayBuffer to transform
 * @returns {ByteBuffer} the transformed ByteBuffer
 */
function asByteBuffer(arrayBuffer) {
    
  let byteBuffer = new ArrayBuffer(arrayBuffer.byteLength);
  new Uint8Array(byteBuffer).set(new Uint8Array(arrayBuffer));
  return dcodeIO.ByteBuffer.wrap(byteBuffer);
}
