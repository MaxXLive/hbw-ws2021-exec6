const cronjob = require('cron').CronJob;
const mqtt = require('mqtt');
const url = "tls://a0edebbf6c314e0baf58b1a877d2c29a.s1.eu.hivemq.cloud";
const username = "Microservices";
const password = "Micro123";
const port = "8883";
const clientID = "FensterClient";
const topic = "fenster";
const uuid = require('uuid');

const client = mqtt.connect(url, {
    clean: true,
    username: username,
    password: password,
    port: port,
    clientId: clientID
});
let id = uuid.v4();
client.on('connect', function () {
    console.log('connected');
    //cronjob that runs every minute
    const job = new cronjob('* * * * *', function() {

        // get new value
        const newValue = getFakeTrueFalseValue();
        const message = {
            "open": newValue,
            "timestamp": new Date().toISOString(),
            "id": id
        };
        console.log(message);
        //publish the value of the sensor
        client.publish(topic, JSON.stringify(message));

    });
    
    job.start();
});

function getFakeTrueFalseValue() {
    return Math.random() >= 0.5;
}
