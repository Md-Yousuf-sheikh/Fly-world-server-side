const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// file url 
const productRoute = require("./src/View/ProductRoute");

// file call
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db('FLY_WORLD');
//         const productsCollection = database.collection('products');
//         const bookingCollection = database.collection('booking');
//         const usersCollection = database.collection('users');

//         //  get all products
//         app.get('/products', async (req, res) => {
//             const cursor = productsCollection.find({});
//             const products = await cursor.toArray();
//             res.send(products)
//         })
//         // get orders all product
//         app.get('/orders', async (req, res) => {
//             const cursor = bookingCollection.find({});
//             const orders = await cursor.toArray();
//             res.send(orders)
//         })
//         // Delete orders inside the products
//         app.delete('/orders:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) };
//             const result = await bookingCollection.deleteOne(query);
//             res.json(result)
//         })

//         // get Users all product
//         app.get('/users', async (req, res) => {
//             const cursor = usersCollection.find({});
//             const users = await cursor.toArray();
//             res.send(users)
//         })
//         // post new product inside the products 
//         app.post('/products', async (req, res) => {
//             const newPost = req.body;
//             const result = await productsCollection.insertOne(newPost);
//             res.json(result);
//         })
//         // new order  
//         app.post('/order', async (req, res) => {
//             const newPost = req.body;
//             const result = await bookingCollection.insertOne(newPost);
//             res.json(result);
//         })
//         // Delete product inside the products
//         app.delete('/products:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) };
//             const result = await productsCollection.deleteOne(query);
//             res.json(result)
//         })
//         // Delete order 
//         app.delete('/books:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) }
//             const result = await bookingCollection.deleteOne(query);
//             res.json(result);
//         })
//         //  user add and admin check
//         // user add post
//         app.post('/users', async (req, res) => {
//             const user = req.body;
//             const result = await usersCollection.insertOne(user);
//             res.json(result);
//         })

//         //  user to post users
//         app.post('/users', async (req, res) => {
//             const user = req.body;
//             const result = await usersCollection.insertOne(user);
//             console.log(result);
//             res.json(result);
//         })

//         // user update and insert   (upsert)
//         app.put('/users', async (req, res) => {
//             const user = req.body;
//             const filter = { email: user.email };
//             const options = { upsert: true };
//             const updateDoc = { $set: user };
//             const result = await usersCollection.updateOne(filter, updateDoc, options);
//             res.json(result)
//         })

//         // Admin user PUT
//         app.put('/users/admin', async (req, res) => {
//             const user = req.body;
//             const filter = { email: user.email };
//             const updateDoc = { $set: { role: 'admin' } };
//             const result = await usersCollection.updateOne(filter, updateDoc);
//             res.json(result);
//         })
//         //  check admin states
//         app.get('/users/:email', async (req, res) => {
//             const email = req.params.email;
//             const query = { email: email };
//             const user = await usersCollection.findOne(query);
//             let isAdmin = false;
//             if (user?.role === 'admin') {
//                 isAdmin = true;
//             }
//             res.json({ admin: isAdmin })
//         })
//     }
//     finally {
//         // await client.close():
//     }
// }

// mongoose connection

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trmxc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )

    .then(() => {
        console.log("Mongodb connected....");
    })
    .catch((err) => console.log(err.message));

// All routes 

app.use('/product', productRoute);

// main server routes
app.get('/', (req, res) => {
    res.send('Fly world server is running!!')
})

// cors error resolve
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Headers : Origin, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Undefined Route Implement
app.use((req, res, next) => {
    res.status(404).json({ error: true, message: "Not Found this route" });
});

//  test
app.listen(port, () => {
    console.log('FLY RUNNING', port)
})