import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://connor:con123@ds237563.mlab.com:37563/muralspotr');

import Spot from './models/Spot';
// import User from './models/User';

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('got a db connection!')
});

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/api/spot', (req, res) => {
  Spot.find({ "location_name": 'Arts'}).then((result) => {
    console.log('got one spot')
    console.log(result)
  }).catch((err) => {
    console.error('got error')
    console.error(err)
  });
// })


app.get('/', (req, res) => {
  res.send('hello')
})


app.get('/api/spot/byId', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.send(400)
  }
  const spot = Spot.findById(id, function (err, result) {
    if (err) {
      console.error('got error')
      console.error(err)
    }
    console.log('got result')
    console.log(result)
  });

  

  // res.json(spots)
});

app.get('/api/spots', (req, res) => {
  Spot.find().then((result) => {
    console.log('got spots')
    console.log(result)
  }).catch((err) => {
    console.error('got error')
    console.error(err)
  });

  // const spots = [
  //   {
  //     lat: 34.714525,
  //     long: -119.591964,
  //     name: 'california'
  //   },
  //   {
  //     lat: -119.591964,
  //     long: 34.714525,
  //     name: 'opposite california'
  //   }
  // ]

  // res.json(spots)
});

app.post('/api/spot', (req, res) => {
  console.log('got spot post request')
  console.log(req.body);
  res.send(200)
})



app.listen(4000);
console.log('Running an express API server at localhost:4000/');


// at somepoint maybe
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'))
// })