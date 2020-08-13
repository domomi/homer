import React, { Component, Fragment } from 'react'
import $ from 'jquery'
import ProgressBar from '../../ProgressBar'
import './MapBox.css'
import './mapbox-gl.css'
import mapboxgl from 'mapbox-gl';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { StylesProvider } from '@material-ui/core';
import HomeOwnerNavBar from '../HomeOwnerNavBar/HomeOwnerNavBar'
import BottomCard_step1 from './Components/BottomCard_step1/BottomCard_step1'
import BottomCard_step2 from './Components/BottomCard_step2/BottomCard_step2'
mapboxgl.accessToken = 'pk.eyJ1Ijoicmlja3NvbjIwMjAiLCJhIjoiY2tkMGxiY3FuMDNwYjJ0bnV1a2g5bThxaSJ9.ZatvhnN4mf-f47KYWUC1Sg'
// `${process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}`;

const styles = {
    mapContainer: {
        position: 'relative',
        top: '5vh',
        right: 0,
        left: 0,
        bottom: 0,
        height: '85vh',
        maxWidth: '100vw'
    },
    BottomCard: {
        position: 'absolute',
        top: '15vh',
        zIndex: 100,
    }
}

var classRef;
export default class RenterMap extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lng: -123.1207,
            lat: 49.2827,
            zoom: 15,

            // lng lat of the location
            home_location: null,
            // the mapObj
            mapObj: null,
        }
        classRef = this
    }

    componentDidMount() {
        $('#user_role_display').html('Home Owner')
        var map
        $.when().then(() => {
            map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.state.lng, this.state.lat],
                zoom: this.state.zoom
            });
            map.on('load', () => {
                // Find the current location
                map.addControl(
                    new mapboxgl.GeolocateControl({
                        positionOptions: {
                            enableHighAccuracy: true
                        },
                        trackUserLocation: true
                    })
                );

                // Coder
                map.addControl(
                    new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        mapboxgl: mapboxgl
                    })
                );



                let geocoder = $('.mapboxgl-ctrl-geocoder')
                $('#geocoder').append(geocoder)

            })
        }).then(() => {
            // set state for the map obj
            classRef.setState({ mapObj: map })
        })

    }

    getCurrentLocation(){
        let map = classRef.state.mapObj
        // Center of the Map
        console.log(map.getCenter())
    }

    render() {
        return (
            <Fragment>
                <ProgressBar percentage='75' />
                <div style={styles.BottomCard}>
                    <BottomCard_step1 action={this.getCurrentLocation} />
                </div>
                <div id='mapContainer'>

                    <div style={styles.mapContainer} ref={el => this.mapContainer = el} />

                </div>


                <HomeOwnerNavBar  />
            </Fragment>
        )
    }
}
