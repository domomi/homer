import React, { Component } from 'react';
import Calendar from 'react-calendar';
import DateTimePicker from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';
import $ from 'jquery'

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
      url: `${ENDPOINT}/schedule_a_visit`,
      data: data,
      dataType: "json",
      success: function (response) {

      }
    });
  }


  componentDidUpdate() {


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
      </div>



    );
  }
}
export default CalendarPage