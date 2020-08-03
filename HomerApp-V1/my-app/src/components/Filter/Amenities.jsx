import React, { Component } from 'react'


export default class PopularFilters extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <div>
                <span>Filter Condition</span>
                {/* <img src={this.props.img}> </img> */}
                <input type='checkbox' />
            </div>
        )
    }
}
