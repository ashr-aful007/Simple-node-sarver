const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000;



app.get('/', (req, res) =>{
     res.send('Simple Node Server Running');
});

app.use(cors());
app.use(express.json())


const users =[
     {id:1, name: 'Sabana', email: 'sabana@gmail.com'},
     {id:2, name: 'Sabnoor', email: 'Sabnoor@gmail.com'},
     {id:3, name: 'Sabila', email: 'Sabila@gmail.com'},
     
]




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fyikynn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
     try{
          const userCollection = client.db('simpleNode').collection('users')
          // const result = await userCollection.insertOne(user)
          // console.log(result)

          app.get('/users', async(req, res) =>{
               const cursor = userCollection.find({});
               const users = await cursor.toArray();
               res.send(users)

          })


          app.post('/users', async(req, res) =>{
               const user = req.body;
               const result = await userCollection.insertOne(user)
               user._id = result.insertedId;
               res.send(user)
          })

     }
     finally{

     }
}

run().catch(err => console.log(err))

app.get('/users', (req, res) =>{
        if(req.query.name){
          const search = req.query.name
          const filterd = users.filter(usr => usr.name.toLowerCase.indexOf(search) >= 0)
          res.send(filterd)
        }
     res.send(users)
})

// app.post('/users', (req, res) =>{
//      console.log('Post API called');
//      const user = req.body;
//      user.id = users.length + 1;
//      users.push(user);
//      console.log(user)
//      res.send(user)
// })

app.listen(port, () =>{
     console.log(`Simple not server running on port ${port}`);
})