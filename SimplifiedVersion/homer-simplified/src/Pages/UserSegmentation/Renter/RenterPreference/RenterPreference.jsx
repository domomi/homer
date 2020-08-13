import React, { Component, Fragment } from 'react'

import {Redirect} from 'react-router-dom'
// Auth0
import { withAuth0 } from '@auth0/auth0-react';


import { Typography, Button } from '@material-ui/core'
import { withStyles, withTheme } from "@material-ui/core/styles";
import MobileSelect from 'mobile-select'
import ProgressBar from '../../ProgressBar'
import $ from 'jquery'

const styles = theme => ({
    mobileSelect2: {
        backgroundColor: 'red',
        position: 'fixed',
        top: '5vh'
    },
    mobileScroll: {
        display: 'grid',
        gridTemplateColumns: '50vw 50vw',
        // textAlign : 'center'
    },
    columns: {
        display: 'grid',
        gridTemplateColumns: '50vw 50vw',
    }
})

var classRef = null;
class RenterPreference extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            user_preference: []
        })
        classRef = this
    }

    // When 'Next' Btn is clicked, 
    // uploadsto the DB
    handleNext() {
        console.log('%chandleNext()','color:red; font-size : 15pt')
        const { user } = this.props.auth0;
        let upload_data =
        {
            // email retrieved from auth0
            user_email: user.email,
            user_preference: classRef.state.user_preference,
        }
        console.log('handleNext()')

        $.ajax({
            type: "POST",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/RenterPreference`,
            data: upload_data,
            dataType: "text",
            success: function (response) {
                console.log(response)
                if (response == 'success') {
                    classRef.setState({redirectToRenterMap: true})
                }
            },
            error: () => {
                console.log('Something goes wry')
            }
        });
    }



    componentDidMount() {
        $(document).ready(() => {

            $('#nextBtnDiv').hide()



            $.when().then(
                () => {
                    var mobileSelect2 = new MobileSelect({
                        trigger: '#mobile-scroll',
                        title: 'Preferences',
                        wheels: [
                            {
                                data: [
                                    { id: '1', value: 'Townhomes' },
                                    { id: '2', value: 'Detached-homes' },
                                    { id: '3', value: 'Apartment/Condo homes' },
                                    { id: '4', value: 'Laneway homes' },
                                    { id: '5', value: 'Mobile-homes' },
                                ]
                            },
                            {
                                data: [
                                    { id: '1', value: 'Studio(0 bedrooms)' },
                                    { id: '2', value: '1 bedroom' },
                                    { id: '3', value: '2 bedrooms' },
                                    { id: '4', value: '3 bedrooms' },
                                    { id: '5', value: '4 bedrooms' }
                                ]
                            }
                        ],
                        callback: function (indexArr, data) {
                            let upload_data = []
                            let preferenceArr = []
                            let temp = {home_type_room_preference:null,room_preference : null}
                            
                            console.log(data)
                            $('#nextBtnDiv').show()
                            $.when()
                                .then(() =>{
                                    // for(var item of data){
                                    //     preferenceArr.push(item.value)
                                    // }
                                    temp.home_type_room_preference =  data[0].value
                                    temp.room_preference = data[1].value

                                })

                                .then(() => {
                                    console.log('temp')
                                    console.log(temp)
                                    upload_data = { user_preference: temp }

                                    console.log(upload_data); //返回选中的json数据
                                    $('#mobile-scroll').html(`<div>${data[0].value}</div>`)
                                    $('#mobile-scroll').append(`<div>${data[1].value}</div>`)
                                })
                                .then(() => {
                                    classRef.setState(
                                        { user_preference: temp }
                                    );
                                })

                        }
                    });
                }
            )
                .then(() => {
                    $('.cancel').html('Cancel')
                    $('.ensure').html('Confirm')

                })
        })
    }

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <ProgressBar percentage='50' />
                <Typography variant='h4' style={{ marginTop: '5vh' }}>
                    What type, where and when we rent matters
                </Typography>

                <Typography variant='body1' component='p' >
                    Understanding your usual home seaarch journey will help us recommend your first home. If your preferences change often, go with the options you choose most often.
                </Typography>
                <div className={classes.columns}>
                    <div>
                        <Typography component='h5' >
                            <b>I usually look at homes that are:</b>
                        </Typography>
                    </div>

                    <div>
                        <Typography component='h5' >
                            <b>My next home needs to have:</b>
                        </Typography>
                    </div>
                </div>

                <div id='mobile-scroll' className={classes.mobileScroll}>

                    <div id='choices-home-left'>
                        <p>Townhomes</p>
                        <p>Detached-homes</p>
                        <p>Apartment/condo homes</p>
                        <p>Laneway homes</p>
                        <p>Mobile-homes</p>
                    </div>

                    <div id='choices-home-right'>
                        <p>Studio(0 bedrooms)</p>
                        <p>1 bedrooms</p>
                        <p>2 bedrooms</p>
                        <p>3 bedrooms</p>
                        <p>4 bedrooms</p>
                        <p>5+ bedrooms</p>
                    </div>

                </div>

                <div id='nextBtnDiv' style={{ textAlign: 'center' }}>
                    <Button color='secondary' variant='contained' onClick={() => this.handleNext()} >Next</Button>
                </div>
                
                {classRef.state.redirectToRenterMap && <Redirect to='/RenterMap' />}
            </Fragment>
        )
    }
}

export default withStyles(styles, { withTheme: true })(withAuth0(RenterPreference));