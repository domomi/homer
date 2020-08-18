import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
// import ConfigurationModal_step2 from '../BottomCard_step2/ConfigurationModal_step2/ConfigurationModal_step2'
import { connect } from "react-redux";
import { updateHomeOwnerMapStatus, fetchHomeOwnerMapStatus, updateDescription } from '../../../../../../actions/postActions'


import { useAuth0 } from '@auth0/auth0-react';





const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: '100vw',
        width: '100vw',
        textAlign: 'center',
        overflow: 'visible'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    buttonContainer: {
        textAlign: 'center',
        width: '100vw'
    },
    geocoder: {
        zIndex: 10000,
    },
    getCurrentLocationBtn: {
        textAlign: 'center'
    },
    BtnDiv: {
        textAlign: 'center'
    }
});



function OutlinedCard(props) {

    const {
        user
    } = useAuth0();


    useEffect(() => {
        console.log('props')
        console.log(props.card_step)
        props.fetchHomeOwnerMapStatus(user.email)
        setCardStep(props.card_step)
    }, [props.card_step])

    const [showConfirmPosition, setShowConfirmPosition] = useState(false)


    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const flyToCurrentPosition = () => {
        console.log('getCurrentPosition')

        $.when(props.action1())
            .done(() => {
                setTimeout(() => {
                    setShowConfirmPosition(true)
                }, 1000);

            })


        console.log($('.mapboxgl-ctrl-geolocate'))
        $('.mapboxgl-ctrl-geolocate').click() //Ask if it is the user's location?   
    }

    const getCurrentPosition = () => {
        console.log('flyToCurrentPosition')
        console.log('mapboxgl-ctrl-geocoder--input')
        // console.log(document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0])
        console.log($('.mapboxgl-ctrl-geocoder--input')[0])
        $.when()
            .done(() => {
                props.action2()
            })
            .then(()=>{setCardStep(card_step +1)})
    }


    const handleSkip = () => {
        console.log('handleSkip()')
        // Proceed to the next Card
        $.when().then(() => setCardStep(card_step + 1))
            .then(() => {
                // Update the HomeOwnerMapStatus 
                props.updateHomeOwnerMapStatus(user.email, card_step)
            })




    }

    const hideCard = () => {
        setCardStep(card_step + 1)
    }

    // The card step is mapped to props so the user will 
    const [card_step, setCardStep] = useState(props.card_step);


    const confirmDescription = () => {
        console.log('confirmDescription')
        let listing_description = $('#outlined-basic').val()
        props.updateDescription(user.email,listing_description)
    }



    return (
        <Fragment>
            {
                card_step == 1 &&
                <Card className={classes.root} variant="outlined">
                    <CardContent >

                        <Typography variant="h5" component="h2">
                            Where is the home <br />
                    you want to list?
                </Typography>
                        <div id='geocoder' className={classes.geocoder}></div>
                    </CardContent>
                    <CardActions >
                        <div className={classes.getCurrentLocationBtn}>

                            {!showConfirmPosition && <Button onClick={flyToCurrentPosition} variant='outlined' color='primary'>Use current location</Button>}
                            {showConfirmPosition && <Button onClick={getCurrentPosition} variant='outlined' color='secondary'>Confirm location</Button>}

                        </div>

                        <div>
                            <Button onClick={handleSkip}>Skip for now</Button>
                        </div>
                    </CardActions>
                </Card>
            }

            {
                card_step == 2 &&
                <Card className={classes.root} variant="outlined">
                    <CardContent >

                        <Typography variant="h5" component="h2">
                            Fill in basic information
                     </Typography>
                        <form>
                            <TextField id="outlined-basic" label="Description" variant="outlined" defaultValue="Write Down Descriptions here" />
                        </form>
                    </CardContent>
                    <CardActions >

                        {/* Step 1 is for position */}
                        {card_step == 1 &&
                            <div className={classes.getCurrentLocationBtn}>
                                {!showConfirmPosition && <Button onClick={flyToCurrentPosition} variant='outlined' color='primary'>Use current location</Button>}
                                {showConfirmPosition && <Button onClick={getCurrentPosition} variant='contained' color='secondary'>Confirm location</Button>}
                            </div>
                        }

                        {card_step == 2 &&

                            <div>
                                <Button variant='contained' color='secondary' onClick={confirmDescription}>Confirm Description</Button>
                            </div>

                        }

                        <div className={classes.BtnDiv}>
                            <Button variant='outlined' color='primary' onClick={handleSkip}>Skip for now</Button>
                        </div>

                    </CardActions>
                </Card>
            }

            {
                card_step == 3 &&
                <Card className={classes.root} variant="outlined">
                    <CardContent >

                        <Typography variant="h5" component="h2">
                            Congradulations! <br />
                        </Typography>

                        <Typography variant="body1" component="p">
                            Your listing is live, <br />
                   renters can now <br />
                   contact you.
                 </Typography>

                    </CardContent>
                    <CardActions >
                        <div className={classes.buttonContainer} >
                            <Button onClick={hideCard} variant='contained' color='secondary'>OK</Button>
                        </div>

                    </CardActions>
                </Card>
            }
        </Fragment>
    );
}

function mapStateToProps(state) {
    console.log('mapStatetoProps')
    console.log(state)

    const { posts } = state
    console.log('posts.home_owner_map_config_step')
    console.log(posts.home_owner_map_config_step)
    // console.log(props.card_step)
    return { card_step: posts.home_owner_map_config_step }
}


export default connect(mapStateToProps, { updateHomeOwnerMapStatus, fetchHomeOwnerMapStatus, updateDescription })(OutlinedCard)