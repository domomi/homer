import React, { Component } from 'react'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'

import Modal from './ScheduledTours/Modal'

import { withStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Button, Typography, TextField } from '@material-ui/core';
import $ from 'jquery'
import {fetchScheduledVisits} from '../../actions/postActions'


var ENDPOINT = 'http://localhost:443'


const styles = theme => ({
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
        margin: 0,

    },
    tab_heading: {

    }


})


var classRef = null;
class ScheduledTours extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // This will be get from the database and then thrown into the modal by list rendering
            scheduled_visits: []
        }
        classRef = this;
    }

    
    componentWillMount(){
        this.props.fetchScheduledVisits()
        setTimeout(() => {
            console.log('this.props')
            console.log(this.props)
        }, 550);
     
    }
    
    componentDidMount() {
        // this.props.fetchScheduledVisits()
        // console.log("REACT_APP_EXPRESS_ENDPOINT")
        // console.log(process.env.REACT_APP_EXPRESS_ENDPOINT)
        // console.log(process.env.REACT_APP_EXPRESS_ENDPOINT)
        // let user_token = { user_email: "jsteiner@domomi.com" }
        // $.ajax({
        //     type: "post",
        //     url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/get_scheduled_visits`,
        //     data: user_token,
        //     dataType: "json",
        //     success: function (scheduled_visits) {
        //         console.log('scheduled_visits')
        //         $.when(classRef.setState({ scheduled_visits: scheduled_visits })).
        //             then(() => { console.log(classRef.state) })


        //     }
        // });

        // axios.get(`${ENDPOINT}/get_scheduled_visits`)
        //     .then(res => {
        //         //   const scheduled_visits = res.data.data.children.map(obj => obj.data);
        //         const scheduled_visits = res.data
        //         this.setState({ scheduled_visits });
        //     });




        // Need to figure out how to put code inside the function 
        // without having problems with "this"
        function calculateDays() {

            // To calculate the time difference of two dates 
            var Difference_In_Time = new Date().getTime() - Date.parse(this.props.date);

            // To calculate the no. of days between two dates 
            var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));
            console.log(Difference_In_Days)

            if (Difference_In_Days === 0) {
                console.log("Today")
                classRef.setState({ postedDate: "Today" })
            }
            else {
                classRef.setState({ postedDate: `${Difference_In_Days} Days ago` })
            }

        }



    }



    render() {
        const { classes } = this.props;
        return (
            // div container of the Component
            <div style={{ maxWidth: '100vw' }} className="HomePosts">

                {this.props.scheduled_visits.map(appointment =>

                    // <Modal key={appointment.id}
                    //     property_description={appointment.property_description}
                    //     owner_name={appointment.owner_name}
                    //     tour_date={appointment.tour_date}
                    //     status={appointment.status}
                    //     // When the details are toggled
                    //     street_address={appointment.property_address.street_address}
                    //     apartment_number={appointment.property_address.apartment_number}
                    //     postal_code={appointment.property_address.postal_code}
                    //     building_number={appointment.property_address.building_number}
                    //     city={appointment.property_address.city}
                    // />

                    <Card key={appointment.id} className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography>
                                {appointment.property_description}
                            </Typography>

                            <Typography>
                                {appointment.owner_name}
                            </Typography>


                            <Typography  gutterBottom>
                                {appointment.tour_date}
                            </Typography>

                            <Typography >
                                {appointment.status}
                            </Typography>

                            <Typography>
                                {appointment.property_address.street_address}
                            </Typography>

                            <Typography>
                                {appointment.property_address.apartment_number}
                            </Typography>

                            <Typography >
                                {appointment.property_address.postal_code}
                            </Typography>

                            <Typography >
                                {appointment.property_address.building_number}
                            </Typography>

                            <Typography>
                                {appointment.property_address.city}
                            </Typography>

                            <img />

                        </CardContent>

                    </Card>






                )}


            </div>
        )
    }


}

ScheduledTours.propTypes = {
    // fetchScheduledVisits : ScheduledTours.class.isRequired,
    scheduled_visits : PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    // console.log(state.scheduled_visits);
    scheduled_visits : state.posts.scheduled_visits
})




export default connect(mapStateToProps,{fetchScheduledVisits})(withStyles(styles, { withTheme: true })(ScheduledTours));