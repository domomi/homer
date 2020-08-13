// File Upload needs:
var SocketIOFileUpload = require("socketio-file-upload")
var socketio = require('socket.io')

// Express http Server
const express = require('express')

const port = (process.env.PORT || 3002)
const app = express().use(SocketIOFileUpload.router)
const path = require('path')


// Deal with incoming data
const bodyParser = require('body-parser')
const cors = require('cors')

// Connection Strings
const DOMAIN_NAME = 'http://localhost:3000'
const MONGODB_CONNECTION_STRING = 'mongodb://admin:H0merc3ntra1@07fbbe4b-9615-4e23-b0cd-1ec8ef114e6e-0.4b2136ddd30a46e9b7bdb2b2db7f8cd0.databases.appdomain.cloud:30915/?authSource=admin&replicaSet=replset&readPreference=secondary&appname=MongoDB%20Compass&ssl=true'

// MongoDB SSL config
const MongoClient = require('mongodb').MongoClient
f = require('util').format,
    fs = require('fs'),
    ca = [fs.readFileSync(__dirname + "/ca.pem")];

// parse the data
app.use(cors())
// app.use(siofu.router)
app.use(bodyParser.urlencoded({ extended: true }))

//app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.static(path.join(__dirname, 'public')));

app.post('/getStarted', (req, res) => {
    console.log('getStarted')
    console.log(req.body)
    let user = req.body
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {
            sslValidate: true,
            sslCA: ca
        }
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("Homer");

            // Insert the user into the DB.
            // Something will go wrong here:
            // multiple inserts may happen,
            // need to fix that by writing some conditions.
            dbo.collection("homer_lite_user")
                .insertOne(user)
        })

    res.end(res.send(req.body.user_role))
})

app.post('/SegmentationInfo', (req, res) => {
    console.log(req.body)
})



// later change to post
app.get('/Segmentation', (req, res) => {
    console.log('Renters')
})


app.get('/StartAsRenters', (req, res) => {
    res.send('Renter')
})

// later change to post
app.get('/StartAsHomeOwners', (req, res) => {
    res.send('HomeOwner')
})


app.post('/HomeOwnerPreference', (req, res) => {
    console.log(req.body)
    let user_preference = req.body.user_preference
    let user_email = req.body.user_email
    try {
        MongoClient.connect(MONGODB_CONNECTION_STRING,
            {
                sslValidate: true,
                sslCA: ca
            }
            , function (err, db) {
                if (err) throw err;
                var dbo = db.db("Homer");

                //find the user by session ID
                dbo.collection("homer_lite_user").updateOne(
                    { email: user_email },
                    { $set: { user_preference: user_preference } },
                    { upsert: true }
                )
            })

    } catch (error) {
        console.log(error)
    }
    finally {
        res.end(res.send('success'))
    }
})



// Update RenterAttributes
app.post('/RenterAttributes', (req, res) => {

    console.log('req.body')
    console.log(req.body)
    let data = req.body
    console.log(data.selected_attributes)
    let user_email = req.body.user_email
    let selected_attributes = req.body.selected_attributes
    console.log('selected_attributes -------- 72')
    console.log(req.body.user_email)
    console.log(selected_attributes)


    try {
        MongoClient.connect(MONGODB_CONNECTION_STRING,
            {
                sslValidate: true,
                sslCA: ca
            }
            , function (err, db) {
                if (err) throw err;
                var dbo = db.db("Homer");

                //find the user by session ID
                dbo.collection("homer_lite_user").updateOne(
                    { email: user_email },
                    { $set: { selected_attributes: selected_attributes } },
                    { upsert: true }
                )
            })

    } catch (error) {
        console.log(error)
    }
    finally {
        res.end(res.send('success'))
    }
})

app.post('/RenterPreference', (req, res) => {
    console.log(req.body)
    let user_preference = req.body.user_preference
    let user_email = req.body.user_email
    try {
        MongoClient.connect(MONGODB_CONNECTION_STRING,
            {
                sslValidate: true,
                sslCA: ca
            }
            , function (err, db) {
                if (err) throw err;
                var dbo = db.db("Homer");

                //find the user by session ID
                dbo.collection("homer_lite_user").updateOne(
                    { email: user_email },
                    { $set: { user_preference: user_preference } },
                    { upsert: true }
                )
            })

    } catch (error) {
        console.log(error)
    }
    finally {
        res.end(res.send('success'))
    }
})

app.post('/RenterMapBeaconMatch', (req, res) => {

    let user_email = req.body.user_email
    console.log('user_email -------140')
    console.log(user_email)
    try {

        MongoClient.connect(MONGODB_CONNECTION_STRING,
            {
                sslValidate: true,
                sslCA: ca
            }
            , function (err, db) {
                if (err) throw err;
                var dbo = db.db("Homer");

                //find the user by session ID
                dbo.collection("homer_lite_user").findOne(
                    { email: user_email }
                ).then((result) => {

                    console.log(result.user_preference)
                    console.log(result)
                    let user_preference = result.user_preference
                    console.log(user_preference)
                    // res.send(result.user_preference)
                }).then(() => {
                    console.log('inside then')
                    dbo.collection("home_beacon").find(
                        {}
                    ).toArray((err, result) => {
                        console.log(result)
                        res.end(res.send(result))
                    })
                })
            })

    } catch (error) {
        console.log(error)
    }
    finally {
        // res.end(res.send('success'))
    }
})

// Admin Functions
// Change it to post later
app.get('/getUsers', (req, res) => {

    try {

        MongoClient.connect(MONGODB_CONNECTION_STRING,
            {
                sslValidate: true,
                sslCA: ca
            }
            , function (err, db) {
                if (err) throw err;
                var dbo = db.db("Homer");

                //find the user by session ID
                dbo.collection("homer_lite_user").find(
                    {}
                ).toArray((err, doc) => {
                    console.log('doc')
                    console.log(doc)
                    res.end(res.send(doc))
                    db.close()
                })
            })

    } catch (error) {
        console.log(error)
    }
    finally {
        // res.end(res.send('success'))
    }
})

// Put filter into the DB.
app.post('/UpdateRenterFilter', (req, res) => {
    console.log('UpdateRenterFilter')
    console.log(req.body)
    let user_email = req.body.user_email
    let user_filter = req.body.user_filter
    try {

        MongoClient.connect(MONGODB_CONNECTION_STRING,
            {
                sslValidate: true,
                sslCA: ca
            }
            , function (err, db) {
                if (err) throw err;
                var dbo = db.db("Homer");

                //find the user by session ID
                dbo.collection("homer_lite_user").updateOne(
                    { email: user_email },
                    { $set: { user_filter: user_filter } },
                    { upsert: true }
                )
                db.close()
            })

    } catch (error) {
        console.log(error)
    }
    finally {
        // res.end(res.send('success'))
    }


    // res.end(res.send('success'))
})

app.post('/updateHomeOwnerListingVideoInfo', (req, res) => {
    console.log('updateHomeOwnerListingVideoInfo')
    let user_email = req.body.user.email
    let files_uploaded_name_array = req.body.files_uploaded_name_array
    console.log('user_email')
    console.log(user_email)


    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {
            sslValidate: true,
            sslCA: ca
        }
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("Homer");

            //find the user by session ID
            dbo.collection("homer_lite_user").updateOne(
                { email: user_email },
                { $set: { files_uploaded_name_array: files_uploaded_name_array } },
                { upsert: true }
            )
            db.close()
        })




    res.send('success')
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));




// Socket.io code:
let io = socketio.listen(app.listen(port, () => console.log(`Example app listening on port ${port}!`)));

io.sockets.on("connection", function (socket) {

    // Make an instance of SocketIOFileUpload and listen on this socket:
    var uploader = new SocketIOFileUpload();
    uploader.dir = __dirname + "/videos_uploaded/";
    uploader.listen(socket);

    // Do something when a file is saved:
    uploader.on("saved", function (event) {
        console.log(event.file);
    });

    // Error handler:
    uploader.on("error", function (event) {
        console.log("Error from uploader", event);
    });
});

