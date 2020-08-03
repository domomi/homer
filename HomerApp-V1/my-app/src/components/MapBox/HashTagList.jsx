import React, { Component, Fragment } from 'react';
import {Button} from '@material-ui/core'
import $ from 'jquery'

var ENDPOINT = 'http://localhost:443'
class HashTagList extends Component {
    constructor(props){
        super(props)
        this.state ={
            instruction : {
                content : 'Please Click on the map to add hash tags',
                boolShow : true

            }
        }
    }

    componentDidMount(){
        $('.TagBtn').click((e)=>{
            this.setState({instruction:{...this.state.instruction,boolShow: !this.state.instruction.boolShow}})
            
            console.log('e.target.id')
            console.log(e.currentTarget.id)
            
            $.ajax({
                type: "post",
                url: `${ENDPOINT}/add_hash_tag`,
                data: {hash_tag : e.currentTarget.id},
                dataType: "dataType",
                success: function (response) {
                  
                }
              });
            
        })

        

    }




    render() {
        return (
            <Fragment>

          
            <div className='buttonDiv'>
                <Button variant="contained" color="primary" className='TagBtn' id='#bike_central' ref='#bike_central'>🚴🏻‍♀️Bike central</Button>
                <Button variant="contained" color="primary" className='TagBtn' id='#pets_friendly'>🐾Pets friendly</Button>
                <Button variant="contained" color="primary" className='TagBtn' id='#coffee_life'>☕Coffee life</Button>
            </div>

            { this.state.instruction.boolShow &&

                <p>{this.state.instruction.content}</p>
            }
            
            </Fragment>
        );
    }
}

export default HashTagList;