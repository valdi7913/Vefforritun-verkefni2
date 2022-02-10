import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();

const {
    PORT: port = 3000,   
    HOST: hostname = '127.0.0.1',
} =  process.env

app.get('/', (req, res) => {
    console.info("Request sent to /");
    res.send(`Hello World! The time is now ${new Date().toLocaleTimeString()}`);
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});