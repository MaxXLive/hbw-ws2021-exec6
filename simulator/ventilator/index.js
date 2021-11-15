// dhbw exercise 6
//   build a simulation program which will send mqtt messages every xx seconds 
//   to the hivemq.com broker
//
//   the message to be sent has the following values
//     timestamp of messurement
//     roomid 
//     sensorid 
//     ventilator state

//
//    remove the comment statements xxhs and put the correct js code in
// 

// change history

const express = require('express');
const app = express();

const cors = require('cors'); 
app.use(cors());

// required to handle the request body
app.use(express.json());

var cron = require('node-cron');

// add mqtt support
const mqttlink = "tls://a0edebbf6c314e0baf58b1a877d2c29a.s1.eu.hivemq.cloud";
const options = {
  username: 'Microservices',
  password: 'Micro123'
};
var mqtt    = require('mqtt');
var client  = mqtt.connect(mqttlink, options);


const axios = require('axios');

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  );
}

function generateMessage(roomid, sensorid, state) {
  return {
    timestamp: new Date().toISOString(),
    roomid: roomid,
    id: sensorid,
    state: state
  }
}

const args = process.argv.slice(2);
if (args[0] == '?') {

  console.log('arg1 = roomid - 4stellig');
  console.log('arg2 = sensorid - 4stellig');
  console.log('arg3 = minco2 value 4 stellig');
  console.log('arg4 = maxco2 value 4 stellig');
  console.log('bsp =npm start 0001 1000 500 3000')
}

if (args.length != 4) {

} else {
  var roomid = args[0];
  var sensorid = args[1];
  var minventstate = args[2];
  var maxventstate = args[3];

  cron.schedule('* * * * *', () => {
    var state = between(minventstate, maxventstate);
    var message = generateMessage(roomid, sensorid, state);
    console.log(JSON.stringify(message));
    client.publish('ventilator', JSON.stringify(message));
  });
}


app.listen(4000, () =>{
    console.log('Listening on port 4000')
});