import React, { Fragment, useEffect } from 'react'
import { Modal, Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery'
import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectVideo, setVideoStartTime, setVideoEndTime, updateSeekBarCurrentTime, updateVideoSeriesInfo, updateVideoOrder } from '../../../../actions/postActions'

import store from '../../../../store';

import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';

// import { sortable } from 'react-sortable';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



const styles = {
  videoDiv: {
    width: '30vw',
    marginLeft: '1vw'
  },
  clip: {
    display: 'inline-flex',
    flexDirection: 'column'
  },
  videoEditingDiv: {
    width: '80vw',
    marginLeft: '1vw'
  },

}






const videoToControlRef = React.createRef()

function Clip({ url, roomType, selectVideo, setVideoStartTime, setVideoEndTime, updateSeekBarCurrentTime, updateVideoSeriesInfo, updateVideoOrder }) {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (e) => {
    // The blob link of the video
    console.log('e.target.parentNode.firstChild')
    console.log(e.target.parentNode.firstChild.firstChild.src)
    let currentVideoLink = e.target.parentNode.firstChild.firstChild.src
    selectVideo(currentVideoLink)

    selectVideo(url)
    // updateVideoOrder(currentVideoID)




    console.log('sliders')





    $.when(setOpen(true)).then(() => {
      // console.log(document.getElementById('sliders'))


      // $( function() {
      //   $( "#sliders" ).slider({
      //     range: true,
      //     min: 0,
      //     max: 500,
      //     values: [ 75, 300 ],
      //     slide: function( event, ui ) {
      //       $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      //     }
      //   });
      //   $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      //     " - $" + $( "#slider-range" ).slider( "values", 1 ) );
      // } );





      var videoToControl = document.getElementById('videoDisplay')
      // Calculate the new time
      var time = videoToControl.duration
      // * (seekBar.value / 100);

      console.log('time')
      console.log(time)




      let prev_end_time 
      let prev_start_time
      noUiSlider.create(document.getElementById('sliders'), {
        start: [10, 30],
        behaviour: 'drag',
        connect: true,
        range: {
          'min': 0,
          'max': 100
        },
        // pips: {
        //   mode: 'steps',
        //   stepped: true,
        //   density: 4,


        // },

      }).on('update.one', function (e) {
        console.log('e.target')
        console.log(e.target)
        console.log(document.getElementsByClassName('noUi-handle-lower')[0].getAttribute('aria-valuenow'))
        console.log(document.getElementsByClassName('noUi-handle-upper')[0].getAttribute('aria-valuenow'))



        let start_end = document.getElementById('sliders').noUiSlider.get()
        let start = parseInt(start_end[0])
        console.log(`start: ${start}`)

        let end = parseInt(start_end[1])
        console.log(`end: ${end}`)


        var videoToControl = document.getElementById('videoDisplay')
        // Calculate the new time
        var end_time = videoToControl.duration * (end / 100);
        
        

        var start_time = videoToControl.duration * (start / 100);
 
        document.getElementsByClassName('noUi-handle-lower')[0].addEventListener('change', () => {
          console.log('lower')
        })

        document.getElementsByClassName('noUi-handle-upper')[0].addEventListener('change', () => {
          console.log('upper')
        })

        // document.getElementsByClassName('noUi-handle-upper')[0].addEventListener('mousedown',(e)=>{
        //   console.log(e.target)
        // })

        $(document.getElementsByClassName('noUi-handle-lower')[0]).mouseover(function () {
          console.log('lower')
        });

        $(document.getElementsByClassName('noUi-handle-upper')[0]).mouseover(function () {
          console.log('upper')
        });

        if (start_time == prev_start_time) {
          videoToControl.currentTime = end_time
          
        }
        else if(end_time == prev_end_time ) {
          videoToControl.currentTime = start_time
        }
        else{
          prev_start_time = start_time
          prev_end_time = end_time
        }
       


        console.log('time')
        console.log(`${start_time}   ${end_time}`)

        document.getElementById('showStartTime').innerHTML = `start_time ${start_time}`
        document.getElementById('showEndTime').innerHTML = `end_time ${end_time}`
      })


    })








  };

  // Sets the start of the video
  const setStart = () => {

    // setVideoStartTime(store.getState().posts.seek_bar_current_time)
    setVideoStartTime()

  }

  // Sets the end of the video
  const setEnd = (endTime) => {
    // setVideoEndTime(store.getState().posts.seek_bar_current_time)
    setVideoEndTime()

  }


  const handleClose = () => {
    $.when(

      updateVideoSeriesInfo()

    ).then(
      () => {

        // set all the info back to original
        // selectVideo(null)
        // setVideoStartTime(0)
        // setVideoEndTime(0.01)
        // close the tab
        setOpen(false);
      }
    )





  };


  const [play, setPlay] = React.useState(false);

  const handlePlay = () => {
    setPlay(true)
  }

  const handlePause = () => {
    setPlay(false)
  }


  const seek_bar_on_change = (e) => {

    var seekBar = e.target

    console.log(seekBar)

    var videoToControl = document.getElementById('videoDisplay')
    // Calculate the new time
    var time = videoToControl.duration * (seekBar.value / 100);

    console.log('time')
    console.log(time)

    updateSeekBarCurrentTime(time)

    // Update the video time
    videoToControl.currentTime = time;

    // Pause the video when the slider handle is being dragged
    seekBar.addEventListener("mousedown", function () {
      videoToControl.pause();
    });

    // Play the video when the slider handle is dropped
    seekBar.addEventListener("mouseup", function () {
      videoToControl.play();
    });


  }

  const change_volume = (e) => {
    var videoToControl = document.getElementById('videoDisplay')

    const volumeBar = e.target
    videoToControl.volume = volumeBar.value;

  }

  const play_pause_on_click = (e) => {
    console.log('play_pause_on_click')
    console.log(e.target.id)

    var videoToControl = document.getElementById('videoDisplay')

    setPlay(!play)
    console.log(play)

    switch (play) {
      case true:
        videoToControl.play();
        $(e.target).html('pause')
        break
      case false:
        videoToControl.pause()
        $(e.target).html('play')
        break
    }


  }





  // Modal body
  const body = (
    <div style={{ maxWidth: "80vw" }} className={classes.paper}>
      <h2 id="simple-modal-title">Edit this video Clip</h2>

      <div id='videoDisplayDiv'>
        <video key={url} id="videoDisplay" style={styles.videoEditingDiv}>
          <source src={url} type="video/mp4" />
        </video>
        <p>{roomType}</p>
      </div>

      <div id="video-controls">
        <div>
          <button type="button" id="play-pause" onClick={(e) => play_pause_on_click(e)} play={false}>{play}</button>
          <input type="range" id="seek-bar" onChange={(e) => seek_bar_on_change(e)} />
        </div>


        <div className='rangeLiter' id='sliders' >


        </div>


        {/* <div>
        
          <button onClick={() => setStart()} >Video Start From Here</button>
          <button onClick={() => setEnd()}> Video Ends From Here</button>
        </div> */}



        {/* <button type="button" id="mute">Mute</button> */}

        <div>
          <label for='volume-bar'>Volume</label>
          <input type="range" id="volume-bar" min="0" max="1" step="0.1" onChange={(e) => change_volume(e)} />
          <div id='showStartTime'></div>
          <div id='showEndTime'></div>
        </div>


        {/* <button type="button" id="full-screen">Full-Screen</button> */}

      </div>

    </div>
  );







  return (
    <Fragment>


      <div style={styles.clip}>
        {/*NO controls autoPlay */}

        <video key={url} style={styles.videoDiv} ref={videoToControlRef}>
          <source src={url} type="video/mp4" />
        </video>

        <p>{roomType}</p>
        <button type="button" onClick={(e) => handleOpen(e)}>Edit Video</button>
      </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={styles.Modal}

      >
        {body}
      </Modal>


    </Fragment>
  );
}

export default connect(null, { selectVideo, setVideoStartTime, setVideoEndTime, updateSeekBarCurrentTime, updateVideoSeriesInfo, updateVideoOrder })(Clip)