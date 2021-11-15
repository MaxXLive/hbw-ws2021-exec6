// dhbw exercise 6
//   build a simulation program which will send mqtt messages every xx seconds 
//   to the hivemq.com broker
//
//   the message to be sent has the following values
//     timestamp of messurement
//     roomid 
//     sensorid 
//     co2 measurement value

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

// add mqtt support
var mqtt    = require('mqtt');
var client  = mqtt.connect('xxhs');

const axios = require('axios');

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  );
}

const args = process.argv.slice(2);
if (args[0] == '?') {

  console.log('arg1 = timeinterval in sec');
  console.log('arg2 = roomid - 4stellig');
  console.log('arg3 = sensorid - 4stellig');
  console.log('arg4 = minco2 value 4 stellig');
  console.log('arg5 = maxco2 value 4 stellig');
  console.log('bsp =npm start 10 0001 1000 500 3000')
}

var timeinterval = 'xxhs'
var roomid = 'xxhs'
var sensorid = 'xxhs'
var minco2 = 'xxhs'
var maxco2 = 'xxhs'

var co2value;

var mqttmsg = {};
mqttmsg['roomid'] = 'xxhs'
mqttmsg['sensorid'] = 'xxhs'

setInterval(function(
){
  mqttmsg['timestamp'] = new Date().toISOString();
  co2value = between(minco2,maxco2);
  mqttmsg['co2value'] = co2value;
  console.log(mqttmsg);
  client.publish('CO2',  JSON.stringify('xxhs'));
},timeinterval*1000) //logs hi every second

app.listen(4000, () =>{
    console.log('Listening on port 4000')
});