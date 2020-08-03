import React, { Component } from 'react'
import Toggle from 'react-toggle'

import { Dropdown } from 'react-bootstrap'
import $ from 'jquery'

const styles = {
    Toggle: {
        // float: "right",
        // marginTop : '50px'
    },
    container: {
        display: 'block'
        , marginRight: '5vw'
    }
}


export default class VerifiedHomes extends Component {
    constructor() {
        super()
        this.state = {
            verified_homes: false
        }
    }

    async reset(){
        await this.setState({verified_homes : false})
        console.log(this.state)
    }

    async handleChange() {
        console.log(this.state.verified_homes)
        console.log("this.state.verified_homes")
        await this.setState(
            { verified_homes: !this.state.verified_homes }
        )
        return this.state.verified_homes
       
    }

    async updateFilter() {
        console.log("updated: in line 28")
     
     

        let data = JSON.stringify( { verified_homes: this.state.verified_homes })
        
        $.ajax({
            type: "post",
            url: "http://localhost:3000/updateFilter",
            data: data,
            contentType: "application/json",
            success: function (response) {

            }
        });
    }



    render() {
        return (
           
            <div>
           
                <h3>Verified Homes</h3>
                <span>Homer Partners</span>
                <p>A selection of homes to rent verified for quality, services and home-owner
                to respond
                </p>
                <div style={styles.Toggle}>
                    <Toggle
                        checked={this.state.verified_homes}
                        onChange={() => { this.handleChange().then(checked =>{ console.log(checked); this.updateFilter(checked) } ) }} />
                </div>
                <div>

                </div>

                <Dropdown.Divider />
            </div>
        )
    }
}
