import React, { Component, Fragment } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from './utils';
import houseSVG from './house.svg'
import { Button } from '@material-ui/core'
import { withStyles, withTheme } from "@material-ui/core/styles";
import Typography from 'material-ui/styles/typography';
import bricktextureJFIF from './bricktexture.jfif'
import dollHouseJPG from './doll-house-cartoon-vector.jpg'
import './Attributes.css'
import $ from 'jquery'
import {Route, Link } from 'react-router-dom';
var clip_percentage = 100
const groupStyle = {
  marginLeft: '50px',
  flex: 1,
  // backgroundColor:'blue',
  fontSize: '15pt',
  // color : 'white'
};

const styles = theme => ({
  important_attributes: {

  },
  houseSVG: {
    maxWidth: '85vw',
    position: 'absolute'
  },
  chooseItemContainer: {
    // backgroundColor : 'yellow',
    minWidth: '50vw',
    position: 'fixed',
    bottom: '30vh'
  }
  ,
  imgContainer: {
    position: 'relative'
  },


  homeDropContainer: {
    // backgroundColor : 'rgb(150,250,240)',
    position: 'absolute',
    top: '25vh',
    left: '10vw',
    minHeight: '35vh',
    textAlign: 'center',
    width: '85vw',
    // backgroundImage: `url(${houseSVG}) `,
    // backgroundImage: 'no-repeat'
  },
  dragItems: {
    // backgroundColor : 'rgb(3,182,252)',
    // color : 'white',

  },
  dollHouse: {
    maxWidth: '100vw',
    position: 'absolute',
    top: '15vh',
    clip: `rect(200px, 600px, 200px, 0)`
  },
  FinishBtn : {
    position : 'fixed',
    bottom : '15vh',
    left : '40vw'
  }

})








// const useStyles = makeStyles((theme) => ({

// })

class Groups extends Component {
  constructor(props) {
    super();

    this.state = {
      items1: [{ id: '1', data: 'Energetic & Lively', }, { id: '2', data: 'Nearby Nature' }, { id: '3', data: 'Cozy & Comfy' }, { id: '4', data: 'Transit Central' }],
      items2: [{ id: '5', data: 'Quiet', }],
      clip_percentage: 0
    };
  }
  handleDrop(e) {
    {
      this.setState(prevState => ({ items1: applyDrag(this.state.items1, e), clip_percentage: prevState.clip_percentage + 3 }));
      $('#dollHouse').css('clip', `rect(${parseInt(200 - parseInt((this.state.clip_percentage) * 15))}px, 600px, 200px, 0)`)
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <h5>Which attributes matter most to you in a home?</h5>
        <p>Select by order of importance</p>
        <div className={classes.imgContainer}>
          <img src={houseSVG} className={classes.houseSVG} />
          <img src={dollHouseJPG} className={classes.dollHouse} id='dollHouse' />
        </div>


        <div style={{ display: 'flex', justifyContent: 'stretch', marginTop: '50px', marginRight: '50px' }} className={classes.dragBox}>

          {/* <div></div>   */}
          <div className={classes.chooseItemContainer}>
            <Container groupName="1" getChildPayload={i => this.state.items1[i]} onDrop={e => this.handleDrop(e)} >
              {
                this.state.items1.map(p => {
                  return (
                    <Draggable key={p.id}>
                      <button className="attributes_to_choose" variant='contained'>
                        {p.data}
                      </button>
                    </Draggable>
                  );
                })
              }
            </Container>
          </div>
          <div style={groupStyle} className={classes.important_attributes} className={classes.homeDropContainer}>

            <Container groupName="1" getChildPayload={i => this.state.items2[i]} onDrop={e => this.setState({ items2: applyDrag(this.state.items2, e) })}>
              {
                this.state.items2.map(p => {
                  return (
                    <Draggable key={p.id}>
                      <Button className="important_attributes" variant='contained' >
                        {p.data}
                      </Button>
                    </Draggable>
                  );
                })
              }
            </Container>
          </div>
          <Link style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='secondary' className={classes.FinishBtn}>
              Finish
            </Button>
          </Link>

        </div>
      </Fragment>
    );
  }
}

Groups.propTypes = {

};

export default withStyles(styles, { withTheme: true })(Groups);