

import React, { Component } from 'react'
import Clip from './Clip'
import AlloyFinger from 'alloyfinger';

const styles = {
  videoDiv : {textAlign : 'center'}
  , buttons : {textAlign : 'center'}
  , LastBtn : {float : 'left'}
  , NextBtn : {float : 'right'}
}

//Movie is the div component with some buttons and the swipe for video display
export default class Movie extends Component {
  constructor() {
    super();
    this.state = {
      // these are the clips' name
      sections: [
        '1.mp4',
        '2.mp4',
        '3.mp4',
        '4.mp4'
      ],
      position: 0
    };
  }
  render() {

    const sections = this.state.sections
    const position = this.state.position
    return (
      <div id="videoDiv" style={styles} onLoad={() => this.swipeNext()}>

        {/* VideoClip component */}
        <Clip url={sections[position]} />

        {/* Next/Last video button */}
        <div style={styles.buttons}> 
          <button onClick={() => this.lastVideo()} style={styles.LastBtn}>Last</button>
          {/* n-th video it is playing  */}
          {position}

          <button onClick={() => this.nextVideo()} style={styles.NextBtn}>Next</button>
        </div>


        {/* <div id="test" style={{backgroundColor:"red"}}>dfdfdf</div> */}

      </div>
    )
  }

  // When the component is loaded, this function is invoked, 
  // The code inside the function deal with touch events
  // 
  componentDidMount() {
    var position = this.state.position;
    //binder serves as a bridge between the component and and vanilla JS functions.
    var binder = this;
    const videoDiv = document.getElementById("videoDiv")

    // AlloyFinger is the Library Object to handle touch events 
    new AlloyFinger(videoDiv, {
      touchMove: function (evt) {
        console.log(videoDiv)
        if (Math.abs(evt.deltaX) >= Math.abs(evt.deltaY)) {
          evt.preventDefault();
        }
      },
      swipe: function (evt) {
        console.log(videoDiv)
        if (evt.direction === "Left") {
          if (position < 3) {
            position++;
            // alert(this)
            binder.setState({ position: position });
          }
        } else if (evt.direction === "Right") {
          if (position > 0) {
            position--;
            // alert(this)
            binder.setState({ position: position });
          }
        }
      }
    });
  }

  //When keys are pressed position in the state element will be updated
  nextVideo() {
    const position = this.state.position + 1;
    this.setState({ position: position });
  }

  lastVideo() {
    const position = this.state.position - 1;
    this.setState({ position: position });
  }



}
