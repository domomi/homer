import React, { Component } from 'react';
// import Calendar from 'react-calendar';
import DateTimePicker from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';
import $ from 'jquery'
import houseJPG from './img/house.jpg'
import { Button } from '@material-ui/core';
var ENDPOINT = 'http://localhost:443'


class CalendarPage extends Component {
  state = {
    date: new Date(),
  }

  onChange = date => {
    console.log(date)
    this.setState({ date })
    let data = { 'date': date }
    $.ajax({
      type: "post",
      url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/schedule_a_visit`,
      data: data,
      dataType: "json",
      success: function (response) {
          console.log(response)

      }
    });
  }


  componentDidUpdate() {


  }

  confirmSchedule(){
    console.log('confirmSchedule()')
  }

  render() {
    return (
      <div>
        {/* <Calendar
          onChange={this.onChange}
          value={this.state.date}
        /> */}

        <DateTimePicker
          onChange={this.onChange}
          value={this.state.date}
        />

      <p>You have schedule a visit at {this.state.date.toString()}</p>
      <img style={{maxWidth : '100vw'}} src={houseJPG} alt='house'/>
    
      <Button variant='contained' color='primary' onClick={()=>this.confirmSchedule()}> Confirm </Button>
      </div>



    );
  }
}
export default CalendarPage