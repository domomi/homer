import React, { Component, createRef, Fragment } from "react"
import { Circle, GoogleApiWrapper, Map, Marker } from "google-maps-react";
import $ from 'jquery'
import { Divider } from '@material-ui/core'

// Components
import GetLocation from './GetLocation'
import Filter from './Filter'
import Create from "./Create";
import ProfilePage from "./ProfilePage";
import ViewPosts from './ViewPosts'

// img for this page
import filterBtn from './Application/img/filter.svg'
import creatorBtn from './Application/img/creator.svg'

const ajaxDomainName = 'http://localhost:8080'

const styles = {
  container: {
    maxHeight: "100vh",
    position: 'relative'
  }
  ,
  Map: {
    position: 'fixed',
    width: '100%',
    height: '90vh',
    top: "0",
    zIndex: "0",
    bottom: '0'
  },

  inputToolbar: {
    display: 'fixed',
    top: '0',
    zIndex: 5
  },

  filterBtn: {

    maxWidth: '30px',

  },
  // Beacon Setup
  beaconConfigurationDiv: {
    zIndex: '4',
    margin: '0 3vw 0 3vw',
    position: 'fixed',
    bottom: '0',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column'
  },

  coloredStripe: {
    marginTop: '5px',
    color: 'grey',
    backgroundColor: 'grey',
    height: '4px',
    fontSize: '1pt',
    width: '60px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '50px'
  },

  setupBeaconText: {
    color: 'black',
    margin: '0'
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
  creatorBtn: {
    left: '45%',
    position: 'fixed',
    maxWidth: '55px',
    // zIndex : '3',
    bottom: '5vh',
    backgroundColor: 'rgb(200,100,5)',
    borderRadius: '100%'
  },




}


var lat
var lng
export class MapContainer extends Component {

  constructor(props) {


    super(props);

    this.closeFilter = this.closeFilter.bind(this)
    // circleRef, used to access the circle
    this.circleRef = createRef()
    // The labels should be passed in as state
    this.state = {
      stores: [{ lat: 49.2827123, lng: -123.1207, type: 'info' },
      // { latitude: 49.2827322, longitude: -123.120771, type: 'parking' },
      // { latitude: 49.2826567, longitude: -123.120726208496, type: 'library' },
      // { latitude: 49.2824212, longitude: -123.1207325, type: 'library' },
      // { latitude: 49.28232342, longitude: -123.1207121, type: 'library' },
      // { latitude: 49.28232322, longitude: -123.12075407, type: 'info' },
      { latitude: 49.2827, longitude: -123.1207, type: 'parking' }]
      ,

      // The components to show:
      showFilter: false,
      showCreate: false,
      showProfile: false,
      viewPosts: false,
      beaconConfiguration: false,
      // The radius of the circle()
      radius: 100,
      circle: null,
    }

    this.toggleComponent = this.toggleComponent.bind(this)
    this.updateRadius = this.updateRadius.bind(this);
    this.showBeaconConfigPage = this.showBeaconConfigPage.bind(this);

  }

  closeFilter(){
    this.toggleComponent('entry')
  }

  updateRadius() {
    let data
    console.log("this.state.radius")
    try {
      console.log(this.circleRef.circle['radius'])
      let beaconRadiusRange = parseInt(document.getElementById('beaconRadiusRange').value)
      console.log(beaconRadiusRange)
      console.log(beaconRadiusRange)
      this.setState({ radius: beaconRadiusRange })
      this.circleRef.circle['radius'] = beaconRadiusRange
      console.log(this.circleRef.circle['radius'])
      this.setState({ radius: beaconRadiusRange })

      document.getElementById('beaconRadiusRange').value = this.state.radius
      console.log(this.state.radius)
      console.log(document.getElementById('beaconRadiusRange').value)

      data = {
        centerLat: this.circleRef.circle['center'].lat,
        centerLng: this.circleRef.circle['center'].lng,
        radius: this.circleRef.circle['radius'],
        centerGps: this.state.circle.props.center
      }
      console.log("data 126")
      console.log(data)
    }

    catch (e) {
      console.log(e)
    }
    finally {

      this.setState({
        circle: <Circle
          ref={(ref) => this.circleRef = ref}
          center={this.state.centerGps ? this.state.centerGps : { lat: lat, lng: lng }}
          radius={this.state.radius}
          strokeColor="orange"
          strokeOpacity={0.2}
          strokeWeight={1}
          fillColor="red"
          fillOpacity={0.5}
          editable={true}
          draggable={true}
        // radius_changed={this.updateRadius}
        />


      })


      console.log("data 154")
      console.log(data)
      $.ajax({
        type: "POST",
        url: `${ajaxDomainName}/updateBeaconRadius`,
        data: data,
        dataType: "json",
        success: (homeposts) => {
          console.log("successful")
          console.log(homeposts)
        },

      });



    }

  }


  onMapClicked = (mapProps, map, event) => {
    const { markers } = this.state;
    lat = event.latLng.lat();
    lng = event.latLng.lng();
    console.log(lat)
    console.log(lng)



    this.setState({
      circle: <Circle
        ref={(ref) => this.circleRef = ref}
        center={this.state.centerGps ? this.state.centerGps : { lat: lat, lng: lng }}
        radius={this.state.radius}
        strokeColor="orange"
        strokeOpacity={0.2}
        strokeWeight={1}
        fillColor="red"
        fillOpacity={0.5}
        editable={true}
        draggable={true}
        radius_changed={this.updateRadius}

      />
    })


  }


  toggleComponent(name) {
    switch (name) {
      case 'entry':
        this.setState({ showFilter: false, showCreate: false, showProfile: false, viewPosts: false, beaconConfiguration: false })
        break;
      case "showFilter":
        this.setState({ showFilter: !this.state.showFilter, showCreate: false, showProfile: false, viewPosts: false, beaconConfiguration: false });
        break;
      case "showCreate":
        this.setState({ showCreate: !this.state.showCreate, showFilter: false, showProfile: false, viewPosts: false, beaconConfiguration: false });
        break;
      case "showProfile":
        this.setState({ showProfile: !this.state.showProfile, showFilter: false, showCreate: false, viewPosts: false, beaconConfiguration: false });
        break;
      case 'viewPosts':
        this.setState({ viewPosts: !this.state.viewPosts, showCreate: false, showFilter: false, showProfile: false, beaconConfiguration: false })
      case 'beaconConfiguration':
        this.setState({ beaconConfiguration: !this.state.beaconConfiguration, showCreate: false, showFilter: false, showProfile: false, viewPosts: false })
    }
  }

  _onClick(obj) { console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event); }

  displayMarkers = () => {

    var iconBase =
      'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

    var icons = {
      parking: {
        icon: iconBase + 'parking_lot_maps.png'
      },
      library: {
        icon: iconBase + 'library_maps.png'
      },
      info: {
        icon: iconBase + 'info-i_maps.png'
      }
    };

    // Use Map to list render all the items in the icon array
    return this.state.stores.map((store, index) => {
      // They are seen as props.
      return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude,
      }
      } icon={icons[store.type].icon}
        onClick={() => console.log(store)} />
    })
  }


  showBeaconConfigPage() {
    // Display the component upon call
    console.log("invoked")
    this.setState({ beaconConfiguration: true });
    this.toggleComponent("beaconConfiguration")
  }



  render() {

    // Dereference state into showFilter and showCreate.
    const { showFilter, showCreate, showProfile, viewPosts, beaconConfiguration } = this.state;
    return (
      <div style={styles.container}>
        {/* // {GetLocation} */}
        {/* <GetLocation /> */}

        <div style={styles.inputToolbar}>
          <input placeholder='add a neighbourhood'></input>
          <button>Add tags</button>
          <img style={styles.filterBtn} src={filterBtn} onClick={() => this.toggleComponent("showFilter")} />

        </div>


        <button onClick={() => this.toggleComponent("showProfile")}>showProfile</button>
        <button onClick={() => this.toggleComponent("viewPosts")}>viewPosts</button>

        {/* When show*** is true, then render such an object. */}
        {showFilter && <Filter style={styles.Filter} closeTab={this.closeFilter}/>}
        {showCreate && <Create showBeaconConfigPage={this.showBeaconConfigPage} />}
        {showProfile && <ProfilePage />}
        {viewPosts && <ViewPosts />}
        {/* Beacon Configuration is something that needs to interect with the map,
            So I will put it here instead of inside 'showCreate' */}

        {beaconConfiguration &&
          <Fragment>

            <div id='beaconConfiguration' style={styles.beaconConfigurationDiv}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ float: 'left', marginLeft: '3vw' }} onClick={()=>this.toggleComponent('entry')}>x</div>
                <div style={styles.coloredStripe}></div>
                <div style={styles.setupBeaconText}>setup beacon</div>
              </div>

              <Divider variant="middle" color='white' />
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
                <input type='range' id='beaconRadiusRange' max='10000' min='100' onChange={this.updateRadius} />


              </form>

            </div>
          </Fragment>}



        <Map
          onClick={this.onMapClicked}
          google={this.props.google}
          zoom={8}
          style={styles.Map}
          initialCenter={{ lat: 49.444, lng: -122.176 }}
        >
          {this.displayMarkers()}
          {this.state.circle}
          <img style={styles.creatorBtn} src={creatorBtn} onClick={() => this.toggleComponent("showCreate")} ref='createBtn' />
        </Map>



        {/* <GoogleMapReact /> */}
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAYw_Hjmg5RVoD-o-AXbbHUBTVSXY_Juf4'
})(MapContainer);