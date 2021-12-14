const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middlware
app.use(cors());
app.use(express.json());

// using connection uri and connection client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0fdsl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    console.log('Server and Database connection succesfully!!')
    /* const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie); */
  } 
  finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('RoktoKonika!')
  })
  
  app.listen(port, () => {
    console.log(`Roktokonika at http://localhost:${port}`)
  })