const express = require('express');
const axios = require('axios');
const mqtt = require('mqtt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const Topic = 'ventilator';
const Broker_URL = 'tls://a0edebbf6c314e0baf58b1a877d2c29a.s1.eu.hivemq.cloud';
const options = {
    username: 'Microservices',
    password: 'Micro123'
};

const data = [];

let client = mqtt.connect(Broker_URL, options);
client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messageReceived);
client.on('close', mqtt_close);

function mqtt_connect()
{
    console.log("Connecting MQTT");
    client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted)
{
    console.log("Subscribed to " + Topic);
    if (err) {console.log(err);}
}

function mqtt_reconnect(err)
{
    console.log("Reconnect MQTT");
    if (err) {console.log(err);}
	client  = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err)
{
    console.log("Error!");
	if (err) {console.log(err);}
}

function mqtt_messageReceived(topic, message, packet)
{
    const fanData = JSON.parse(message);
    if(data.length === 0){

        data[0] = fanData;
    }else{
        data.push(fanData);
    }

    console.log(data)
}

function mqtt_close()
{
	console.log("Close MQTT");
}

app.listen(4002, async() => {
    console.log('Listening on 4002');
});

app.get('/', (req, res) => {
    res.json(data);
});
