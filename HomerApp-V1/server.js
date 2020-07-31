
var Files = {};
// Step 3: The Socket.io Server

var
    express = require('express')
    , server = express()
    , app = require('http').createServer(server)
    , io = require('socket.io').listen(app)
    , fs = require('fs')
    , exec = require('child_process').exec
    , path = require('path')
    , util = require('util')
    , bodyParser = require('body-parser')
    , MongoClient = require('mongodb').MongoClient
    // http listen at port 8080
    , cors = require('cors')
    , formidable = require('formidable')
    , express_formidable = require('express-formidable')
    , multer = require('multer')
    , $ = 'jquery'
    , promisify = require('util').promisify,
    deleteFile = promisify(fs.unlink)

const port = (process.env.PORT || 3002)
app.listen(port);



server.get('/', function (req, res) {
    console.log("Homepage");
    res.sendFile(__dirname + '/index.html');
});


server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))
// server.use(express_formidable())



server.post('/uploadVideoInfo', (req, res) => {
    console.log(req.body)
    let uploadInfo = req.body
    MongoClient.connect('mongodb://localhost:27017/Homer', function (err, db) {
        if (err) throw err;
        var dbo = db.db("Homer");

        //find the user by session ID
        dbo.collection("testObj").insertOne({
            id: 1,
            uploadInfo
        })

    })
})

server.post('/updateFilter', (req, res) => {
    console.log(req.body)
    // This is a must, otherwise the program will be dead.
    res.end()
})





//server.listen(port, () => console.log(`Example app listening on port port!`))







function handler(req, res) {
    fs.readFile(__dirname + '/html/fileupload-lab.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}






io.sockets.on('connection', function (socket) {
    console.log("user connected")
    // Step 5: Handling The Events
    socket.on('Start', function (data) { //data contains the variables that we passed through in the html file
        console.log("user emitted started")

        var Name = data['Name'];


        console.log('User:')

        console.log(data['User'])


        Files[Name] = {  //Create a new Entry in The Files Variable
            FileSize: data['Size'],
            Data: "",
            Downloaded: 0
        }
        var Place = 0;
        try {
            var Stat = fs.statSync('Temp/' + Name);
            if (Stat.isFile()) {
                Files[Name]['Downloaded'] = Stat.size;
                Place = Stat.size / 524288;
            }
        }
        catch (er) { } //It's a New File
        fs.open("Temp/" + Name, "a", 0755, function (err, fd) {
            if (err) {
                console.log(err);
            }
            else {
                Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
                socket.emit('MoreData', { 'Place': Place, Percent: 0 });
            }
        });
    });



    socket.on('Upload', function (data) {
        console.log('on Upload')
        // console.log(data)
        // var inp = fs.createReadStream("Temp/" + Name);
        // var out = fs.createWriteStream("Video/" + Name);
        // inp.pipe(out)

        var Name = data['Name'];
        var User = data['User'];
        Files[Name]['Downloaded'] += data['Data'].length;
        Files[Name]['Data'] += data['Data'];

        if (Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
        {
            // var inp = fs.createReadStream("Temp/" + Name);
            // var out = fs.createWriteStream("Video/" + Name);
            try {


                fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function (err, Writen) {
                    //Get Thumbnail Here
                    console.log(Writen)

                  var  inp = fs.createReadStream("Temp/" + Name).on("end", () => {
                        console.log("ended")
                        console.log(inp)
                        inp.destroy()
                        console.log(inp)

                    });

                  var out = fs.createWriteStream(`Video/${User.email}/${Name}`).on("finish", () => {
                        try {
                               
                            // fs.unlink(path.join(__dirname + "/Temp/", Name), function (e) { //This Deletes The Temporary File
                            //     //Moving File Completed
                            //     console.log(path.join(__dirname + "/Temp/", Name))
                            //     console.log('error')
                            //     console.log(e)
                            //     // socket.emit('Done', { 'Image': 'Video/' + Name + '.jpg' });
                            // });
  

                        }
                        catch (e) {
                            console.log(e)
                        }
                        finally {
                            // console.log('179 ')
                            // console.log(inp)
                            // console.log(out)

                            socket.emit('Done', { 'Image': 'Video/' + Name + '.jpg' });

                            // socket.emit('Done'); 
                            // fs.unlinkSync(path.join(__dirname + "/Temp/$RJAQLQY.tmp"))




                        }





                    });

                    inp.pipe(out)



                });
            } catch (e) {
                if (e) {
                    console.log(e)
                }
            }
            finally {

            }

        }
        else if (Files[Name]['Data'].length > 10485760) { //If the Data Buffer reaches 10MB
            fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function (err, Writen) {
                console.log(Writen)
                Files[Name]['Data'] = ""; //Reset The Buffer
                var Place = Files[Name]['Downloaded'] / 524288;
                var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
                socket.emit('MoreData', { 'Place': Place, 'Percent': Percent });
            });
        }
        else {

            var Place = Files[Name]['Downloaded'] / 524288;
            var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
            // console.log(`Processing: ${Percent.toFixed(2)}%`)
            socket.emit('MoreData', { 'Place': Place, 'Percent': Percent });
        }

    });

    socket.on('ClearTEMP',(data)=>{
        console.log(data)
        // setTimeout(() => {
            for(var fileName of data){
               
                
                try {
                    setTimeout(() => {
                        fs.rename(path.join(__dirname + "/Temp/" + fileName),path.join(__dirname + "/Temp/" + fileName + 1),(e)=>console.log(e))
                    }, 1500);
                    console.log(path.join(__dirname + "/Temp/" + fileName))
                    fs.unlinkSync(path.join(__dirname + "/Temp/" + fileName),(e)=>console.log('unlink' + e))
                } catch (error) {
                    console.log('ClearTEMP error')
                    console.log(error)
                }
                
            }
        // }, 1900);

    })


});

server.post('/updateBeaconRadius', (req, res) => {

    // one degree is approximately so many meters:
    const metersPerDegree = 111840

    console.log('req.body')
    console.log(req.body)

    let centerLat = parseFloat(req.body.centerLat)
    let centerLng = parseFloat(req.body.centerLng)
    let radius = parseFloat(req.body.radius)

    // If we are to apply this application to the whole world,
    // Then we need to know which hemisphere it is in
    let hemisphere = 'NW'

    // North Hemisphere
    if (centerLat > 0 && centerLng < 0) {
        hemisphere = 'NW'
    }
    else if (centerLat > 0 && centerLng > 0) {
        hemisphere = 'NE'
    }
    else if (centerLat < 0 && centerLng < 0) {
        hemisphere = 'SW'
    }
    else if (centerLat < 0 && centerLng > 0) {
        hemisphere = 'SE'
    }


    // Callback:
    let offset = radius / metersPerDegree

    let latN = centerLat + offset
    let latS = centerLat - offset
    let lngW = centerLng - offset
    let lngE = centerLat + offset

    // Each has a different algorithm
    switch (hemisphere) {
        case 'NW':
            latN = centerLat + offset
            latS = centerLat - offset
            lngW = centerLng - offset
            lngE = centerLat + offset
            break;

        default:
            break;
    }

    MongoClient.connect('mongodb://localhost:27017/Homer', function (err, db) {
        if (err) throw err;
        var dbo = db.db("Homer");

        dbo.collection("property").find({
            // _id: ObjectId(req.session.user_sid),
            lat: { $lt: latN, $gt: latS },
            lng: { $lt: lngE, $gt: lngW },
        }).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            console.log('result')
            console.log(result)
            db.close();
            res.end(res.send(result))
        });

    })

})



server.post('/get_scheduled_visits', (req, res) => {
    console.log('/get_scheduled_visits req.body')
    // console.log(req.body)
    console.log(req.body.user_email)

    MongoClient.connect('mongodb://localhost:27017/Homer', function (err, db) {
        if (err) throw err;
        var dbo = db.db("Homer");

        dbo.collection("user").find({
            'user_email': req.body.user_email
        }).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            console.log('result')
            console.log(result[0].scheduled_visits)
            db.close();
            res.end(res.send(result[0].scheduled_visits))
        });

    })

})

// server.get('/get_scheduled_visits', (req, res) => {
//     console.log('/get_scheduled_visits req.body')
//     console.log(req.body)
//     console.log(req.body.user_email)

//     MongoClient.connect('mongodb://localhost:27017/Homer', function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("Homer");

//         dbo.collection("property").find({
//             'owner.owner_email': 'jsteiner@domomi.com'
//         }).toArray(function (err, result) {
//             if (err) throw err;
//             // console.log(result);
//             console.log('result')
//             console.log(result)
//             db.close();
//             res.end(res.send(result))
//         });

//     })

// })

server.get('/playVideo/:post_id/:room_id', function (req, res) {
    console.log('id---------------------347')
    console.log(req.params.id)
    const path = 'Video/' + req.params.post_id + '/' + req.params.room_id + '.mp4'
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



// Video streaming
server.get('/fetchVideo/:user_email/:file_name', function (req, res) {
    console.log('id---------------------347')
    console.log(req.params.file_name)
    const path = 'Video/' + req.params.user_email + '/' + req.params.file_name
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












server.post('/get_video_links', (req, res) => {
    console.log('req.body.post_id')
    console.log(req.body.post_id)
    console.log(req.body.room_id)
    let room_id = parseInt(req.body.room_id)
    MongoClient.connect('mongodb://localhost:27017/Homer', function (err, db) {
        if (err) throw err;
        var dbo = db.db("Homer");

        dbo.collection("posts").find({
            'post_id': req.body.post_id,
            'rooms': { '$elemMatch': { 'room_id': room_id } }
        }).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            console.log('result')
            console.log(result[0])
            db.close();
            res.end(res.send(result[0].rooms))
        });

    })
})

server.post('/schedule_a_visit', (req, res) => {
    console.log('The user JudaoZhong@gmail.com scheduled a visit at')
    console.log(req.body.date)
    console.log('and is successful.')
    res.end()
})


server.post('/add_hash_tag', (req, res) => {
    let added_hashtag = req.body.hash_tag

    MongoClient.connect('mongodb://localhost:27017/Homer', function (err, db) {
        if (err) throw err;
        var dbo = db.db("Homer");

        //find the user by session ID
        // dbo.collection("testObj").insertOne(
        //     { hash_tags: added_hashtag }
        // )

        dbo.collection("testObj").updateOne(
            { hash_tags: added_hashtag },
            {
                // $set : { hash_tags : added_hashtag },
                $inc: { occurance: 1 }
            }
            ,
            { upsert: true }

        )
    })
    res.end()

})

server.get('/get_hash_tag', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/Homer', function (err, db) {
        if (err) throw err;
        var dbo = db.db("Homer");

        dbo.collection("testObj").find({

        }).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            console.log('result')
            console.log(result)
            db.close();
            res.end(res.send(result))
        });

    })
})

server.post('/submit_upload_info', (req, res) => {
    console.log(new Date())
    console.log('submit_upload_info')
    console.log(req.body)
    let videoInfo = req.body
    MongoClient.connect('mongodb://localhost:27017/Homer', function (err, db) {
        if (err) throw err;
        var dbo = db.db("Homer");

        dbo.collection("user").updateOne(
            // THE USER'S NAME
            {},
            { $set: { 'video_listings': videoInfo } },
            { upsert: true }
        )

    })
})

server.post('/view_upload_info', (req, res) => {
    let user_email = req.body.user_email
    console.log('user_email' + user_email)
    MongoClient.connect('mongodb://localhost:27017/Homer', function (err, db) {
        if (err) throw err;
        var dbo = db.db("Homer");

        dbo.collection("user").findOne(
            // THE USER'S NAME
            { user_email: user_email },


        ).then((result) => {
            console.log('result 498')
            console.log(result.video_listings.data)
            let archived_upload_info = result.video_listings.data
            res.end(res.send(archived_upload_info))
        })

    })
})



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('req')
        console.log(req)
        cb(null, 'HashTagPictures')
    },
    filename: function (req, file, cb) {
        console.log('req 569')
        console.log(req)
        cb(null, '' + chosen_marker_id)
    }
})

var upload = multer({ storage: storage })

var chosen_marker_id
server.post("/upload_hashtag_picture", upload.single('image'), (req, res, next) => {
    // console.log(req.files)
    chosen_marker_id = req.body.chosen_marker_id
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.end(res.send('success!'))

})

server.post('/uploaded_hashtag_picture', (req, res) => {
    console.log('req.body')
    console.log(req.body)
    res.end(res.send(`/HashTagPictures/${req.body.chosen_marker_id}`))
})

server.get('/:folderName/:fileName', (req, res) => {
    var img = fs.readFileSync(`./${req.params.folderName}/${req.params.fileName}`);
    console.log(req.params.folderName)
    console.log(req.params.fileName)
    res.end(img, 'binary')
})

server.post('/:folderName/:fileName', (req, res) => {
    var img = fs.readFileSync(`./${req.params.folderName}/${req.params.fileName}`);
    if (img) {
        res.end('Yes')
    } else {
        res.end()
    }

})

server.post('/upload_hashtag_picture2', function (req, res) {
    var form = new formidable.IncomingForm();
    var fileName = null
    form.parse(req, (err, field, files) => {
        fileName = field.chosen_marker_id
        if (err) next(err);
        console.log(files.image.path)
        console.log(fileName)
        // TODO: make sure my_file and project_id exist    
        // fs.rename(files.image.path, fileName, function(err) {
        //     if (err) next(err);
        //     res.end();
        // });
        console.log(__dirname + '\\HashTagPictures\\' + fileName)
        fs.rename(files.image.path, __dirname + '\\HashTagPictures\\' + fileName, function (err) {

            // res.end();
        });
    });

    form.on('fileBegin', function (name, file) {
        console.log(name)
        console.log(fileName)
        file.path = __dirname + '\\HashTagPictures\\' + file.name;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file);
        console.log(file)

    });



    res.end(res.send('success!'))
})

server.post('/temporary_user', (req, res) => {
    console.log(req.body)
    res.send('lol!')
    res.end()
})

server.get('/test', (req, res) => {
    res.send('testing....')
    res.end()
})
