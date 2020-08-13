import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ConfigurationModal from '../../ConfigurationModal'

import $ from 'jquery'


import store from '../../../../../../../../redux/store';



const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: '100vw',
        width: '100vw',
        textAlign: 'center'
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
    }
});

export default function OutlinedCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;



    // Show Prompt
    const [showAlertNoticeBool, setShowAlertNotice] = useState(false)

    useEffect(() => {
        console.log('Mounted')
        let data = { user: store.getState().user_obj }
        $.ajax({
            type: "POST",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/getUserWholeProfile`,
            data: data,
            dataType: "json",
            success: function (response) {
                console.log('response')
                console.log(response.renter_filter_set_up)
                if (response.renter_filter_set_up) {
                    console.log(response.renter_filter_set_up)
                    setShowAlertNotice(false)
                }
                else if (!response.renter_filter_set_up){
                    setShowAlertNotice(true)
                }
                // setShowAlertNotice()
            },
            error: () => {
                console.log('Something goes wry')
            }
        });
    },
        [showAlertNoticeBool]
    )










    return (
        <Fragment>
            {showAlertNoticeBool &&
                <Card className={classes.root} variant="outlined">
                    <CardContent >

                        <Typography variant="h5" component="h2">
                            Do you want us to alert you <br /> when new homes are available?
            </Typography>

                    </CardContent>
                    <CardActions >
                        <div className={classes.buttonContainer} >
                            <ConfigurationModal user={props.user} />
                        </div>

                    </CardActions>
                </Card>
            }
        </Fragment>
    );
}