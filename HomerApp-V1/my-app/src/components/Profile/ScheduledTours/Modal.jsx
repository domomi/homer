import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import livingroom from './img/gray-living-room-01.jpg'

import $ from 'jquery'
import { Divider } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
    },
    modal: {
        marginTop: '1vw',
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal_display_picture: {
        maxWidth: '150px',
        float: 'right'
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    owner_name: {
        display: 'block',
        backgroundColor: 'rgb(200,100,5)'
        , maxWidth: '30vw'
    },
    owner_name: {
        display: 'block',
        backgroundColor: 'rgb(200,100,5)'
        , maxWidth: '30vw'
    }

}));


export default function TransitionsModal(props) {

    const [details, toggleDetails] = useState(false);

    // apply stylesheet by className
    const classes = useStyles();



    function fetchData() {
        $.ajax({
            type: "get",
            url: "url",
            data: "data",
            dataType: "dataType",
            success: function (response) {

            }
        });
    }
    fetchData()

    function moreInfo() {

    }

    return (
        <div className={classes.root} >
            <Card
                // disablePortal
                // disableEnforceFocus
                // disableAutoFocus
                // open
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
            // container={() => rootRef.current}
            >

                <div className={classes.paper}>
                    <div>

                        <div>

                            <h2 id="server-modal-title">{props.property_description}</h2>
                            <img className={classes.modal_display_picture} src={livingroom} />
                            <p id="server-modal-description">{props.status}</p>
                            <p className={classes.owner_name}>{props.owner_name}</p>

                        </div>
                   

                    </div>




                    <Divider />
                    <div onClick={() => toggleDetails(true)}>Show more details</div>

                    {
                        details &&
                        <div>
                            <p>{props.street_address}</p>
                            <p>{props.apartment_number}</p>
                            <p>{props.postal_code}</p>
                            <p>{props.building_number}</p>
                            <p>{props.city}</p>
                            <p>{props.province}</p>
                            <p>{props.country}</p>
                        </div>

                    }
                    



                </div>
            </Card>
        </div>
    );
}