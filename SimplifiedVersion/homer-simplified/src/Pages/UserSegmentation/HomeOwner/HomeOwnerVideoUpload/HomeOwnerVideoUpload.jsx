import React, { Component } from 'react'
import { Typography, Button } from '@material-ui/core';
import SocketIOFileUpload from 'socketio-file-upload'
import socketIOClient from 'socket.io-client'
import { withAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom'
import { withStyles, withTheme } from "@material-ui/core/styles";

import $ from 'jquery'

import LinearProgress from '@material-ui/core/LinearProgress';

import UploadProgressBar from './Components/UploadProgressBar'
import videoCameraPNG from './Components/videoCamera.png'
import store from '../../../../redux/store';

const styles = theme => ({
    videoCameraPNG: {
        maxWidth: '15vw'
    },
    customized_record_btn: {
        textAlign: 'center',
        borderStyle: 'dotted',
        maxWidth: '100vw'
    },
    skipBtn : {
        textAlign: 'center',
        position : 'fixed',
        bottom : '50px',
        left : '40vw'
    },
    UploadProgressBar : {
        textAlign : 'center'
    }
})

var classRef;
class HomeOwnerVideoUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // percentage of an upload
            progress: 0,
            // Redirect to the next step
            redirectToHomeOwnerMapBool: false
        }
        classRef = this
    }

    componentDidMount() {

        $(document).ready(() => {

            // The input is difficult to be styled, so Let's just hide it.
            $('#fileUploadInput').css('display', 'none')

            $('#fileUploadInput').css('display', 'none')

            $('#upload_progress_bar').css('display', 'none')


            $('#customized_record_btn').on('drag', (e) => {
                e.preventDefault()
            })


            $('#customized_record_btn').click((e) => {
                $(document.getElementById("fileUploadInput")).click()
            })

            // Initialize instances:
            var socket = socketIOClient(process.env.REACT_APP_EXPRESS_ENDPOINT);
            // var uploader = new SocketIOFileUpload(socket);
            var siofu = new SocketIOFileUpload(socket);


            // The first param is the button to click, the second one is input.
            siofu.listenOnSubmit(document.getElementById('file_upload_GO'), document.getElementById("fileUploadInput"));


            // Do something on upload progress:
            siofu.addEventListener("progress", function (event) {
                var percent = event.bytesLoaded / event.file.size * 100;
                console.log("File is", percent.toFixed(2), "percent loaded");
                classRef.setState({ progress: percent })
            });

            // Do something when a file is uploaded:
            siofu.addEventListener("complete", function (event) {
                console.log(event.success);
                console.log(event.file);
            });
        })
    }

    handleVideoInputChange(e) {
        console.log('handleVideoInputChange()')
        $('#upload_progress_bar').show()
        let file_arr = document.getElementById('fileUploadInput').files
        let file_name_arr = []
        $.when().then(() => {
            for (var idx in file_arr) {
                console.log('File Name :file_arr[idx].name')
                if (file_arr[idx].name && file_arr[idx].name != 'item') {
                    file_name_arr.push(file_arr[idx].name)
                }

            }
        })
            .then(() => {
                // FileName Array
                classRef.setState({
                    file_name_arr: file_name_arr
                })
            }).then(() => {
                console.log('classRef.state.file_name_arr')
                console.log(classRef.state.file_name_arr)
            })




    }

    handleUploadVideoInfo() {
        console.log('handleUploadVideoInfo()')
        const { user } = classRef.props.auth0;
        const files_uploaded_name_array = classRef.state.file_name_arr
        console.log(classRef.props)
        let data = { user: user, files_uploaded_name_array: files_uploaded_name_array }
        $.ajax({
            type: "POST",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/updateHomeOwnerListingVideoInfo`,
            data: data,
            dataType: "text",
            success: function (response) {
                console.log(response)
            }
        });
    }

    handleNext() {
        this.setState({ redirectToHomeOwnerMapBool: true })
    }

    

    handleSkip() {
        let data = {user_email : store.getState().user_obj.email}

        $.when()
            .then(() => {
                $.ajax({
                    type: "POST",
                    url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/HomeOwnerSkipVideoUpload`,
                    data: data,
                    dataType: "text",
                    success: function (response) {
                        console.log(response)
                        classRef.setState({ redirectToHomeOwnerMapBool: true })
                    }
                });
                
            })
            .then(() => {
                
            })

    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Typography>Add videos that show your home to renters</Typography>
                <Typography>Videos help people image the experience of <br />
                     living in your home before seeing it in real life. <br />
                     you can start with one and add more later
                </Typography>

                <div id='customized_record_btn' className={classes.customized_record_btn}>
                    <p>👇🏾Click Here To Record/Select a local video👇🏼</p>
                    <img className={classes.videoCameraPNG} src={videoCameraPNG} alt='click me to start recording!' />
                </div>

                <div>
                    <input onChange={(e) => this.handleVideoInputChange(e)} id='fileUploadInput' type="file" name="video" accept="video/*" capture="capture" multiple='ture' />


                </div>

                <div id='upload_progress_bar' className={classes.UploadProgressBar}>
                    <Button onClick={() => this.handleUploadVideoInfo()} id='file_upload_GO' variant='contained' color='secondary'>Upload the video</Button>
                    <UploadProgressBar progress={this.state.progress} />
                    {/* Upload is a success */}
                    {this.state.progress >= 99 && <Button variant='contained' color='secondary' onClick={() => this.handleNext()}>Next</Button>}


                </div>

                <div className={classes.skipBtn}>
                    <Button variant='contained' color='secondary' onClick={() => this.handleSkip()}>Skip</Button>
                </div>

                {this.state.redirectToHomeOwnerMapBool && <Redirect to='/HomeOwnerMap' />}



            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(withAuth0(HomeOwnerVideoUpload));