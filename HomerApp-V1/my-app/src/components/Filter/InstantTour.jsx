import React, { Component } from 'react'
import Toggle from 'react-toggle'
import $ from 'jquery'

const styles = {
    Toggle: {
        float: "right"
        , marginTop: '0'
        , marginRight: '5vw'
        , marginBottom: '5vh'
    },
    container: {
        display: 'inline-flex',
        textAlign: 'left',
    }
}
export default class InstantTour extends Component {

    constructor(props) {
        super(props)
        this.state = {
            instantTour: false
        }
    }
    
    async reset(){
        await this.setState({instantTour : false})
        console.log(this.state)
    }


    async handleChange() {
        console.log(this.state.instantTour)
        console.log("this.state.instantTour")
        await this.setState(
            { instantTour: !this.state.instantTour }
        )
        return this.state.instantTour

    }

    async updateFilter() {
        console.log("updated: in line 28")



        let data = JSON.stringify({ instantTour: this.state.instantTour })

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
            <div >
                <h3>InstantTour</h3>
                <div style={styles.container}>


                    <p>Book in-person home tours without waiting for the home-owner to respond</p>

                    <div style={styles.Toggle}>
                        <Toggle
                            checked={this.state.instantTour}
                            onClick={() => { this.handleChange().then(checked => { console.log(checked); this.updateFilter(checked) }) }} />
                    </div>


                </div>
            </div>
        )
    }
}
