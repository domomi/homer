import React from 'react'

const styles = {
  videoDiv : {
    width : '95vw',
    marginLeft : '1vw'
  }
}

function Clip({ url,video_link }) {
  console.log('props.video_link')
    console.log(video_link)

  


    return (
      <video key={url} controls autoPlay id="videoDisplay" style={styles.videoDiv}>
        <source src={url} type="video/mp4" />
      </video>
    );
  }
  
  export default Clip