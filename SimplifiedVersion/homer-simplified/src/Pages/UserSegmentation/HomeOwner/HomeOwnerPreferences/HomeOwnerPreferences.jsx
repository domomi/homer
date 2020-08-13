import React, { Component, Fragment } from 'react'
import ProgressBar from '../../ProgressBar'
import { Typography, Button } from '@material-ui/core'
import { withStyles, withTheme } from "@material-ui/core/styles";
import MobileSelect from 'mobile-select'
import {Redirect} from 'react-router-dom'
import { withAuth0 } from '@auth0/auth0-react';

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

var classRef;
class HomeOwnerPreference extends Component {
    constructor(props){
        super(props)
        classRef = this
        this.state = {
            user_preference : [],
            redirectToHomeOwnerVideoUpload : false
        }
    }



    componentDidMount() {
        $(document).ready(() => {
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
                                    // { id: '6', value: '西湖区' }
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

    // When 'Next' Btn is clicked, 
    // uploadsto the DB
    handleNext() {
        console.log('%chandleNext()', 'color:red; font-size : 15pt')
        const { user } = this.props.auth0;
        let upload_data =
        {
            // email retrieved from auth0
            user_email: user.email,
            user_preference: classRef.state.user_preference,
        }
  
        $.ajax({
            type: "POST",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/HomeOwnerPreference`,
            data: upload_data,
            dataType: "text",
            success: function (response) {
                console.log(response)
                if (response == 'success') {
                    classRef.setState({ redirectToHomeOwnerVideoUpload: true })
                }
            },
            error: () => {
                console.log('Something goes wry')
            }
        });
    }


    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <ProgressBar percentage='50' />
                <Typography variant='h4' style={{ marginTop: '5vh' }}>
                    What type, where and when we list matters
                </Typography>

                <Typography variant='body1' component='p' >
                    Understanding your home listing will help us<br />
                   recoomend the best renters. If you're<br />
                   unsure of any options, select unsure <br />
                   and complete the options you can for now<br />
                </Typography>

                <div className={classes.columns}>
                    <div>
                        <Typography component='h5' >
                            <b>My listing is <br />
                            described as:</b>
                        </Typography>
                    </div>

                    <div>
                        <Typography component='h5' >
                            <b>My listing is<br />
                             providing:</b>
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
                <div style={{ textAlign: 'center' }}>
                    <Button color='secondary' variant='contained' onClick={() => this.handleNext()}>Next</Button>
                </div>
                {/* If the state is true, the user will be redirected to the page of Uploading . */}
                {classRef.state.redirectToHomeOwnerVideoUpload && <Redirect to='/HomeOwnerVideoUpload' />}
            </Fragment>
        )
    }
}

export default withStyles(styles, { withTheme: true })(withAuth0(HomeOwnerPreference));