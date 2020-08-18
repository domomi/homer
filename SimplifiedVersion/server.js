// File Upload needs:
var SocketIOFileUpload = require("socketio-file-upload")
var socketio = require('socket.io')

// Express http Server
const express = require('express')

// For cloud deploy, process.env.PORT
const port = (process.env.PORT || 3002)
const path = require('path')
const app = express().use(SocketIOFileUpload.router)



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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Combine Node and React together working at the same port
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello World!'))








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
                .updateOne(
                    { email: user.email },
                    { $set: user },
                    { upsert: true }
                )
        })

    res.end(res.send(req.body.user_role))
})

app.post('/getUserWholeProfile', (req, res) => {
    console.log('getUserWholeProfile')
    console.log(req.body)
    // Let's change this API to be email accessible only
    let user_email = req.body.user.email
    console.log(user_email)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {
            sslValidate: true,
            sslCA: ca
        }
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("Homer");

            // Find Previously entered data and log it onto the front end.
            dbo.collection("homer_lite_user").findOne(
                { email: user_email }
            ).then(
                result => {
                    console.log(result)
                    res.send(result)
                    db.close()
                    res.end()

                }
            )
        })


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

app.post('/RenterMapSkipAlerts', (req, res) => {

    console.log('RenterMapSkipAlerts')


    let user_email = req.body.user_email
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

                dbo.collection("homer_lite_user").findOne(
                    { email: user_email },
                ).then(result => {

                    // If the user hasn't set a filter
                    // then the user is the first time to vist,
                    // or hasn't ever set a filter
                    // we set the skipped to true
                    if (!result.user_filter) {

                        dbo.collection("homer_lite_user").updateOne(
                            { email: user_email },
                            { $set: { user_filter_skipped: true } },
                            { upsert: true }
                        )
                        db.close()
                    }
                    // The user has set a filter already,
                    // Whenever they visit the page,
                    // they dont have to do it again
                    else if (result.user_filter) {
                        dbo.collection("homer_lite_user").updateOne(
                            { email: user_email },
                            { $set: { user_filter_skipped: false } },
                            { upsert: true }
                        )
                        db.close()
                    }


                })


                // 

            })

    } catch (error) {
        console.log(error)
    }
    finally {
        // res.end(res.send('success'))
    }
})


app.post('/HomeOwnerSkipVideoUpload', (req, res) => {

    console.log('HomeOwnerSkipVideoUpload')


    let user_email = req.body.user_email
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

                dbo.collection("homer_lite_user").updateOne(
                    { email: user_email },
                    { $set: { homeowner_video_upload_skipped: true } },
                    { upsert: true }
                )
                db.close()
                res.send('success')

                // 

            })

    } catch (error) {
        console.log(error)
    }
    finally {
        // res.end(res.send('success'))
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
                    { $set: { user_filter: user_filter, user_filter_skipped: false, renter_filter_set_up: true } },
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
    console.log('   ')
    console.log(files_uploaded_name_array)

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
                // The array passed in should be sliced into items and push each
                // of the items into the DB field.
                { $push: { files_uploaded_name_array: { $each: files_uploaded_name_array } } },
                { upsert: true }
            )
            db.close()
        })




    res.send('success')
})

// 
app.get('/updateHomeOwnerListingVideoInfo', (req, res) => {
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





// Put filter into the DB.
app.post('/UpdateHomeOwnerListingProperties', (req, res) => {
    console.log('UpdateHomeOwnerListingProperties')
    console.log(req.body)
    let user_email = req.body.user_email
    let home_owner_listing_properties = req.body.home_owner_listing_properties
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
                    { $set: { home_owner_listing_properties: home_owner_listing_properties } },
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




// Gets the user's previously stored listing properties.
app.get('/UpdateHomeOwnerListingProperties', (req, res) => {
    console.log('UpdateHomeOwnerListingProperties')
    console.log(req.body)
    let user_email = req.body.user_email
    // let home_owner_listing_properties = req.body.home_owner_listing_properties
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
                    { email: user_email },
                ).then(result => {
                    console.log(result)
                    res.end(res.send(result))
                })
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


// Update Home Owner Map Steps
app.post('/HomeOwnerMapSteps', (req, res) => {
    console.log('POST /HomeOwnerMapSteps')
    let user_email = req.body.user_email
    let home_owner_map_config_step = req.body.home_owner_map_config_step
    console.log(`612 req.body`)
    console.log(req.body)
    console.log(user_email)
    console.log(home_owner_map_config_step)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {
            sslValidate: true,
            sslCA: ca
        }
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("Homer");


            dbo.collection("homer_lite_user")
                .updateOne(
                    { email: user_email },
                    { $set: { home_owner_map_config_step: home_owner_map_config_step } },
                    { upsert: true }
                )

            db.close()
        })
})




app.get('/HomeOwnerMapSteps/:user_email', (req, res) => {
    console.log('GET /HomeOwnerMapSteps')
    let user_email = req.params.user_email
    console.log(`642 req.body?----------------`)
    // console.log(req)
    console.log(req.body)
    console.log(`642 req.params?----------------`)
    console.log(req.params.user_email)
    console.log(user_email)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {
            sslValidate: true,
            sslCA: ca
        }
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("Homer");


            dbo.collection("homer_lite_user")
                .findOne(
                    { email: user_email }
                ).then(
                    result => {
                        console.log(`result 660 ${result.home_owner_map_config_step}`)
                        console.log(result.home_owner_map_config_step)
                        res.send(result.home_owner_map_config_step + '')
                        // console.log(result)
                    }
                )

            db.close()
        })
})





app.post('/fetchUserAlerts', (req, res) => {
    console.log('fetchUserAlerts ---------------- 560')
    console.log(req.body)
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
                dbo.collection("homer_lite_user").findOne(
                    { email: user_email },
                ).then(result => {
                    console.log(result)
                    console.log(result.user_alerts)

                    if (result.user_alerts) {
                        let alerts = result.user_alerts
                        console.log('result.user_alerts')
                        console.log(result.user_alerts)
                        res.end(res.send(alerts))
                    }
                    else {
                        res.end(res.send([]))
                    }

                })
                db.close()
            })

    } catch (error) {
        console.log(error)
    }
    finally {
        // res.end(res.send('success'))
    }

})


app.post('/fetchNewUpdates', (req, res) => {
    console.log('fetchNewUpdates ---------------- 727')
    console.log(req.body)
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
                dbo.collection("homer_lite_listings").find(
                    // { email: user_email },
                ).toArray((err,results) => {
                    console.log(results)
                    console.log('results')
                    res.send(results)
                })
                db.close()
            })

    } catch (error) {
        console.log(error)
    }
    finally {
        // res.end(res.send('success'))
    }

})


// Video streaming
app.get('/fetchVideo/:file_name', function (req, res) {
    console.log('id---------------------347')
    console.log(req.params.file_name)
    const path = 'videos_uploaded/' + req.params.file_name
    console.log('path')
    console.log(path)
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
});



app.post('/updateListingLocation', function (req, res) {
    console.log('updateListingLocation')
    console.log(req.body.map_center)
    let user_email = req.body.user_email
    let map_center = [parseFloat(req.body.map_center[0]),parseFloat(req.body.map_center[1])]

    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {
            sslValidate: true,
            sslCA: ca
        }
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("Homer");


            dbo.collection("homer_lite_user")
                .updateOne(
                    { email: user_email },
                    { $set :{listing_location : map_center} },
                    { upsert : true}
                )
                // .then(
                //     result => {
                //         console.log(`result 660 ${result.home_owner_map_config_step}`)
                //         console.log(result.home_owner_map_config_step)
                //         res.send(result.home_owner_map_config_step + '')
                //         // console.log(result)
                //     }
                // )

            db.close()
        })



    res.send('succecss')
    res.end()
});

app.post('/updateDescription', function (req, res) {
    console.log('updateDescription')
   
    let user_email = req.body.user_email
    let listing_description = req.body.listing_description
    console.log(user_email,listing_description)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {
            sslValidate: true,
            sslCA: ca
        }
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("Homer");


            dbo.collection("homer_lite_user")
                .updateOne(
                    { email: user_email },
                    { $set :{listing_description : listing_description} },
                    { upsert : true}
                ).then(()=>{
                    console.log('827 in then()')
                    dbo.collection("homer_lite_user")
                    .findOne(
                        { email: user_email }
                    ).then(
                        (result) => {
                            console.log(result)
                            dbo.collection("homer_lite_listings")
                            .updateOne(
                                { email: user_email },
                                { $set :{
                                    update_time         : new Date(),
                                    title               : 'new home added',
                                    listing_description : listing_description,
                                    listing_location    : result.listing_location,
                                    listing_videos : result.files_uploaded_name_array} },
                                { upsert : true}
                            ).then(db.close())
                        }
)
                })
                // .then(
                //     result => {
                //         console.log(`result 660 ${result.home_owner_map_config_step}`)
                //         console.log(result.home_owner_map_config_step)
                //         res.send(result.home_owner_map_config_step + '')
                //         // console.log(result)
                //     }
                // )

            // db.close()
        })



    res.send('succecss')
    res.end()
});


app.post('/checkSchedule',(req,res)=>{
    console.log('/checkSchedule')
})




// Let React Router work on its own.
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
