import React, { Component, Fragment } from 'react'
// import DragSortableList from 'react-drag-sortable'
import $ from 'jquery'
import { Divider } from '@material-ui/core'
// import { Container, Draggable } from 'react-smooth-dnd';
import Sortable from 'sortablejs';
import socketIOClient from 'socket.io-client'

// Render different components for different routes
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


// Components
import Clip from './Listing/Components/Clip'
import MarkerType from './MarkerType'

// listing rooms
import homesvg from './img/home_listing.svg'
import bathroom from './Listing/img/bathroom.svg'
import bedroom from './Listing/img/bedroom.svg'
import livingroom from './Listing/img/livingroom.svg'

// 
import recordBtn from './Listing/img/recordBtn.svg'
import UploadDraggableBox from './Listing/UploadDraggableBox';

import { useAuth0 } from '@auth0/auth0-react';




// This ID increments
let videoID = 0
var videoFiles = []
var classRef

const styles = {
    Create: {
        maxHeight: '90vh',
        width: '95vw',
        color: 'white',
        backgroundColor: 'rgba(44,44,44,0.7)',
        position: 'absolute',
        zIndex: '2',
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
        flexDirection: 'row',
        display: 'flex',
        width: '95vw',
        margin: '0',
        maxWidth: '95vw',
        flexWrap: 'wrap'
    }
}




// Variables used for socket.io operations:

// Here is the file we are currently dealing with:
var SelectedFile;

// The array of files piled up to be processed
var FileArray = []

// Connect to react using react's socketIOClient ENDPOINT
var socket;
var FReader;
var Name;

const ENDPOINT = "localhost:8080";
socket = socketIOClient(ENDPOINT);
export class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomTypeChoice: {
                show: true, stepTitle: 'CREATE',
                description: 'Join the housing community by sharing your available home with people using Homer',
                noticeP: 'Select each room before or after filming the video, you can have multiple rooms for each catagory',
            },


            // disable instructions
            instructionsDisabled: false,

            // 
            instruction_1: { show: false, text: 'Film the room from left to right' },
            instruction_2: { show: false, text: 'Click on the "Record" button to start recording' },
            instruction_3: { show: false, text: 'After you have recorded your video, click on the "√" to finish' },
            videoManipulation: false,

            // roomTypeOnhold
            roomTypeOnHold: this.props.roomTypeOnHold

            // The videos will be put here
            , videoSeries: []
            , videoDisplayArr: []

        }

        // Class Ref is essentially the 'this' keyword in constructor.
        classRef = this

        this.VideoUploadBoxDRef = React.createRef()









    }



    FileChosen(evnt) {
        // File Array should not be equal to the target files,
        // instead it should push the files in.
        let newFiles = evnt.target.files
        for (var file of newFiles) {
            FileArray.push(file);
        }

        console.log("FileArray")
        console.log(FileArray)
        SelectedFile = evnt.target.files[0];
        document.getElementById('NameBox').value += SelectedFile.name;
    }

    StartUpload() {
        if (FileArray != [] || document.getElementById('FileBox').value != "") {
            console.log('StartUpload')
            // console.log(document.getElementById('FileBox').value)
            FReader = new FileReader();

            Name = document.getElementById('NameBox').value;
            console.log('Name')
            console.log(Name)
            var Content = "<span id='NameArea'>Uploading " + SelectedFile.name + " as " + Name + "</span>";
            Content += '<div id="ProgressContainer"><div id="ProgressBar"></div></div><span id="percent">0%</span>';
            Content += "<span id='Uploaded'> - <span id='MB'>0</span>/" + Math.round(SelectedFile.size / 1048576) + "MB</span>";
            document.getElementById('UploadArea').innerHTML += Content;

            FReader.onload = function (evnt) {
                socket.emit('Upload', { 'Name': Name, Data: evnt.target.result });
                console.log('Upload')
            }

            console.log('emit Start')
            socket.emit('Start', { 'Name': Name, 'Size': SelectedFile.size });
        }
        else {
            alert("Please Select A File");
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
        socket = socketIOClient(ENDPOINT);
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


    }



    componentDidUpdate() {
        console.log('this.VideoUploadBoxDRef')
        console.log(this.VideoUploadBoxDRef)
    }

    getRoomType(roomType) {
        console.log(`roomType`)
        console.log(roomType)


        $.when(
            this.setState({ roomTypeOnHold: roomType })
        )
            .then(() => {
                console.log('this.state.roomTypeOnHold')
                console.log(this.state.roomTypeOnHold)
                // this.setState({ videoRecord: true })
                this.toggleComponent('videoRecord');

            })
            .then(() => {
                this.toggleComponent('instruction_1');

            })
    }







    goBack() {
        this.props.history.goBack();
    }

    disableInstructions() {
        classRef.setState({ instructionsDisabled: true })

        $('#disableInstructionsBtn').hide()
    }

    render() {
        const { instruction_1, instruction_2, instruction_3, roomTypeChoice } = this.state

        return (
            <Fragment>
                <div style={styles.Create}>

                    <Router>
                        <Route exact path='/HomerMap/Create/AddHomeListing' >

                            <Fragment>
                                <h3>{this.state.stepTitle}</h3>
                                <Divider variant="middle" color='white' />
                                <h4>{this.state.roomTypeChoice.stepName}</h4>
                                <p>{this.state.roomTypeChoice.description}</p>




                                <div id='beaconInstruction' style={styles.beaconInstructionsBtnDiv}>

                                    <MarkerType text='home listing' pic={homesvg} function='map_chat' onIt='true' />



                                    <Divider variant="middle" color='white' />

                                    <Link to='/HomerMap/Create/AddHomeListing/1'>
                                        <div style={styles.middleButtonsDiv}>
                                            <MarkerType style={styles.beaconBtn} text='living' pic={livingroom} function='filmLivingRoom' roomType='livingroom' onClick={(e) => this.getRoomType('livingroom')} />
                                            <MarkerType text='bedroom' pic={bedroom} function='filmBedroom' roomType='bedroom' onClick={(e) => this.getRoomType('bedroom')} />
                                            <MarkerType text='bathroom' pic={bathroom} function='filmBathroom' roomType='bathroom' onClick={(e) => this.getRoomType('bathroom')} />
                                        </div>
                                    </Link>

                                    <Divider variant="middle" color='white' />
                                </div>

                            </Fragment>
                        </Route>



                        <Route path='/HomerMap/Create/AddHomeListing/1' >
                            <div>
                                <p>{this.state.instruction_1.text}</p>
                                <Link to='/HomerMap/Create/AddHomeListing/2' style={{ color: 'inherit', textDecoration: 'inherit' }}> <button>Next</button></Link>

                            </div>
                        </Route>

                        <Route path='/HomerMap/Create/AddHomeListing/2' >
                            <div>
                                <p>{this.state.instruction_2.text}</p>
                                <Link to='/HomerMap/Create/AddHomeListing/3' style={{ color: 'inherit', textDecoration: 'inherit' }}><button>Next</button></Link>

                            </div>
                        </Route>

                        <Route path='/HomerMap/Create/AddHomeListing/3'>
                            <Fragment>

                                <div id='disableInstructionsBtn'>
                                    <p>{this.state.instruction_3.text}</p>
                                    <button onClick={this.disableInstructions} >No need to show instructions again</button>

                                </div>
                                <Link to='/HomerMap/Create/AddHomeListing/UploadDraggableBox'><button>next</button></Link>

                            </Fragment>
                        </Route >

                        <Route path='/HomerMap/Create/AddHomeListing/UploadDraggableBox'>
                            <UploadDraggableBox ref={this.VideoUploadBoxDRef} />

                        </Route>


                    </Router >



                    <Fragment>
                        <p style={styles.noticeP}>{this.state.roomTypeChoice.noticeP}</p>
                        <Link to='/HomerMap' style={{ color: 'inherit', textDecoration: 'inherit' }}><span style={styles.closeBtn}>CLOSE to cancel</span></Link>

                    </Fragment>

                </div>
            </Fragment>
        )
    }
}
export default Listing