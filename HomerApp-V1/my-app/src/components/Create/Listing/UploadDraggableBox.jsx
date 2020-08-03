import React, { Component, Fragment } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Sortable from 'sortablejs';
import socketIOClient from 'socket.io-client'
import $ from 'jquery'
import recordBtn from './img/recordBtn.svg'
import { Link, Redirect } from 'react-router-dom'
// Components
import Clip from './Components/Clip'


import bathroom from '../Listing/img/bathroom.svg'
import bedroom from '../Listing/img/bedroom.svg'
import livingroom from '../Listing/img/livingroom.svg'

import MarkerType from '../MarkerType'


import { withAuth0 } from '@auth0/auth0-react';
import { updateVideoOrder, selectVideo, setVideoStartTime, setVideoEndTime, selectRoomType, setVideoInfo, updateVideoMapOrder, updateVideoSeriesInfo, axiosPostVideoListing } from '../../../actions/postActions'

import { connect } from 'react-redux';
import store from '../../../store';

// Variables used for socket.io operations:

// Here is the file we are currently dealing with:
var SelectedFile;

// The array of files piled up to be processed
var FileArray = []
var FileArrayArchived = []

// Connect to react using react's socketIOClient ENDPOINT
var socket;
var FReader;
var Name = '????????';

// This ID increments
let videoID = 0
var videoFiles = []
var classRef


socket = socketIOClient(process.env.REACT_APP_SOCKET_IO_ENDPOINT);
FReader = new FileReader();


// const styles = theme => ({
//     root: {
//       backgroundColor: "red"
//     
//   });





class UploadDraggableBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videoSeries: []
            , videoDisplayArr: []
            // A variable to see if the roomtypes are being chosen
            , roomTypeChosenBool: false
            // See if the user has chosen a file
            , videoFileChosenBool : false
        }
        classRef = this
        // this.uploadNextFile = this.uploadNextFile.bind(this)

    }

    getRoomType(roomType) {
        // console.log(roomType)
        let roomIcons = $('#roomIcons')
        roomIcons.hide()
        this.props.selectRoomType(roomType)
        this.setState({ roomTypeChosenBool: true })
    }

    uploadNextFile() {
        console.log(FileArray)

        // Love how Jquery $.when() works
        // So handy a tool!
        $.when().then(FileArray.shift())
        .then(() => {
            console.log(FileArray)
            SelectedFile = FileArray[0]

        }).then(
           ()=> classRef.StartUpload()
     )
        // console.log("Shifted FileArray")
        // console.log(FileArray)

     
        // document.getElementById('FileBox').value = FileArray[0]
        // document.getElementById('NameBox').value = FileArray[0].name

    }

    UpdateUploadInfo() {
        async function a() {

            let obj = classRef.state.videoSeries

            let reordered_videos = document.getElementById('draggableVideos').childNodes

            let i = 0;
            console.log(reordered_videos)
            reordered_videos.forEach(element => {

                console.log('element')
                let link = element.firstChild.firstChild.src
                for (var j = 0; j < obj.length; j++) {

                    if (obj[j].selected_video == link) {
                        obj[j].videoID = i
                    }
                }
                i++

            })
            return obj
        }
        $.when(
            a()
        ).then((obj) => {
            console.log("then")
            console.log(obj)
            let videoSeries = { 'videoSeries': this.state.videoSeries }
            $.ajax({
                type: "post",
                url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/submit_upload_info`,
                data: videoSeries,

                success: function (response) {
                    console.log(response)
                    console.log(process.env.REACT_APP_EXPRESS_ENDPOINT)
                }
            });
            console.log(this.state.videoSeries)
            console.log(this.state.videoDisplayArr)
        })

    }


    FileChosen(evnt) {
        // File Array should not be equal to the target files,
        // instead it should push the files in.
        let newFiles = evnt.target.files
        for (var file of newFiles) {
            FileArray.push(file);
            console.log('file 159')
            console.log(file.name)
            FileArrayArchived.push(file.name)
        }

        console.log("FileArray")
        console.log(FileArray)
        SelectedFile = FileArray[0];
        document.getElementById('NameBox').value += SelectedFile.name;
        classRef.setState({ roomTypeChosenBool: false })
        classRef.setState({ videoFileChosenBool: false })
    }

    StartUpload() {
        if ( FileArray.length === 0){
            socket.emit('ClearTEMP',FileArrayArchived)
            console.log(FileArrayArchived)
        }
        console.log(FileArray.length)
        console.log('StartUpload()')
        console.log(FileArray)
        console.log(SelectedFile)
        // console.log(document.getElementById('FileBox').value)
        if (FileArray !== [] ) {

            const { user } = classRef.props.auth0;
            console.log(user)

            console.log('StartUpload')
            // console.log(document.getElementById('FileBox').value)


            // Name = document.getElementById('NameBox').value;
            Name = SelectedFile.name
            console.log(`Name ${Name}`)

            var Content = "<span id='NameArea'>Uploading " + SelectedFile.name + "</span>";
            Content += '<div id="ProgressContainer"><div id="ProgressBar"></div></div><span id="percent">0%</span>';
            Content += "<span id='Uploaded'> - <span id='MB'>0</span>/" + Math.round(SelectedFile.size / 1048576) + "MB</span>";
            document.getElementById('UploadArea').innerHTML += Content;

            FReader.onload = function (evnt) {
                socket.emit('Upload', { 'Name': Name, Data: evnt.target.result, 'User': user });
                console.log('Uploading')
            }


            console.log('emit Start')
            console.log(Name)
            socket.emit('Start', { 'Name': Name, 'Size': SelectedFile.size, 'User': user });
        }

        else {
            alert("Please Select A File");
            console.log('files done')
            console.log(0)
        }
    }



    UpdateBar(percent) {
        document.getElementById('ProgressBar').style.width = percent + '%';
        document.getElementById('percent').innerHTML = (Math.round(percent * 100) / 100) + '%';
        var MBDone = Math.round(((percent / 100.0) * SelectedFile.size) / 1048576);
        document.getElementById('MB').innerHTML = MBDone;
    }


    // Socket.io on load
    componentDidMount() {
        console.log('socketIO')
        console.log(process.env.REACT_APP_EXPRESS_ENDPOINT)
        socket = socketIOClient(process.env.REACT_APP_SOCKET_IO_ENDPOINT);
        // 
        console.log('socket')
        console.log(socket)

        socket.on('MoreData', function (data) {
            // Uses update function in the class.
            classRef.UpdateBar(data['Percent']);

            var Place = data['Place'] * 524288; //The Next Blocks Starting Position
            var NewFile; //The Variable that will hold the new Block of Data
            if (SelectedFile.webkitSlice)
                NewFile = SelectedFile.webkitSlice(Place, Place + Math.min(524288, (SelectedFile.size - Place)));
            else if (SelectedFile.mozSlice)
                NewFile = SelectedFile.mozSlice(Place, Place + Math.min(524288, (SelectedFile.size - Place)));
            else {
                try {
                    NewFile = SelectedFile.slice(Place, Place + Math.min(524288, (SelectedFile.size - Place)));
                } catch (e) {
                    alert(e)
                }

            }

            FReader.readAsBinaryString(NewFile);
        });


        // videos are sortable
        let draggableVideos = document.getElementById('draggableVideos')
        new Sortable(draggableVideos, {
            animation: 155,
            sort: true,  // sorting inside list
            direction: 'horizontal',

            onUpdate: function (evt) {
                console.log(evt.from)

                let draggableVideos = document.getElementById('draggableVideos').childNodes
                let videoMapOrder = []
                $.when(
                    draggableVideos.forEach(function (el, index) {
                        // the nth index stores the right obj's videoLink
                        videoMapOrder.push(el.firstChild.firstChild.src)
                        console.log(index)
                        console.log(el.firstChild.firstChild.src)
                        el.setAttribute('videoID', index);
                        console.log(evt.from.childNodes)

                    })
                ).then(() => {

                    classRef.props.updateVideoMapOrder(videoMapOrder)
                }).then(() => classRef.props.updateVideoSeriesInfo())

                // 
            },
        });

        document.getElementById('UploadButton').addEventListener('click', classRef.StartUpload);
        document.getElementById('fileUploadInput').addEventListener('change', classRef.FileChosen);


        // Later we can add these Modals
        var Path = `${process.env.REACT_APP_EXPRESS_ENDPOINT}`;
        socket.on('Done', function (data) {
            
            var Content = "Video Successfully Uploaded !!"
            // Content += "<img id='Thumb' src='" + Path + data['Image'] + "' alt='" + Name + "'><br>";
            // Content += "<button  type='button' name='Upload' value='' id='Restart' class='Button'>Upload Another</button>";


            try {
                console.log('Next File!')
                classRef.uploadNextFile()
                document.getElementById('UploadArea').innerHTML += Content;
            }
            catch (e) {
                console.log(e)
            }
            // finally {
            //     window.location.href = '/Profile'
            // }

            // document.getElementById('Restart').addEventListener('click', Refresh);
            classRef.setState({refreshBool : true})
        });









        let fileUploadInput = document.getElementById('fileUploadInput')
        fileUploadInput.onchange = setFileInfo
        let roomIcons = document.getElementById('roomIcons')
        // $(roomIcons).hide()

        $(fileUploadInput).hide()
        $('#recordBtn').click(() => {
            if (classRef.state.roomTypeChosenBool) {
                $(fileUploadInput).click()
            }
            else {
               this.setState({roomTypeChosenBool:true})
            }

        })



        let roomType = this.state.roomTypeOnHold

        let startTime = 0
        let endTime = 0
        function setFileInfo() {
            // the first item to be selected will be dealt with
            var files = this.files;

            // array gets populated by the file
            videoFiles.push(files[0]);

            /* Need to get a video's duration:
                To Achieve this, we need to create a <video> element
                then make the <video> element load the [videoLink]
                and we will get the duration there
            */

            var video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = function () {
                var duration = video.duration;
                // Duration is set into the array.
                videoFiles[videoFiles.length - 1].duration = duration;
                endTime = duration

                // End time
                classRef.props.setVideoEndTime(endTime)

            }
            $(video).hide()

            // An important attribute to throw into states.
            var videoLink = video.src = URL.createObjectURL(files[0]);
            classRef.props.selectVideo(videoLink)
            // classRef.props.selectVideo(videoLink)
            console.log(`VIDEO NAME 307 ${files[0].name} `)
            console.log(videoLink)

            var newVideoObject = { videoID: videoID, selected_room_type: store.getState().posts.selected_room_type, selected_video: videoLink, video_start_time: startTime, video_end_time: store.getState().posts.video_end_time, file_name: files[0].name }

            console.log('roomType')
            console.log(roomType)
            // upload this obj to the store.
            classRef.props.setVideoInfo(newVideoObject)


            videoID++
            console.log(newVideoObject)

            // Class Ref is essentially the 'this' keyword in constructor.
            $.when(classRef.setState(prevState => ({
                videoSeries: [...prevState.videoSeries, newVideoObject]
            }))
            ).then(() => {
                console.log('this.state.videoSeries')
                console.log(this.state.videoSeries)

            })
            // document.getElementById('redirectBackToRoomType').click()

        }










    }






    mountedOneVideo() {
        localStorage.clear()
        localStorage.setItem('videoSeries', classRef.videoSeries)
    }




    render() {
        return (
            <div style={styles.UploadDraggableBox}>
                <div >
                    <input id='fileUploadInput' type="file" name="video" accept="video/*" capture="capture" multiple='ture' />

                    <img id='recordBtn' style={{ maxWidth: '50px', background: 'red', borderRadius: '100%' }} alt='press to record' src={recordBtn} />

                    { (this.state.roomTypeChosenBool && !this.state.videoFileChosenBool) &&
                        <div id='roomIcons' style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'inline-flex',
                            flexDirection: 'row'
                        }}>
                            <span>{this.state.roomTypeChosenBool}</span>
                            <span>{this.state.videoFileChosenBool}</span>
                            <MarkerType style={styles.beaconBtn} text='living' pic={livingroom} function='filmLivingRoom' roomType='livingroom' onClick={(e) => this.getRoomType('livingroom')} />
                            <MarkerType text='bedroom' pic={bedroom} function='filmBedroom' roomType='bedroom' onClick={(e) => this.getRoomType('bedroom')} />
                            <MarkerType text='bathroom' pic={bathroom} function='filmBathroom' roomType='bathroom' onClick={(e) => this.getRoomType('bathroom')} />
                        </div>}


                    <div>Click to start recording</div>
                    <button id='UploadButton' onClick={() => classRef.props.axiosPostVideoListing()}
                    >UploadButton</button>
                    <p id='NameBox'></p>
                    <p id='UploadArea'></p>
                </div>

                <div id='draggableVideos' style={styles.draggableVideos}>
                    {/* List Render the Clips into the div */}


                    {this.state.videoSeries.map((videoInfo, index) => {

                        return (
                            <Fragment>
                                <Clip url={videoInfo.selected_video} roomType={videoInfo.selected_room_type} key={videoInfo.videoID} id={videoInfo.videoID} className='draggableVideos' />
                            </Fragment>


                        );


                    })}

                </div>
            </div >
        )
    }
}


const styles = {
    UploadDraggableBox: {
        maxHeight: '90vh',
        width: '95vw',
        color: 'white',
        backgroundColor: 'rgba(44,44,44,0.7)',
        position: 'relative',
        zIndex: '5',
        margin: '0 3vw 0 3vw'


    }
    ,
    ButtonContainer: {
        display: 'inline-flex'
    },
    moreFunctionsBtn: {
        fontSize: '12pt',
        background: 'rgb(200,100,5)',
        color: 'white',
        margin: '15vh 5vw 5vh'
    },

    noticeP: {
        margin: '8vh 15vw 5vh 15vw ',
        fontSize: '8pt'
    },
    closeBtn: {
        fontWeight: '600'
    },

    // Beacon Instructions
    beaconInstructionsBtnDiv: {
        // textAlign: 'center',
        // display: 'flex',
        // flexDirection: 'column'
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    middleButtonsDiv: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'inline-flex',
        flexDirection: 'row'
    },

    // Beacon Setup
    beaconConfigurationDiv: {
        margin: '0 3vw 0 3vw',
        position: 'fixed',
        bottom: '0',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
    },

    setupBeaconText: {
        color: 'black',
    },

    radiusModeSpan: {
        color: 'black'
    },

    radiusDescription: {
        color: 'black',
        fontWeight: 500
    },
    descriptionContainer: {
        minWidth: '85%',
        maxWidth: '85%',
        display: 'inline-flex',
        textAlign: 'left'
    },
    radio: {
        float: 'right',
        marginTop: '40px'
    },

    onIt: {
        // background : 'green'
        textAlign: 'center',
        display: 'block',
        width: '100%'
    },
    beaconBtn: {
        textAlign: 'center'
    },

    draggableVideos: {
        zIndex: '5',
        flexDirection: 'row',
        display: 'flex',
        width: '95vw',
        margin: '0',
        maxWidth: '95vw',
        flexWrap: 'wrap'
    }
}

export default connect(null, { updateVideoOrder, selectVideo, setVideoStartTime, setVideoEndTime, selectRoomType, setVideoInfo, updateVideoMapOrder, updateVideoSeriesInfo, axiosPostVideoListing })(withStyles(styles, { withTheme: true })(withAuth0(UploadDraggableBox)));