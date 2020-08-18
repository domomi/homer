import React, { Component, Fragment } from 'react'
import $ from 'jquery'
// Auth0
import { withAuth0 } from '@auth0/auth0-react';

import ProgressBar from '../../ProgressBar'
import './MapBox.css'
import mapboxgl from 'mapbox-gl';
import { StylesProvider } from '@material-ui/core';

import LoginBtn from '../../../LoginPage/Components/LoginBtn'
import RenterNavBar from '../RenterNavBar/RenterNavBar'

// The card shows prompts for setting up beacons
import BottomCard from './Components/BottomCard/Components/BottomCard/BottomCard'
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux'


import store from '../../../../redux/reducer'
mapboxgl.accessToken = 'pk.eyJ1Ijoicmlja3NvbjIwMjAiLCJhIjoiY2tkMGxiY3FuMDNwYjJ0bnV1a2g5bThxaSJ9.ZatvhnN4mf-f47KYWUC1Sg'
// `${process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}`;



const styles = {
    mapContainer: {
        position: 'relative',
        top: '0vh',
        right: 0,
        left: 0,
        bottom: 0,
        height: '85vh',
    },
    BottomCard: {
        position: 'fixed',
        bottom: '10vh',
        zIndex: 100,
    },
    promptLogin: {
        position: 'fixed',
        top: '15vh'
    }
}
var classRef = null;
class RenterMap extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lng: -123.1207,
            lat: 49.2827,
            zoom: 15,

            redirectToLoginBool: false,

            // flyToLngLat: props.flyToLngLat
        }
        console.log(props)
        classRef = this
    }

    componentWillReceiveProps() {
        console.log('will receive props')
        console.log(this.props)
        // console.log(this.props.flyToLngLat)
        // if (this.props.flyToLngLat.length != 0 ) {
        //     classRef.state.mapObj.flyTo({ center: this.props.flyToLngLat })
        // }
    }

    

    componentDidUpdate(){
        console.log('did update')

        // console.log(this.props.flyToLngLat)

        // if (this.props.flyToLngLat.length != 0 ) {
        //     classRef.state.mapObj.flyTo({ center: this.props.flyToLngLat })
        // }
    }



    componentDidMount() {
        const { user } = this.props.auth0;
        // If user does not exist,
        // redirects to the login page.
        if (!user) {
            console.log('redirect')
            this.setState({ redirectToLoginBool: true })
        }
        else {
            $('#user_role_display').html('Renter')

            console.log(user)

            let user_email = user.email
            let data = []
            let lat = null
            let lng = null

            const map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                // center: [lng, lat],
                center: [this.state.lng, this.state.lat],
                zoom: this.state.zoom
            });







            $.when()

                .then(
                    () => {
                        data = { user_email: user_email }
                    }
                ).then(
                    () => {
                        $.ajax({
                            type: "POST",
                            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/RenterMapBeaconMatch`,
                            data: data,
                            dataType: "json",
                            success: function (response) {
                                console.log(response)
                                // Set LngLat to the one from the query
                                lat = response[0].lnglat[1]
                                lng = response[0].lnglat[0]
                                map.flyTo({
                                    center: response[0].lnglat
                                });
                                classRef.setState({ lng: response[0].lnglat[0], lat: response[0].lnglat[1] })
                                // console.log('{lng:response[0].lnglat[0],lng:response[0].lnglat[1]}')
                                // console.log({lng:response[0].lnglat[0],lat:response[0].lnglat[1]})
                                var el = document.createElement('div');
                                el.className = 'housingMarker';
                                var target_marker = new mapboxgl.Marker(el, {
                                    draggable: false,
                                    className: 'target_marker'
                                })
                                    // Get the location from Redux state
                                    // .setLngLat(store.getState().mapBox.current_location)
                                    .setLngLat([response[0].lnglat[0], response[0].lnglat[1]])
                                    .addTo(map)
                                    .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
                                        .setHTML('<h3>#' + 'Your Result' + '</h3>')
                                    )
                            }
                        });

                    }
                ).done(() => {
                    console.log(this.state.lng)
                    console.log(this.state.lat)
                    // classRef.setState({ lng: lng, lat: lat })
                }).done(() => {
                    console.log(lng)
                    console.log(lat)

                }).then(() => {
                    // set state for the map obj
                    classRef.setState({ mapObj: map })
                }).then(() => {
                    console.log(classRef.state.mapObj)
                }).then(() => {
                    console.log('fly to')
                    // classRef.state.mapObj.flyTo(this.state.flyToLngLat)
                })
        }







    }

    render() {
        return (
            <Fragment>
                {!this.state.redirectToLoginBool &&
                    <Fragment>
                        <ProgressBar percentage='75' />
                        <div style={styles.BottomCard}>
                            <BottomCard user={this.props.auth0} />
                        </div>
                        <div id='mapContainer'>

                            <div style={styles.mapContainer} ref={el => this.mapContainer = el} />

                        </div>
                    </Fragment>}

                {this.state.redirectToLoginBool &&

                    <div style={styles.promptLogin}>
                        <div>Prompt Login</div>
                        <LoginBtn />
                    </div>

                }


                <RenterNavBar />

            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    // classRef.state.mapObj.flyTo(this.state.flyToLngLat)

    return {
        flyToLngLat: state.lnglat,
        //   dashboardStats : state.dashboardStats
    };
}



export default connect(mapStateToProps)(withAuth0(RenterMap)) 