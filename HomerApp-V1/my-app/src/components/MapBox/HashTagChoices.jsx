import React, { Component } from 'react'
import { withStyles,withTheme } from "@material-ui/core/styles";
import { Divider, Card, CardActions, CardContent, Button, Typography, TextField } from '@material-ui/core';
import HashTagList from "./HashTagList"
import { Route, Link } from 'react-router-dom';

import chatsvg from './img/chat.svg'


const styles = theme => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: '60vw',
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
        margin: 0,
        bottom: 0,
        position: 'fixed',
        // backgroundColor : theme.CreatePage.background[300],
        backgroundColor : theme.palette.secondary.main,

    },
    tab_heading: {

    },
    icon: {
        maxWidth: '35px',
        backgroundColor : 'white',
        borderRadius : '100px',
        padding : '5px'

    },
    iconContainer : {
        textAlign : 'center'
    },
    divider : {
        color : theme.divider
    }



})

var classRef = null
class MapChat extends Component {
    constructor(props) {
        super(props)
        classRef = this
        console.log('withTheme')
        console.log(withTheme)
    }





    getLocation() {
        return true
    }

    getHashTags() {

    }

    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <div>
                <div className={classes.root} variant="outlined">
  
                    <Button onClick={() => { classRef.props.action(true) }}>get location</Button>
                    <Link to='/MapBox/HashTagChoices/HashTagList'><Button>#Tag List ↓</Button></Link>
                    <Route path='/MapBox/HashTagChoices/HashTagList' component={HashTagList} />
                    
                    <p id='hashTagsP'></p>

                  
                   
                </div>

            </div>

        )
    }
}
export default withStyles(styles, { withTheme: true })(MapChat);