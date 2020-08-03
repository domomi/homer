import React, { Fragment } from 'react'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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
  }
}








function Clip({ url, roomType }) {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const videoControls = () => {
    var videoToControl = document.getElementById('videoDisplay')
    // Buttons
    var playButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute");
    var fullScreenButton = document.getElementById("full-screen");

    // Sliders
    var seekBar = document.getElementById("seek-bar");
    var volumeBar = document.getElementById("volume-bar");
    // Event listener for the play/pause button
    playButton.addEventListener("click", function () {
      if (videoToControl.paused == true) {
        // Play the video
        videoToControl.play();

        // Update the button text to 'Pause'
        playButton.innerHTML = "Pause";
      } else {
        // Pause the video
        videoToControl.pause();

        // Update the button text to 'Play'
        playButton.innerHTML = "Play";
      }
    });

    // Event listener for the mute button
    muteButton.addEventListener("click", function () {
      if (videoToControl.muted == false) {
        // Mute the video
        videoToControl.muted = true;

        // Update the button text
        muteButton.innerHTML = "Unmute";
      } else {
        // Unmute the video
        videoToControl.muted = false;

        // Update the button text
        muteButton.innerHTML = "Mute";
      }
    });


    // Event listener for the full-screen button
    fullScreenButton.addEventListener("click", function () {
      if (videoToControl.requestFullscreen) {
        videoToControl.requestFullscreen();
      } else if (videoToControl.mozRequestFullScreen) {
        videoToControl.mozRequestFullScreen(); // Firefox
      } else if (videoToControl.webkitRequestFullscreen) {
        videoToControl.webkitRequestFullscreen(); // Chrome and Safari
      }
    });


    // Event listener for the seek bar
    seekBar.addEventListener("change", function () {
      // Calculate the new time
      var time = videoToControl.duration * (seekBar.value / 100);

      // Update the video time
      videoToControl.currentTime = time;
    });


    // Update the seek bar as the video plays
    videoToControl.addEventListener("timeupdate", function () {
      // Calculate the slider value
      var value = (100 / videoToControl.duration) * videoToControl.currentTime;

      // Update the slider value
      seekBar.value = value;
    });

    // Pause the video when the slider handle is being dragged
    seekBar.addEventListener("mousedown", function () {
      videoToControl.pause();
    });

    // Play the video when the slider handle is dropped
    seekBar.addEventListener("mouseup", function () {
      videoToControl.play();
    });

    // Event listener for the volume bar
    volumeBar.addEventListener("change", function () {
      // Update the video volume
      videoToControl.volume = volumeBar.value;
    });
  }

  setTimeout(() => {
    videoControls()
  }, 3200);
  





  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit this video Clip</h2>

      <div id='videoDisplayDiv'>
        <video key={url} id="videoDisplay" style={styles.videoDiv}>
          <source src={url} type="video/mp4" />
        </video>
        <p>{roomType}</p>
      </div>

      <div id="video-controls">
        <button type="button" id="play-pause">Play</button>
        <input type="range" id="seek-bar" value="0" />
        <button type="button" id="mute">Mute</button>
        <input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1" />
        <button type="button" id="full-screen">Full-Screen</button>
      </div>

    </div>
  );







  return (
    <Fragment>


      <div style={styles.clip}>
        {/*NO controls autoPlay */}
        <video key={url} style={styles.videoDiv}>
          <source src={url} type="video/mp4" />
        </video>
        <p>{roomType}</p>
        <button type="button" onClick={handleOpen}>Edit Video</button>
      </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>


    </Fragment>
  );
}

export default Clip