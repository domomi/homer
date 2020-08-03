import React, { Component } from 'react'

import Sortable from 'sortablejs';
import socketIOClient from 'socket.io-client'
import $ from 'jquery'
import recordBtn from './img/recordBtn.svg'
// Components
import Clip from './Components/Clip'

import { withAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import { axiosFetchVideoListing } from '../../../actions/postActions'
import store from '../../../store';
// Variables used for socket.io operations:

// Here is the file we are currently dealing with:
var SelectedFile;

// The array of files piled up to be processed
var FileArray = []

// Connect to react using react's socketIOClient ENDPOINT
var socket;
var FReader;
var Name = '????????';

// This ID increments
let videoID = 0
var videoFiles = []
var classRef

const ENDPOINT = process.env.REACT_APP_SOCKET_IO_ENDPOINT;
socket = socketIOClient(ENDPOINT);
FReader = new FileReader();
class ArchivedUploads extends Component {

    constructor(props) {
        super(props);
        this.state = {
            video_series_info: []
            // , videoDisplayArr: []
        }
        classRef = this
        // this.uploadNextFile = this.uploadNextFile.bind(this)
    }


    componentDidMount() {
        const { user } = classRef.props.auth0;
        console.log(user)
        console.log('48 mounted')
        classRef.props.axiosFetchVideoListing(user.email)
        let  user_email =  user.email
        $.ajax({
            type: "post",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/view_upload_info`,
            data: { user_email: user_email },
            dataType: "json",
            success: function (response) {
                let archived_video_series_info = response
                console.log(archived_video_series_info)
                classRef.setState({video_series_info : archived_video_series_info })
            }
        });

    }

    render() {

        return (
            <div style={styles.UploadDraggableBox}>
                <div >
                    <input id='fileUploadInput' type="file" name="video" accept="video/*" capture="capture" multiple='ture' />

                    <img id='recordBtn' style={{ maxWidth: '50px', background: 'red', borderRadius: '100%' }} alt='press to record' src={recordBtn} />
                    <div>Click to start recording</div>
                    <button id='UploadButton' onClick={() => this.UpdateUploadInfo()}>UploadButton</button>
                    <p id='NameBox'></p>
                    <p id='UploadArea'></p>
                </div>

                <div id='draggableVideos' style={styles.draggableVideos}>
                    {/* List Render the Clips into the div */}


                    {this.state.video_series_info.map((videoInfo, index) => {
                        const { user } = classRef.props.auth0;
                        console.log(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/Video/${user.email}/${videoInfo.file_name}`)
                        return (
                            
                            <Clip url={`${process.env.REACT_APP_EXPRESS_ENDPOINT}/fetchVideo/${user.email}/${videoInfo.file_name}`} roomType={videoInfo.selected_room_type} key={videoInfo.videoID} id={videoInfo.videoID} className='draggableVideos' />

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

export default connect(null, { axiosFetchVideoListing })(withAuth0(ArchivedUploads))