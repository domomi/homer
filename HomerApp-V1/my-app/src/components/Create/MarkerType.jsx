import React, { Component } from 'react'

const styles = {
    div : {
        display : 'flex',
        minWidth : '20vw',
        maxWidth : '33vw',
        textAlign : 'left',
        marginLeft : '3vw',
        flexDirection : 'column'
    },
    img : {
        maxWidth : "15vw"
        , borderRadius : "100px"
        , borderStyle : 'solid'
        , borderWidth : '2px'
        // , maxHeight : '15px'
        , backgroundColor :   'rgb(200,100,5)' 
        , marginLeft : '5vw'
    },
    text : {
        marginLeft : '1vw'
    },
    onIt : {
        maxWidth : "15vw"
        , borderRadius : "100px"
        , borderStyle : 'solid'
        , borderWidth : '2px'
        , backgroundColor :   'green' 
        , marginLeft : '5vw'
    }
}

export default class MarkerType extends Component {
    constructor(props){
        super(props)
        
    }
    
    render() {
        // onClick={this.props.onClick} is a must to listen to events from parent component
        return (
            <div style={styles.div} onClick={this.props.onClick}>
                <img src={this.props.pic} style = { this.props.onIt? styles.onIt : styles.img}  />
                <span style={styles.text}>{this.props.text}</span> 
            </div>
        )
    }
}
