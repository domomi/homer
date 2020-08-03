import React, { Fragment } from 'react';
import { Redirect } from 'react-router';
import {
  getCurrentLocation,
  createHashTagMarkers,
  updateHashTagMarkers,
  removeHashTagMarker
} from '../actions/mapActions'


import { connect } from 'react-redux';

import $ from 'jquery'

import frameworkPng from './MapBox/img/Framework.png'
import MapboxCircle from 'mapbox-gl-circle'

import Button from '@material-ui/core/Button';
import Webcam from "react-webcam";

import store from '../store'

import HashTagConfigCard from './MapBox/HashTagConfigCard'
import HashTagChoices from './MapBox/HashTagChoices'

import default_picture from './MapBox/img/default_picture.png'

// MapBox gl
import './MapBox/MapBox.css'
import mapboxgl from 'mapbox-gl';
import './MapBox/mapbox-gl.css'
import { Route } from 'react-router-dom';
mapboxgl.accessToken = 'pk.eyJ1Ijoicmlja3NvbjIwMjAiLCJhIjoiY2tkMGxiY3FuMDNwYjJ0bnV1a2g5bThxaSJ9.ZatvhnN4mf-f47KYWUC1Sg'

// Data Fetched from redux
var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-123.1199, 49.2757]
    },
    properties: {
      title: 'Framework',
      description: 'YaleTown'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-123.1376, 49.2901]
    },
    properties: {
      title: 'Framework',
      description: 'West End'
    }
  }]
};



const styles = {
  mapContainer: {
    position: 'absolute',
    top: '3vh',
    right: 0,
    left: 0,
    bottom: 0,
    height: '85vh',

  },
  coordinates: {
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    position: 'fixed',
    top: '5vh',
    left: '10px',
    padding: '5px 10px',
    margin: 0,
    fontSize: '11px',
    lineHeight: '18px',
    borderRadius: '3px',
    display: 'none',
    zIndex: '100'
  },
  buttons: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    position: 'absolute',
    bottom: '15vh',
    backgroundColor: 'rgba(44,44,44,0.7)'
  },
  interactionDiv: {
    position: 'fixed',
    bottom: '60px'
  },
  HashTagControlCard: {
    position: 'fixed',
    bottom: '00px'
  }


}
var classRef = null;

const take_picture_html5 = ''

class MapBox extends React.Component {

  constructor({ props }, context) {
    super({
      getCurrentLocation,
      createHashTagMarkers,
      updateHashTagMarkers,
      removeHashTagMarker
    }, context);
    // longitude, latitude, zoom
    this.state = {
      lng: -123.1207,
      lat: 49.2827,
      zoom: 15,

      // 
      mapObj: null,
      instructions: {
        delete_marker: 'Click on your target marker and then press "YES" '
      },
      description: {
        housemates: 'looking for a housemate',
        seeking_home: 'a new place to live',
        home_listing: 'home_listing',
        in_home_help: 'in_home_help',
        moving_help: 'moving_help',
        default_hold: 'default_hold',
      },
      // Type of the #tag
      currentHashTag: null,
      // the picture of the #tag
      hashTagPicture: default_picture,
      // Hide
      mapOnlyBool : false ,

    };
    classRef = this
  }







  componentDidMount() {
    // 
    $('.mapboxgl-ctrl-geolocate').on('click',
      () => {
        console.log(classRef.state)
        console.log(map.getCenter())
      })

    $('#HashTagControlCard').hide()
    $('#interactionDiv').hide()

    $('#addHashTagBtn').click(() => {
      $('#addHashTagBtn').hide()
      $('#hashTagBtns').show()
    })
    // Don't show the btns for this page
    $('.header').css('display', 'none')

    // The map comes first
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    // Find the current location
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    // map.on('locationfound', function(e) {
    //   console.log('locationfound')
    //   console.log(e)
    // })





    // $('.mapboxgl-control-container').css('display', 'none')
    this.setState({ mapObj: map })


    geojson.features.forEach(function (marker) {

      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'housingMarker';
      // el.style = styles.housingMarker



      console.log(marker.geometry.coordinates)

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(map);
      console.log(el)


      $('.mapboxgl-ctrl-geolocate').css('z-index', 100)
      // $('.mapboxgl-ctrl-geolocate').show()

      //Adjustable circle 
      var myCircle = new MapboxCircle({ lat: 49.5, lng: -123.1376 }, 10, {
        editable: true,
        minRadius: 100,
        fillColor: '#29AB87',

      }).addTo(map);
      console.log(myCircle)

      myCircle.on('centerchanged', function (circleObj) {
        console.log('New center:', circleObj.getCenter());
      });

      myCircle.once('radiuschanged', function (circleObj) {
        console.log('New radius (once!):', circleObj.getRadius());
      });

      myCircle.on('click', function (mapMouseEvent) {
        console.log('Click:', mapMouseEvent.point);
      });

      myCircle.on('contextmenu', function (mapMouseEvent) {
        console.log('Right-click:', mapMouseEvent.lngLat);
      });



    });


  }


  // The markerType is the type of marker e.g. pets_friendly
  // It will be read into the function and then be dealt with.
  addMarkers(markerType) {

    // The map object is stored in the component's state,
    // So are just using it for convenience!
    var map = this.state.mapObj


    // The coordinates will be shown in the <pre></pre> elements
    var coordinates = document.getElementById('coordinates');

    // the element that holds the marker,
    // icons decided by their class name, so 
    var el = document.createElement('div');
    el.className = markerType;

    // This SMART block of code allows the user to hide 
    // the #tag editing window and see just the map itself,
    // what a GOD level of UX! Isn't it?
    $('.mapboxgl-map').on('click', (e) => {
      console.log('onMapClicked')
      console.log($('#HashTagConfigCard'))
      // HashTagConfigCard will be hidden
      classRef.setState({ HashTagConfigCardBool: false })

      $(el).on('click', (e) => {
        $.when().then(() => {
          // If the user clicks on anywhere other than the marker,
          // The config card will disappear
          e.stopPropagation()

          // HashTagConfigCard will be shown
          classRef.setState({
            HashTagConfigCardBool: true,
            mapOnlyBool : true
          })

          var currentID = e.target.id

          $.ajax({
            type: "post",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/HashTagPictures/${currentID}`,
            data: "data",
            dataType: "text",
            success: function (response) {
              classRef.setState({hashTagPicture: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/HashTagPictures/${currentID}`})
            },
            error :(err)=>{
              console.log('err')
              classRef.setState({hashTagPicture: default_picture})
            }
        });

          console.log(`currentID 300 ${currentID}`)
          classRef.setState({ chosen_marker_id: currentID, currentHashTag: markerType })


          $('#interactionDiv').show()
        })
          .then(() => {
            // We need to add a new EventListener back
            // once the click-on-marker event is handled
            // This design is a disgrace to the intelligence of the mankind😠
            $('.mapboxgl-map').on('click', (e) => {
              classRef.setState({ HashTagConfigCardBool: false, mapOnlyBool : false })
            })
          })



      })

    })

    // Since it's newly created we have it's created timestamp as the id! 
    el.setAttribute('id', Date.now())


    var marker = new mapboxgl.Marker(el, {
      draggable: true,
      className: 'marker_testing_doesnt_work'
    })
      // Get the location from Redux state
      // .setLngLat(store.getState().mapBox.current_location)
      .setLngLat([map.getCenter().lng, map.getCenter().lat])
      .addTo(map)
      .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
        .setHTML('<h3>#' + markerType + '</h3>')
      )




    console.log(store.getState().mapBox.current_location)
    classRef.props.createHashTagMarkers(markerType, store.getState().mapBox.current_location, el.id);


    // When being clicked, the <pre></pre> coordinates hide.
    $(coordinates).click(() => {
      $(coordinates).toggle()
    })


    function onDrag(e) {
      // When Being Dragged, the coordinates show up
      $(coordinates).show()
      var lngLat = marker.getLngLat();
      coordinates.style.display = 'block';
      coordinates.innerHTML =

        'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }


    function onDragEnd(e) {

      var currentID = e.target._element.id
      console.log(`The ID of the #tag: ${currentID}`)
      var lngLat = marker.getLngLat();
      coordinates.style.display = 'block';
      coordinates.innerHTML =
        'Your Marker is placed at \n' +
        'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
      console.log([lngLat.lng, lngLat.lat])
      classRef.props.updateHashTagMarkers(markerType, [lngLat.lng, lngLat.lat], currentID)
      $('.MarkerPopUpUpload').on('click', () => {
        console.log('MarkerPopUpUpload')
      })
    }

    function onClick(e) {

      $('.MarkerPopUpUpload').on('click', () => {
        console.log('MarkerPopUpUpload')
      })


      console.log('onClick')

      var currentID = e.target._element.id
      console.log(`currentID 332 ${currentID}`)
      classRef.setState({ chosen_marker_id: currentID })
    }


    // When the marker is dragged, the info will be updated.
    marker.on('drag', onDrag);
    marker.on('dragend', onDragEnd);
    marker.on('click', onClick);
    console.log($('.MarkerPopUpUpload'))

    $(marker).ready(function () {
      $('.MarkerPopUpUpload').on('click', () => {
        console.log('MarkerPopUpUpload')
      })
    });

  }

  // Functions used by the addMarkers() function,
  // get location after the user has given permission
  getLocation() {
    console.log(classRef.state)
    var lat = classRef.state.lat
    var lng = classRef.state.lng
    classRef.props.getCurrentLocation([lng, lat])
    if (navigator.geolocation) {
      let current_position = navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('none')
    }
  }

  // Stores the position to the Redux Store.
  // It's the user's current location.
  showPosition(position) {
    console.log(classRef.state)
    var lat
    var lng

    $.when().then(() => {




      console.log(position.coords)
      lat = position.coords.latitude
      lng = position.coords.longitude
      console.log([lat, lng])
      classRef.setState
        (
          {
            lng: lng,
            lat: lat,
            zoom: 5,
          })

    }).then(() => {
      console.log([lng, lat])

      $('.MarkerPopUpUpload').click(() => {
        console.log('MarkerPopUpUpload')
      })

      classRef.props.getCurrentLocation([lng, lat])
      //   classRef.state.mapObj.flyTo({
      //     center:  [classRef.state.lng,classRef.state.lat]
      //     ,   
      //     zoom: 15,
      //     bearing: 0,
      //     speed: 2, // make the flying slow
      //     curve: 1.5, // change the speed at which it zooms out
      //     easing: function(t) {
      //     return t;
      //     },
      //     // this animation is considered essential with respect to prefers-reduced-motion
      //     essential: true
      //     });      
    })
  }

  // delete the marker by ID
  deleteMarker() {
    // Once you have triggered the delete event,
    // you need to either finish deleting it,
    // or to come back from the delete event. 
    $('#deleteMarkerBtn').hide()
    console.log(classRef.state.instructions.deleteMarker)
    $('#instructionsDiv').html(classRef.state.instructions.delete_marker)
    console.log(store.getState().mapBox.tag_list)

    // Remove from storage
    classRef.props.removeHashTagMarker(classRef.state.chosen_marker_id)
    // Remove from frontend display as well
    $(`#${classRef.state.chosen_marker_id}`).remove()
  }

  chooseFile() {
    $('#fileUploadInput').click()
  }

  fileUplod() {
    console.log('fileUplod')
  }


  onCardClick(e) {
    e.stopPropagation()
  }

  render() {
    // Ready for the use of material UI classes in the future
    const { classes } = this.props;

    return (
      <div>

        <div>
          {/* the <p> is not displaying */}
          <p style={styles.coordinates}>Your Marker is placed at:</p>
          <pre style={styles.coordinates} id="coordinates" className="coordinates">dffd</pre>
        </div>

        <div style={styles.mapContainer} ref={el => this.mapContainer = el} />







        {classRef.state.HashTagConfigCardBool
          &&
          <HashTagConfigCard onClick={(e) => this.onCardClick(e)}
            // to name the picture
            chosen_marker_id={this.state.chosen_marker_id}
            title={this.state.currentHashTag}
            image={this.state.hashTagPicture}
            style={styles.interactionDiv} />
        }

        <Route path='/MapBox/HashTagChoices'>
          <Fragment>
            {classRef.state.mapOnlyBool && <Redirect push to="/MapBox" />}
            <div id='hashTagBtns' style={styles.buttons}>
              <Button variant='contained' color='primary' onClick={() => this.addMarkers('housemates')}>👨‍👩‍👧‍👦#housemates</Button>
              <Button variant='contained' color='primary' onClick={() => this.addMarkers('seeking_home')}>🏠#seeking-home</Button>
              <Button variant='contained' color='primary' onClick={() => this.addMarkers('home_listing')}>📹#home-listing</Button>
              <Button variant='contained' color='primary' onClick={() => this.addMarkers('in_home_help')}>✋#in-home-help</Button>
              <Button variant='contained' color='primary' onClick={() => this.addMarkers('moving_help')}>🚚#moving-help</Button>
              <Button variant='contained' color='primary' onClick={() => this.addMarkers('default_hold')}>#default-hold</Button>

              <Button variant='contained' color='secondary' id='deleteMarkerBtn' onClick={() => this.deleteMarker()}>Delete Markers</Button>
            </div>

            <div id='instructionsDiv'>Instructions</div>

          </Fragment>
        </Route>

      </div>
    )
  }
}

MapBox.propTypes = {

};

function mapStateToProps(state, ownProps) {
  return {

  };
}

export default connect(null, { getCurrentLocation, createHashTagMarkers, updateHashTagMarkers, removeHashTagMarker })((MapBox));
