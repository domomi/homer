import React, { Fragment } from 'react';
import $ from 'jquery'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import default_picture from './img/default_picture.png'
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center',
    display: 'flex',
    position: 'fixed',
    bottom: '13vh',
    maxWidth: '95vw',

  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },

  // Modal
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  picture: {
    minWidth: '70vw',
    maxWidth: '80vw'
  }



}));

export default function HashTagConfigCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const pictureChosen = () => {
    console.log('pic chosen')
  }

  const handleSubmit = (e) => {
    console.log(e)
    console.log(e.target)
    e.preventDefault();
    console.log($('form')[0])
    let data = new FormData($('form')[0])
    console.log($('#upload_hashtag_picture_form').serialize())
    console.log($('#pictureUploadInput').serialize())
    console.log(data)
    $.ajax({
      url: $('#upload_hashtag_picture_form').attr("action"),
      type: 'POST',
      data: data,
      processData: false,
      contentType: false,
      beforeSend: function () {
        $("#message").html("sending...");
      },
      // contentType: 'text',
      success: function (data) {
        console.log(data)
        // $("#message").hide();
        $("#message").html('data');
      },
      error: (e) => {
        console.log(e)
        $("#message").html(e);
      }
    });

  }

  const handleOpen = () => {
    if (props.image === default_picture) {
      console.log('upload new picture')
      $.when()
        .then(() => setOpen(true))
        .then(() => {
          document.getElementById('pictureUploadInput').click()
        }).then(()=>{
          console.log('get')
          $.ajax({
            type: "post",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/uploaded_hashtag_picture`,
            data: {'chosen_marker_id': props.chosen_marker_id},
            
            success: function (response) {
              console.log()
                $('#hashtagPic').attr('src',`${process.env.REACT_APP_EXPRESS_ENDPOINT}${response}`)
            }
          })
        })


    }
    else {
      $.ajax({
        type: "get",
        url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/uploaded_hashtag_picture`,
        data: props.chosen_marker_id,
        dataType: "dataType",
        success: function (response) {
            console.log(response)
        }
    });
      
      setOpen(true);
    }


  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();


  return (
    <Fragment>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
             Descriptions Here
          </Typography>
          </CardContent>
          {/* <div className={classes.controls}>
            <IconButton aria-label="previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </div> */}
        </div>
        <CardMedia
          className={classes.cover}
          image={props.image}
          title={props.title}
          onClick={handleOpen}
        />
      </Card>


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">#{props.title}</h2>
            <img id='hashtagPic' alt='Click Me To Upload New Picture!' className={classes.picture} src={props.image} />

            <form onSubmit={handleSubmit} action={`${process.env.REACT_APP_EXPRESS_ENDPOINT}/upload_hashtag_picture2`} method='post' id='upload_hashtag_picture_form' enctype="multipart/form-data">
            <input style={{ display: 'none' }} name="chosen_marker_id" type='text' value={props.chosen_marker_id}/>
              <input style={{ display: 'none' }} onChange={pictureChosen} id="pictureUploadInput" type="file" name="image" accept="image/*" capture="capture" multiple="false" />
              
              <div className='fireUpload' >
                <input type="submit" value="Submit" />
                <Button >Abandon</Button>
              </div>

              <div className='chooseFile' >
                <Button >📷Upload📹</Button>
                <Button >Abandon</Button>
              </div>

            </form>
            <p id='message'></p>

          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
}