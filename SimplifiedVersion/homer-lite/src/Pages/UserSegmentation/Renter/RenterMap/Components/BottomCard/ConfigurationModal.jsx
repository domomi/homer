import React, { useState } from 'react';
import $ from 'jquery'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Backdrop, Button, Typography } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
// React Toggle
import Toggle from 'react-toggle'
import "react-toggle/style.css" // for ES6 modules

// Auth0
import { useAuth0 } from '@auth0/auth0-react';


const useStyles = makeStyles((theme) => ({
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
  modalBtn: {

  },
  buttonContainer: {
    textAlign: 'center'
  },
  filterForm: {
    // textAlign : 'center',
    display: 'block'
  },
  Toggle: {
    minWidth: '100%'
  }

}));

export default function TransitionsModal(props) {
  const {
    // isLoading,
    // error,
    user,
    // loginWithRedirect,
    // logout,
    isAuthenticated,
} = useAuth0();


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // Pets
  const [petsAllowedBool, setPetsAllowedBool] = useState(false)
  const handlePetsAllowed = () => {
    setPetsAllowedBool(!petsAllowedBool)
  }


  // Parking
  const [parkingBool, setParkingBool] = useState(false)
  const handleParking = () => {
    setParkingBool(!parkingBool)
  }

  // Air Conditioning
  const [airConditioningBool, setAirConditioningBool] = useState(false)
  const handleAirConditioning = () => {
    setAirConditioningBool(!airConditioningBool)
  }

  // Gym
  const [gymBool, setGymBool] = useState(false)
  const handleGym = () => {
    setGymBool(!gymBool)
  }


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const skipAlerts = () => {
    console.log('skip alerts')
    // SKIP ALERTS NEEDS TO HAVE SOME ATTRIBUTE IN THE DB.
    let user_email = user.email
    let data = {user_email : user_email}
    $.ajax({
      type: "POST",
      url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/RenterMapSkipAlerts`,
      data: data,
      // processData: false,
      dataType : 'text',
      success: function (response) {
         // Set Redirect State 
         console.log('success')
      },
      error : (e)=>{
          console.log(e)
      }
    });

  }

  const setUpNewAlerts = () => {
    console.log('set up new alerts')
  }

  const updateRenterFilter = () => {
    const user = props.user.user
    console.log('updating renter filter')
    console.log(`petsAllowedBool`)
    console.log(petsAllowedBool)
    console.log(parkingBool)
    console.log('user')
    console.log(user)

    let data = {
      user_email: user.email,
      user_filter:
      {
        pets_allowed: petsAllowedBool,
        parking: parkingBool,
        air_conditioning: airConditioningBool,
        gym: gymBool
      }
    }


    // Submit Filter And confirm success. 
    // Need to think of a way to put boolean into the database.
    $.ajax({
      type: "POST",
      url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/UpdateRenterFilter`,
      data: data,
      dataType: "text",
      success: function (response) {
        console.log(response)
        let success_info = document.createElement('div')
        $(success_info).html('Submit Successful!').fadeOut(1700)

        $('#submitBtnDiv').append(success_info)
      }
    });


  }





  return (
    <div>

      <Button variant='contained' color='secondary' onClick={handleOpen} className={classes.modalBtn} >
        Setup new home alerts
       </Button>
      <Typography onClick={skipAlerts}>Skip alerts for now</Typography>


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

            <h2 id="transition-modal-title">Please configure your filter</h2>
            <p id="transition-modal-description">For better search results.</p>

            {/* Will not use the default action */}
            <form className={classes.filterForm} action={`${process.env.REACT_APP_EXPRESS_ENDPOINT}/UpdateRenterFilter`} method='post'>

              {/* Pets Allowed */}
              <Toggle
                className={classes.Toggle}
                id='filter-property-pets-allowed'
                defaultChecked={petsAllowedBool}
                onChange={handlePetsAllowed} />
              <label htmlFor='filter-property-pets-allowed'>Pets Allowed</label>


              {/* Parking */}
              <Toggle
                className={classes.Toggle}
                id='filter-property-parking'
                defaultChecked={parkingBool}
                onChange={handleParking} />
              <label htmlFor='filter-property-parking'>Parking stall</label>

              {/* Airconditioning */}
              <Toggle
                className={classes.Toggle}
                id='filter-property-air-conditioning'
                defaultChecked={airConditioningBool}
                onChange={handleAirConditioning} />
              <label htmlFor='filter-property-parking'>Air Conditioning</label>

              {/* Airconditioning */}
              <Toggle
                className={classes.Toggle}
                id='filter-property-gym'
                defaultChecked={gymBool}
                onChange={handleGym} />
              <label htmlFor='filter-property-parking'>Gym</label>


            </form>
            <div id='submitBtnDiv'>
              <Button variant='outlined' onClick={updateRenterFilter}>Update Filter</Button>
            </div>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}