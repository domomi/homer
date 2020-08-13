import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ConfigurationModal_step2 from '../BottomCard_step2/ConfigurationModal_step2/ConfigurationModal_step2'

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
    }
});



export default function OutlinedCard(props) {
    useEffect(() => {
        console.log('props')
        console.log(props)

    }, [])
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const getCurrentLocation = () => {
        function getLocation() {

            if (navigator.geolocation) {
                // let current_position = navigator.geolocation.getCurrentPosition(classRef.showPosition);
                // console.log(current_position)
            } else {
                console.log('none')
            }
        }
        function showPosition(position) {
            console.log(position.coords)
            let lat = position.coords.latitude
            let lng = position.coords.longitude
            console.log([lat, lng])

            // classRef.setState({ current_location: [lat, lng] })
        }
    }
    const getCurrentPosition = () => {
        console.log('getCurrentPosition')
        props.action()
        console.log($('.mapboxgl-ctrl-geolocate'))
        $('.mapboxgl-ctrl-geolocate').click() //Ask if it is the user's location?
        
    }
    const handleSkip = () => {
        console.log('handleSkip()')
        // Proceed to the next Card
        setCardStep(card_step + 1)

    }

    const hideCard = () => {
        setCardStep(card_step + 1)
    }

    const [card_step, setCardStep] = useState(1);

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
                            <Button onClick={getCurrentPosition} variant='outlined' color='primary'>Use current location</Button>
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