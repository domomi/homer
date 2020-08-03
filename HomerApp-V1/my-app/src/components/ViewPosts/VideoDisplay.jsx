

import React, { Component } from 'react'

// It's the video displaying component
import Clip from './Clip'
// A library for gesture
import AlloyFinger from 'alloyfinger';
import $ from 'jquery'

//  
const ENDPOINT = 'http://localhost:443'

const styles = {
  videoDiv: { textAlign: 'center' }
  , buttons: { textAlign: 'center' }
  , LastBtn: { float: 'left' }
  , NextBtn: { float: 'right' }
}

var classRef
//Movie is the div component with some buttons and the swipe for video display
export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // these are the clips' name
      sections: [

      ],
      position: 1,
      current_video_link : null,
      rooms : null
    };
    classRef = this

  }



  render() {

    const sections = this.state.sections
    const position = this.state.position
    return (
      <div id="videoDiv" style={styles} onLoad={() => this.swipeNext()}>

        {/* VideoClip component */}
        <Clip url={`http://localhost:443/playVideo${classRef.state.current_video_link}`} video_link={classRef.state.current_video_link} />

        {/* Next/Last video button */}
        <div style={styles.buttons}>
          <button onClick={() => this.lastVideo()} style={styles.LastBtn}>Last</button>
          {/* n-th video it is playing  */}
          {position}
          {`http://localhost:443/playVideo${classRef.state.current_video_link}`}
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
    

    function fetchVideoLinks() {
      console.log(process.env.REACT_APP_EXPRESS_ENDPOINT)
      console.log(classRef.props.post_id)
      let postID = { post_id: classRef.props.post_id, room_id : classRef.state.position }
      console.log(postID)
      $.ajax({
        type: "post",
        url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/get_video_links`,
        data: postID,
        dataType: "json",
        success: function (rooms) {
          console.log('response')
          console.log(rooms)
          classRef.setState({'rooms':rooms})
          classRef.setState({current_video_link : rooms[position -1].video_link})
          // classRef.setState()

        }
        , error(e) {
          console.log(e)
        }
      });

    }
    fetchVideoLinks()


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
            // Swipe left? Then the video link will be updated.
            binder.setState({ position: position,current_video_link : classRef.state.rooms[position -1].video_link });
          }
        } else if (evt.direction === "Right") {
          if (position > 0) {
            position--;
            // alert(this)
            // Swipe left? Then the video link will be updated.
            binder.setState({ position: position,current_video_link : classRef.state.rooms[position -1].video_link});
          }
        }
      }
    });
  }

  //When keys are pressed position in the state element will be updated
  nextVideo() {
    // if (this.state.sections.length){
    const position = this.state.position + 1;


    $.when( classRef.setState({ position: position })).then(()=>{
      classRef.setState({current_video_link : this.state.rooms[position -1].video_link})
    })
    
  }

  lastVideo() {
    const position = this.state.position - 1;
    $.when( classRef.setState({ position: position })).then(()=>{
      classRef.setState({current_video_link : this.state.rooms[position -1].video_link})
      console.log('this.state.rooms 141')
      console.log(this.state.rooms)
    })
  }



}
