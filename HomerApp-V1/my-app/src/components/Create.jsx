import React, { Component, Fragment } from 'react'
import { Dropdown } from 'react-bootstrap'
import $ from 'jquery'

import MarkerType from './Create/MarkerType'
import ListingPage from './Create/Listing'




// creatorNavigationDiv icons
import chatsvg from './Create/img/chat.svg'
import beaconsvg from './Create/img/beacon.svg'
import homesvg from './Create/img/home_listing.svg'

// beaconInstruction
import risksvg from './Create/img/risk.svg'

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


// Creator Page
export class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Things to disable first :
            beaconInstruction: false,
            beaconConfiguration: false,

            // The following are the stuff to enable upon visit.
            creatorNavigationDiv: true,
            stepTitle: 'CREATE',
            description: 'These are some of the tools people using Homer in Vancouver most commonly use',
            noticeP: 'Approved contributions are public. Your Homer username will appear with your contribution',

            ListingPage: {
                stepTitle: 'CREATE',
                description: 'Join the housing community by sharing your available home with people using Homer',
                noticeP: 'Select each room before or after filming the video, you can have multiple rooms for each catagory',
            },

            // 
            roomTypeOnHold: {

            },
            videoRecord: false,
            
            prevPage : null





        }


        this.toggleComponent = this.toggleComponent.bind(this)
        this.getRoomType = this.getRoomType.bind(this)
    }

    getRoomType(roomRef) {
        // The roomType we are going to deal with next
        console.log(roomRef.current.props.roomType)
        let roomType = roomRef.current.props.roomType
        $.when(
            this.setState({ roomTypeOnHold: roomType })
        )
            .then(() => {
                console.log('this.state.roomTypeOnHold')
                console.log(this.state.roomTypeOnHold)
                // this.setState({ videoRecord: true })
                this.toggleComponent('videoRecord');

            })
            .then(() => {
                console.log('this.state.videoRecord')
                console.log(this.state.videoRecord)
             
            })


    }

 

  
    render() {
        const { creatorNavigationDiv, beaconInstruction, listingPage } = this.state
        return (
            <div style={styles.Create}>


                {/* When tapped on the big + sign on the bottom, this div with navigation buttons will be shown to people */}
                {creatorNavigationDiv &&
                    <Fragment>
                        <h3>{this.state.stepTitle}</h3>
                        <Dropdown.Divider />
                        <h4>{this.state.stepName}</h4>
                        <p>{this.state.description}</p>
                        <div id='creatorNavigationDiv' style={styles.ButtonContainer}>
                            <MarkerType text='Map chat' pic={chatsvg} function='map_chat' />
                            <MarkerType text='Add Beacon' pic={beaconsvg} function='add_beacon' onClick={() => { this.toggleComponent('beaconInstruction'); }} />
                            <MarkerType text='Add home listing' pic={homesvg} onClick={() => { this.toggleComponent('listingPage'); }} />
                        </div>
                        <button id='more_ways_to_contribute_btn' style={styles.moreFunctionsBtn} >More ways to contribute</button>

                        <p style={styles.noticeP}>{this.state.noticeP}</p>
                        <span style={styles.closeBtn}>CLOSE to cancel</span>
                    </Fragment>
                }

                {/* Instruction and notices for beacon set up */}
                {beaconInstruction &&
                    <Fragment>
                        <h3>{this.state.stepTitle}</h3>
                        <Dropdown.Divider />
                        <h4>{this.state.stepName}</h4>
                        <p>{this.state.description}</p>

                        <div id='beaconInstruction' style={styles.beaconInstructionsBtnDiv}>
                            <div style={styles.onIt}>
                                <MarkerType style={styles.beaconBtn} text='Add Beacon' pic={beaconsvg} function='add_beacon' onClick={this.props.showBeaconConfigPage} onIt='true' />
                            </div>

                            <Dropdown.Divider />
                            <div style={styles.middleButtonsDiv}>
                                <MarkerType text='Home' pic={homesvg} function='map_chat' />
                                <MarkerType text='Beacon issue' pic={risksvg} />
                            </div>
                            <Dropdown.Divider />
                        </div>

                        <p style={styles.noticeP}>{this.state.noticeP}</p>
                        <span style={styles.closeBtn}>CLOSE to cancel</span>

                    </Fragment>
                }


                {listingPage &&
                   <ListingPage/>
                }










            </div>
        )
    }
}

export default Create