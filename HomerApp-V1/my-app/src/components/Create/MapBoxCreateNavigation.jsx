import React, { Fragment, Component } from 'react'


// creatorNavigationDiv icons
import chatsvg from './img/chat.svg'
import beaconsvg from './img/beacon.svg'
import homesvg from './img/home_listing.svg'
// 
import MarkerType from './MarkerType'
import { Link } from 'react-router-dom'

import {Divider} from '@material-ui/core';
import {withStyles, withTheme} from "@material-ui/core/styles"

const styles = theme => ({
    Link : { color: 'inherit', textDecoration: 'inherit' },
    Create: {
        maxHeight: '90vh',
        width: '95vw',
        color: 'white',
        backgroundColor: 'rgba(44,44,44,0.7)',
        position: 'absolute',
        zIndex: '1',
        margin: '0 3vw 0 3vw'

    }
    ,
    ButtonContainer: {
        display: 'inline-flex'
    },
    moreFunctionsBtn: {
        fontSize: '12pt',
        background: 'rgb(200,100,5)',
        color: 'white',
        margin: '15vh 5vw 5vh'
    },

    noticeP: {
        margin: '8vh 15vw 5vh 15vw ',
        fontSize: '8pt'
    },
    closeBtn: {
        fontWeight: '600'
    },

    // Beacon Instructions
    beaconInstructionsBtnDiv: {
        // textAlign: 'center',
        // display: 'flex',
        // flexDirection: 'column'
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    middleButtonsDiv: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'inline-flex',
        flexDirection: 'row'
    },

    // Beacon Setup
    beaconConfigurationDiv: {
        margin: '0 3vw 0 3vw',
        position: 'fixed',
        bottom: '0',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
    },

    setupBeaconText: {
        color: 'black',
    },

    radiusModeSpan: {
        color: 'black'
    },

    radiusDescription: {
        color: 'black',
        fontWeight: 500
    },
    descriptionContainer: {
        minWidth: '85%',
        maxWidth: '85%',
        display: 'inline-flex',
        textAlign: 'left'
    },
    radio: {
        float: 'right',
        marginTop: '40px'
    },

    onIt: {
        // background : 'green'
        textAlign: 'center',
        display: 'block',
        width: '100%'
    },
    beaconBtn: {
        textAlign: 'center'
    },
})

 class MapBoxCreateNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepTitle: 'CREATE',
            description: 'These are some of the tools people using Homer in Vancouver most commonly use',
            noticeP: 'Approved contributions are public. Your Homer username will appear with your contribution'
        }
    }

    render() {
        // 
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.Create}>
                    <h3>{this.state.stepTitle}</h3>
                    <Divider variant="middle" color='white'/>
                    <h4>{this.state.stepName}</h4>
                    <p>{this.state.description}</p>
                    <div id='creatorNavigationDiv' className={classes.ButtonContainer}>
                    <Link className={classes.Link} to="/MapBox/HashTagChoices" varianat='inherant'>  <MarkerType text='Map chat' pic={chatsvg} /> </Link>

                        <Link to='/MapBox/Create/BeaconInstruction/steps/0' className={classes.Link}>
                            <MarkerType text='Add Beacon' pic={beaconsvg} function='add_beacon' />
                        </Link>

                        <Link  to='/MapBox/Create/AddHomeListing' className={classes.Link}>
                            <MarkerType text='Add home listing' pic={homesvg} />
                        </Link>

                    </div>
                    <button id='more_ways_to_contribute_btn' className={classes.moreFunctionsBtn} >More ways to contribute</button>

                    <p style={styles.noticeP}>{this.state.noticeP}</p>
                    <span style={styles.closeBtn}>CLOSE to cancel</span>
                </div>

            </Fragment>
        )
    }
}


export default withStyles(styles, { withTheme: true })(MapBoxCreateNavigation);