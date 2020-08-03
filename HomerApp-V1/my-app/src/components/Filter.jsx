import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import './Filter/Filter.css'
import PopularFilters from './Filter/PopularFilters'
import VerifiedHomes from './Filter/VerifiedHomes'
import InstantTour from './Filter/InstantTour'
import $ from 'jquery'
import { Link } from 'react-router-dom';


// picture icons for filter
import parkingpng from './Filter/img/parking.png'
import petssvg from './Filter/img/pets.svg'
import laundrysvg from './Filter/img/laundry.svg'
import wheelchairsvg from './Filter/img/wheelchair.svg'


const ENDPOINT = "localhost:8080";
const styles = {
    Filter: {
        zIndex: '5',
        margin: '0 5vw 0 5vw',
        width: '90%',
        background: 'white',
        top: '2vh',
        position: 'absolute',
     
    },

    topDivContainer: {
        marginLeft :'-45px'
    },
    quitBtn : {
        marginLeft : '3px',
        float : 'left'
    },
    Filter_Description: {
        fontSize: "10pt",
        color: "grey",
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
    }
}

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFilter: {}
        }
    }

    getUserFilter() {
        $.ajax({
            type: "get",
            url: `${ENDPOINT}/getUserFilter`,
            data: "application/json",
            success: function (user_filter) {
                this.setState(user_filter)
            }
        });
    }

    reset() {
        console.log("this.refs")
        console.log(this.refs)
        for (var ref in this.refs)
            this.refs[ref].reset();
    }

    render() {
        return (
            <div style={styles.Filter}>
                
                <div>
                 
                    <div  style={{float:'left',marginLeft:'45px'}}><Link to="/HomerMap">x</Link></div>
                    <div style={styles.topDivContainer}>
                        <div style={styles.coloredStripe}></div>
                        <div><b>Filters</b></div>
                    </div>

                </div>


                <Dropdown.Divider />

                <span id="Filter_Description"> <b>Popular filters</b></span>

                <p style={styles.Filter_Description}>These are some of the filters people searching
                for homes in Vancouver use
                </p>

                <div style={styles}>
                    {/* the props passed into the component will be rendered(handled inside) onto the screen  */}
                    <PopularFilters condition='pets' pic={petssvg} text='Pets allowed' ref='pets' />

                    {/* So when adding a new condition needs only the name of the condition and the link to the picture.*/}
                    <PopularFilters condition='parking' pic={parkingpng} text='Parking stall' ref='parking' />

                    <PopularFilters condition='laundry' pic={laundrysvg} text='Washer / Dryer in suite' ref='laundry' />

                    <PopularFilters condition='wheelchair' pic={wheelchairsvg} text='Wheel-chair accessible' ref='wheelchair' />
                    
                </div>

               
                


                <VerifiedHomes ref='VerifiedHomes' />



                <InstantTour ref='InstantTour' />

                <Dropdown.Divider />

                <h3> Amenities</h3>
                <span id="Amenities_Description" style={styles.Filter_Description}>Explore homes with extra-options that meet your needs </span>

                <PopularFilters condition='air_conditioning' ref='air_conditioning' pic={parkingpng} text='Air conditioning' />

                <PopularFilters condition='gym' ref='gym' pic={parkingpng} text='Gym in-building' />

                <PopularFilters condition='pool' ref='pool' pic={parkingpng} text='Pool in-building' />

                <PopularFilters condition='concierge' ref='concierge' pic={parkingpng} text='Conierage in-building' />

                <PopularFilters condition='day_care' ref='day_care' pic={parkingpng} text='Day Care Service' />

                <button onClick={() => { this.reset() }}>
                    Clear All
                </button>

            </div>
        )
    }
}
