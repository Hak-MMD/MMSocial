const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json({ extended: true }));


const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

async function start() {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`App started on port ${PORT}....`))
    } catch (e) {
        console.log('Server ERROR:', e.message)
        process.exit(1)
    }
}

start();