const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { ObjectID } = require('bson');
const fileUpload = require('express-fileupload');

//middlware
app.use(cors());
app.use(express.json());
app.use(fileUpload())

// using connection uri and connection client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0fdsl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    console.log('Server and Database connection succesfully!!')

    // set database
     const database = client.db('Roktokonika');

     // team member collection
    const teamsCollection = database.collection('teams');

     // posts collection
    const postsCollection = database.collection('posts');

     // roktokonika blood donor tean collection
    const roktokonikaBloodTeamCollection = database.collection('roktokonikaBlood');

     // roktokonika clean team collection
    const roktokonikaCleanTeamCollection = database.collection('roktokonikaClean');

     // roktokonika support humaity team collection
    const roktokonikaSupportTeamCollection = database.collection('roktokonikaSupport');

    // user information collection in database 
    const usersCollection = database.collection('users');

    

      /* --------------------- user part start--------------------------- */
         
          // --------- check admin ? admin check korar process----------
          app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
              isAdmin = true;
            }
            res.json({ admin: isAdmin });
          })
         

         //-------- add or post data for users-----------
              app.post('/users', async (req , res) => {
              const user = req.body;
              const result = await usersCollection.insertOne(user);
              res.json(result)
          });


              // --------- make admin for dashboard --------
              app.put('/users/admin', async (req, res) => {
                const user = req.body;
                const filter = { email: user.email };
                const updateDoc = { $set: {role: 'admin'}};
                const result = await usersCollection.updateOne(filter, updateDoc);
                res.json(result);
              })
     
              /* ------------------user part end ---------------------------- */


    /*--------------------------- Team member part start ------------------------- */
     
      // Post or add team members
      app.post('/teams', async (req, res) => {              
        const addTeamMembers = req.body;       
        const result = await teamsCollection.insertOne(addTeamMembers);
        console.log(result);
        res.json(result)        
   });
 
    //------------Get team members Api---------------
      app.get('/teams', async(req, res) => {
        const cursor  = teamsCollection.find({});
        const teams = await cursor.toArray();
        res.send(teams);
    })
 
      // ----------- delete team members--------------
      app.delete('/teams/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id:ObjectID(id)};
        const result = await teamsCollection.deleteOne(query);         
        res.send(result);
    });
   
    /*--------------------------- Team member part end ------------------------- */
 
    
 
    /*--------------------------- Posts part start ------------------------- */
    
      // Post or add user post
      app.post('/posts', async (req, res) => {           
        const addPosts = req.body;       
        const result = await postsCollection.insertOne(addPosts);
        console.log(result);
        res.json(result)        
   });
    
    //------------Get post Api---------------
      app.get('/posts', async(req, res) => {
        const cursor  = postsCollection.find({});
        const posts = await cursor.toArray();
        res.send(posts);
    })

      

      // ----------- delete post--------------
      app.delete('/posts/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id:ObjectID(id)};
        const result = await postsCollection.deleteOne(query);         
        res.send(result);
    });

    /*--------------------------- Posts part end ------------------------- */
 

 
    /*--------------------------- Roktokonika Blood Donor Team part start ------------------------- */

      // Post or add oktokonika Blood Donor Team
      app.post('/roktokonikaBlood', async (req, res) => {           
        const addRoktokonikaBloodTeam = req.body;       
        const result = await roktokonikaBloodTeamCollection.insertOne(addRoktokonikaBloodTeam);
        console.log(result);
        res.json(result)        
      });

      
    //------------Get oktokonika Blood Donor Team members Api---------------
      app.get('/roktokonikaBlood', async(req, res) => {
        const cursor  = roktokonikaBloodTeamCollection.find({});
        const roktokonikaBloodTeam = await cursor.toArray();
        res.send(roktokonikaBloodTeam);
    })
 
      // ----------- delete oktokonika Blood Donor Team members--------------
      app.delete('/roktokonikaBlood/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id:ObjectID(id)};
        const result = await roktokonikaBloodTeamCollection.deleteOne(query);         
        res.send(result);
    });
   
    /*--------------------------- Roktokonika Blood Donor Team part end ------------------------- */


 
    /*--------------------------- Roktokonika Clean Team part start ------------------------- */
    
      // Post or add Roktokonika Clean Team
      app.post('/roktokonikaClean', async (req, res) => {           
        const addRoktokonikaCleanTeam = req.body;       
        const result = await roktokonikaCleanTeamCollection.insertOne(addRoktokonikaCleanTeam);
        console.log(result);
        res.json(result)        
   });
       
    //------------Get Roktokonika Clean Team members Api---------------
      app.get('/roktokonikaClean', async(req, res) => {
        const cursor  = roktokonikaCleanTeamCollection.find({});
        const roktokonikaCleanTeam = await cursor.toArray();
        res.send(roktokonikaCleanTeam);
    })

      // ----------- delete Roktokonika Clean Team members--------------
      app.delete('/roktokonikaClean/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id:ObjectID(id)};
        const result = await roktokonikaCleanTeamCollection.deleteOne(query);         
        res.send(result);
    });

    /*--------------------------- Roktokonika Clean Team part end ------------------------- */


 
    /*--------------------------- Roktokonika Support humanity Team part start ------------------------- */

      // Post or add Roktokonika Support humanity
      app.post('/roktokonikaSupport', async (req, res) => {           
        const addRoktokonikaSupportTeam = req.body;       
        const result = await roktokonikaSupportTeamCollection.insertOne(addRoktokonikaSupportTeam);
        console.log(result);
        res.json(result)        
   });
    
    //------------Get Roktokonika Support humanity team members Api---------------
      app.get('/roktokonikaSupport', async(req, res) => {
        const cursor  = roktokonikaSupportTeamCollection.find({});
        const supportHumanityTeam = await cursor.toArray();
        res.send(supportHumanityTeam);
    })

    
      // ----------- delete Roktokonika Support humanity members--------------
      app.delete('/roktokonikaSupport/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id:ObjectID(id)};
        const result = await roktokonikaSupportTeamCollection.deleteOne(query);         
        res.send(result);
    });

    /*--------------------------- Roktokonika Support humanity Team part end ------------------------- */

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