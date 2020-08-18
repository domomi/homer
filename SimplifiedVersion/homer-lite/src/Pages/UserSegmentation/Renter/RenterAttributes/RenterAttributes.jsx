import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
// Auth0
import { withAuth0 } from '@auth0/auth0-react';

import ProgressBar from '../../ProgressBar'
import { Typography, Button } from '@material-ui/core'
import circleSVG from './img/circle.svg'
import $ from 'jquery'
import { connect } from 'react-redux';
import fetchUserObj from '../../../../redux/reducers/reducer'
import store from '../../../../redux/store'
import { withStyles, withTheme } from "@material-ui/core/styles";
// Not necessary
// import Popup from 'react-popup';


const styles = theme => ({
    circles: {
        maxWidth: '40vw',
        width: '35vw',
        // opacity: 0.20,
    },
    circle: {
        textAlign: 'center',
        position: 'absolute',
        transform: 'translate(0%, 55%)',
        maxWidth: '40vw',
        overflow: 'hidden'
    }

    , circlesDiv: {
        display: 'grid',
        gridTemplateColumns: '50vw 50vw'
    }
})

var classRef = null;
class RenterAttributes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // These are the attributes to show in the bubbles
            // 'chosenBool' property is for rendering styles
            attributes: [
                { value: 'nature_outdoors', tag: '#nature_outdoors', emoji: '🌴🏡', chosenBool: false },
                { value: 'young_family_friendly', tag: '#young_family_friendly', emoji: '👨‍👩‍👧‍👦🏠', chosenBool: false },
                { value: 'transit_commuter', tag: '#transit_commuter', emoji: '🚎🏘️', chosenBool: false },
                { value: 'student_life', tag: '#student_life', emoji: '👨‍🏫🏠', chosenBool: false },
                { value: 'quiet_life', tag: '#quiet_life', emoji: '😴🏠', chosenBool: false }
            ],
            // This is a property to submit.
            selected_attributes: [],
        }
        classRef = this
    }
    componentDidUpdate() {
        // Change into state
        $('#user_role_display').html('Renter')
        const { user } = this.props.auth0;
        console.log(user)
    }

    componentDidMount() {
        const { user } = this.props.auth0;
        console.log('RenterAttributes Mounted')
        // console.log(store.getState().user_obj.email)
        // let user_email = store.getState().user_obj.email
        console.log(user)
        console.log(user.email)
        let user_email = user.email
        let data = { user_email: user_email }
    }

    // Handles the actions when 'Next' button is hit 
    handleNext() {
        // alert('Please select at least an attribute!')
        console.log('handleNext()')
        let selected_attributes = classRef.state.selected_attributes
        const { user } = this.props.auth0;
        console.log(user)
        if (selected_attributes.length == 0) {
            alert('Please select at least an attribute!')
        }
        else {
            $.when()
                .then(() => {
                    let data = { selected_attributes: classRef.state.selected_attributes, user_email: user.email }
                    console.log(data)
                    $.ajax({
                        type: "POST",
                        url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/RenterAttributes`,
                        data: data,
                        dataType: "text",
                        success: function (response) {
                            console.log(response)
                            if (response == 'success') {
                                classRef.setState({ redirectToRenterPreference: true })
                            }
                        },
                        error: () => {
                            console.log('Something goes wry')
                        }
                    });

                })
                .then(() => {

                })

        }
    }


    handleAttributeSelection(e, attribute) {



        console.log('handleAttributeSelection()')

        // It's currentTarget node
        console.log(e.currentTarget)
        console.log($(e.currentTarget.childNodes[1]).css('opacity'))

        // show the attribute the renter has clicked on
        console.log('attribute:')
        console.log(attribute.value)

        // if the attribute has been added into it:
        // now we need to pop it out.
        let selected_attributes = classRef.state.selected_attributes
        let attributes_obj = classRef.state.attributes
        let targetObj = null

        $.when().then(() => {
            
            

            if (selected_attributes.includes(attribute.value)) {
                selected_attributes.pop(attribute.value)
            }
            else if (!selected_attributes.includes(attribute.value)) {
                selected_attributes.push(attribute.value)
            }
        }).done(() => {
            console.log(attributes_obj)
            targetObj = attributes_obj.find(obj => obj.value == attribute.value);
            // Fetched targetObj
            targetObj.chosenBool = !targetObj.chosenBool
            console.log(targetObj)
        })
            .done(() => {

                classRef.setState(prevState => ({
                    selected_attributes: selected_attributes,

                }))
            }).done(() => {
                console.log(classRef.state.selected_attributes)

            })






        // if($(e.currentTarget.childNodes[1]).css('opacity')==0.2)
        //     $(e.currentTarget).children().css('opacity','1')
        // else if ($(e.currentTarget.childNodes[1]).css('opacity') ==1)
        //     $(e.currentTarget).children().css('opacity','0.2')
    }
    render() {
        const { classes } = this.props
        return (
            <Fragment>


                <div>
                    <ProgressBar percentage='25' />
                    <Typography component='h4' variant='h4'>
                        What kind of home can we help you find?
                    </Typography>

                    {/*  */}
                    <div id='circlesDiv' className={classes.circlesDiv} >
                        {this.state.attributes.map((attribute, index) => {
                            // console.log(attribute.emoji)
                            return (
                                <div onClick={(e) => this.handleAttributeSelection(e, attribute)}>
                                    <div className={classes.circle}>{attribute.emoji}{attribute.tag}</div>

                                    {/* If this attribute's bool is true, then it's chosen */}
                                    {attribute.chosenBool && <img className={classes.circles} src={circleSVG} />}
                                    {/* If this attribute's bool is false, then it's not chosen */}
                                    {!attribute.chosenBool && <img className={classes.circles} src={circleSVG} style={{ opacity: '0.2' }} />}
                                </div>
                            )
                        }
                        )}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button color='secondary' variant='contained' onClick={() => this.handleNext()}>Next</Button>
                    </div>
                </div>
                {classRef.state.redirectToRenterPreference && <Redirect to='/RenterPreference' />}
            </Fragment>

        )
    }
}
export default connect(null, { fetchUserObj })(withStyles(styles, { withTheme: true })(withAuth0(RenterAttributes)))
