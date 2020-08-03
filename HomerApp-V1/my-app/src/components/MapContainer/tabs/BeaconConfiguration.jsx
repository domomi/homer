import React, { Component, Fragment,  } from 'react'
import {Link} from 'react-router-dom'
import { Divider } from '@material-ui/core';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateRadius} from '../../../actions/mapActions'
class BeaconConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepTitle: 'CREATE',
            description: 'These are some of the tools people using Homer in Vancouver most commonly use',
            noticeP: 'Approved contributions are public. Your Homer username will appear with your contribution'
        }
    }

    onChange(radius){
        this.props.updateRadius(radius)
    }


    render() {
        return (
            <Fragment>

                <div id='beaconConfiguration' style={styles.beaconConfigurationDiv}>
                    <div style={{ textAlign: 'center' }}>

                        <Link to='/HomerMap/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <div style={{ float: 'left', marginLeft: '3vw' }}>x</div>
                        </Link>

                        <div style={styles.coloredStripe}></div>
                        <div style={styles.setupBeaconText}>setup beacon</div>
                    </div>

                    <Divider />
                    <form>

                        <div id='suggested radius' style={styles.descriptionContainer}>

                            <div >
                                <h4 style={styles.radiusModeSpan}>Suggested radius</h4>
                                <p style={styles.radiusModeSpan}>Show me home listings from a general area</p>
                            </div>
                            <input type='radio' name='beaconMode' value='suggestedRadius' style={styles.radio}></input>
                        </div>

                        <div id='custom radius' style={styles.descriptionContainer}>

                            <div >
                                <h4 style={styles.radiusModeSpan}>Custom radius</h4>
                                <p style={styles.radiusModeSpan}>Only show me home listings from a specifig area</p>
                            </div>
                            <input type='radio' name='beaconMode' value='customizedRadius' style={styles.radio}></input>
                        </div>

                        {/* change the state in the map */}
                        {/* <input type='range' id='beaconRadiusRange' max='15000' min='500' onChange={(e) =>{ this.props.action(e.target.value)}} /> */}

                        <input type='range' id='beaconRadiusRange' max='15000' min='500' onChange={(e) =>{ this.onChange(e.currentTarget.value)}} />


                    </form>

                </div>
            </Fragment>
        )
    }
}

const styles = {
    Create: {
        maxHeight: '90vh',
        width: '95vw',
        color: 'white',
        backgroundColor: 'rgba(44,44,44,0.7)',
        position: 'absolute',
        zIndex: '2',
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
}

BeaconConfiguration.propTypes = {
    
} 

export default connect(null,{updateRadius})(BeaconConfiguration)