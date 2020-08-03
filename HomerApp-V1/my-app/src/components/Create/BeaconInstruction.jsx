import React, { Component, Fragment } from 'react'
import { withStyles, withTheme } from "@material-ui/core/styles";
import { Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import NotLiveRoute from 'react-live-route'


import MarkerType from './MarkerType'
import { Link, Route, withRouter } from 'react-router-dom'
import beaconsvg from './img/beacon.svg'
import homesvg from './img/home_listing.svg'
import LinearProgress from '@material-ui/core/LinearProgress';


// beaconInstruction
import risksvg from './img/risk.svg'
import magnifiersvg from './img/search.svg'
import pinsvg from './img/pin.svg'
import { Divider } from '@material-ui/core'
import { AutoScroll } from 'sortablejs';
const LiveRoute = withRouter(NotLiveRoute)
const styles = theme => ({
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
        color: 'white',
        fontWeight: '600',
        backgroundColor: 'black',
        width: 'fit-content',
    },

    // Beacon Instructions
    beaconInstructionsBtnDiv: {
        // textAlign: 'center',
        // display: 'flex',
        // flexDirection: 'column'
        marginLeft: 'auto',
        marginRight: 'auto'
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
    // beaconBtn: {
    //     textAlign: 'center'
    // },





    root: {
        height: 300,
        flexGrow: 1,
        minWidth: '90vw',
        maxWidth: '100vw',
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
        backgroundColor: theme.palette.secondary.main,
        color: 'black',
        // zIndex: 10
    },
    stepTitle: {
        margin: 0,
        textAlign: 'center'
    },
    buttons: {
        backgroundColor: 'white'
    },

    instructionDiv: {
        margin: '10px 5px 10px 5px',
        backgroundColor: 'white',
        borderRadius: '10px',
    },

    buttonDiv: {
        display: 'flex'
    },

    stepSubtitle: {
        margin: 0,
        textAlign: 'center',
        backgroundColor: 'white',
        backgroundSize: 'contain',
        // maxWidth : '50%',
        borderRadius: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'fit-content',
        padding: '0 5px 0 5px',

    },
    stepIcon: {
        display: 'inline',
        maxHeight: '15px'
    },

    middleButtonsDiv: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'grid',
        // flexDirection: 'row',
        gridTemplateColumns: 'repeat(4,1fr)',
        marginTop: '0',
        marginBottom: '0',
        justifyItem: 'start'
    },
    homeBtn: {
        justifyItem: 'start',
        margin: '0',
        display: 'grid',
        padding: '0',
        gridColumn: '1 / 3'
    },
    beaconBtn: {
        justifyItem: 'start',
        margin: '0',
        padding: '0',
        display: 'grid',
        gridColumn: '3 / span 1'
    },
})
var stepID = -1
class BeaconInstruction extends Component {

    constructor(props) {
        super(props);
        console.log('props')
        console.log(props)

        this.state = {
            LinearProgress: {
                1: 25,
                2: 50,
                3: 75,
                4: 100,
            },

            1: {
                stepTitle: 'Seeking Home',
                stepSubtitle: 'Home Filters',
                stepIcon: magnifiersvg,
                stepInstruction: 'Want to use your current filters?'
            },

            2: {
                
                stepTitle: 'Seeking Home',
                stepSubtitle: 'Search Radius',
                stepIcon: pinsvg,
                stepInstruction: 'Where do you want to set your beacon'

            },
            3: {

                stepTitle: 'Seeking Home',
                stepSubtitle: 'add boosters',
                stepIcon: magnifiersvg,
                stepInstruction: 'Want to add boosters to your beacon'

            },
            4: {
                stepTitle: 'Seeking Home',
                stepSubtitle: 'Home Filters',
                stepIcon: magnifiersvg,
                stepInstruction: 'Home will continue to watch for homes and notify landlord about your search.'

            },

        }
    }

    componentWillReceiveProps(props) {
        console.log('new props')
        console.log(props)
        stepID = parseInt(props.match.params.stepID)
        console.log('stepID ' + stepID)
    }

    componentWillUnmount() {
        stepID = 0
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>













                {stepID == 0 &&
                    <div className={classes.Create}>
                        <p>BeaconInstruction</p>
                        <Fragment >
                            {/* <h3>{this.state.step1.stepTitle}</h3> */}
                            <Divider variant="middle" color='white' />
                            <h4>{this.state.stepName}</h4>
                            <p>{this.state.description}</p>

                            <div id='beaconInstruction' >
                                <div className={classes.onIt}>
                                    <Link to='/HomerMap/BeaconConfiguration' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                        <MarkerType style={styles.beaconBtn} text='Beacon Config' pic={beaconsvg} function='add_beacon' onClick={this.props.showBeaconConfigPage} onIt='true' />
                                    </Link>

                                    <Link to='/HomerMap/Create/BeaconInstruction/steps/1' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                        <MarkerType style={styles.beaconBtn} text='Add Beacon' pic={beaconsvg} onIt='true' />
                                    </Link>
                                </div>

                                <Divider variant="middle" color='white' />
                                <div className={classes.middleButtonsDiv}>
                                    <MarkerType text='Home' pic={homesvg} function='map_chat' />
                                    <MarkerType text='Beacon issue' pic={risksvg} />
                                </div>
                                <Divider variant="middle" color='white' />
                            </div>

                            <p style={styles.noticeP}>{this.state.noticeP}</p>
                            <span style={styles.closeBtn}>CLOSE to cancel</span>


                        </Fragment>

                    </div>
                }


                {stepID > 0 &&






                    <div className={classes.Create}>

                        <div className={classes.root}>
                            <div className={classes.middleButtonsDiv}>
                                <span></span>
                                <MarkerType pic={beaconsvg} className={classes.beaconBtn} />
                                <MarkerType pic={homesvg} className={classes.homeBtn} />

                            </div>
                            <h3 className={classes.stepTitle}>{this.state[stepID].stepTitle}</h3>

                            <div>

                                <h4 className={classes.stepSubtitle}>
                                    <img className={classes.stepIcon} src={this.state[stepID].stepIcon} />
                                    {this.state[stepID].stepSubtitle}
                                </h4>
                            </div>


                            <LinearProgress variant="determinate" value={this.state.LinearProgress[stepID]} />



                            {stepID == 1 &&
                                <div className={classes.instructionDiv}>
                                    {this.state[stepID].stepInstruction}

                                    <div className={classes.buttonDiv}>
                                        <div>checkbox</div>
                                        <Button variant='contained' color='primary'>Yes</Button>
                                        <div className={classes.closeBtn}><CloseIcon /></div>
                                    </div>
                                </div>}


                            {stepID == 2 &&

                                <div className={classes.instructionDiv}>
                                    <div>{this.state[stepID].stepInstruction}</div>
                                    <Button variant='contained' color='primary'>Yes</Button>
                                    <Button variant='contained' color='primary'>NO</Button>
                                    {/* <span></span> {stepID} */}
                                </div>
                            }

                            {stepID == 3 &&

                                <div className={classes.instructionDiv}>
                                    <div>{this.state[stepID].stepInstruction}</div>
                                    <Button variant='contained' color='primary'>Yes</Button>
                                    <Button variant='contained' color='primary'>NO</Button>
                                    {/* <span></span> {stepID} */}
                                </div>
                            }


                            {stepID == 4 &&

                                <div className={classes.instructionDiv}>
                                    <div>{this.state[stepID].stepInstruction}</div>
                                    <Button variant='contained' color='primary'>Yes</Button>
                                    <Button variant='contained' color='primary'>NO</Button>
                                    {/* <span></span> {stepID} */}
                                </div>
                            }



                        </div>

                    </div>

                }



            </Fragment>

        )
    }
}

export default withStyles(styles, { withTheme: true })(BeaconInstruction);