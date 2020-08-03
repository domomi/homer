import React, { Component } from 'react'
import $ from 'jquery'
const x = document.getElementById("demo");
export default class GetLocation extends Component {

    getLocation() {
        if (navigator.geolocation) {
            let current_position = navigator.geolocation.getCurrentPosition(classRef.showPosition);
            console.log(current_position)
        } else {
            console.log('none')
        }
    }
    showPosition(position) {
        console.log(position.coords)
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        console.log([lat, lng])

        classRef.setState({ current_location: [lat, lng] })
    }

    componentDidMount() {

    }
    render() {
        return (
            <div id="demo">
                <button onClick={this.getLocation}>Get Geolocation</button>
            </div>
        )
    }
}
