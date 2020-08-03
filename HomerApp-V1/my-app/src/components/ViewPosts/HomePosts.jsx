import React, { Component } from 'react'

import Dropdown from 'react-bootstrap/Dropdown'
import ModalDialog from 'react-bootstrap/ModalDialog'


const styles = {
    ModalDialog: {
        height: '20vh'
        , width: '80vw'
        , marginLeft: '5vw'
    }
}

// HomePosts under the VideoDisplay component 
export class HomePosts extends Component {
    constructor() {
        super()
        this.state = {
            postedDate: "SomeDay"
        }
    }




    // When the component is loaded, execute this function
    componentDidMount() {
        // Need to figure out how to put code inside the function 
        // without having problems with "this"
        function calculateDays() {

        }

        // To calculate the time difference of two dates 
        var Difference_In_Time = new Date().getTime() - Date.parse(this.props.date);

        // To calculate the no. of days between two dates 
        var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));
        console.log(Difference_In_Days)

        if (Difference_In_Days == 0) {
            console.log("Today")
            this.setState({ postedDate: "Today" })
        }
        else {
            this.setState({ postedDate: `${Difference_In_Days} Days` })
        }

    }



    render() {

        return (
            // div container of the Component
            <div className="HomePosts">
                {/* descriptions */}
                <p className="descriptions">
                    {this.props.descriptions}
                </p>

                {/* <img src=''> </img> */}
                <div className="postedDate">
                    <p className="tags">Applied</p>
                    <span className='framework'>Framework?</span>

                    <img className="calendarIcon" src='calendar_small.png' />

                    <span className="dateFromNow" >{this.state.postedDate}</span>
                    <p></p>

                    {/* Used BootStrap and popper.js */}
                    <div className="overflow-auto" style={styles.ModalDialog}>.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur recusandae,
                    repudiandae earum officia dolor ipsam ab atque nihil unde sint sit, vitae
                    ipsum cum suscipit esse labore dolores ratione quas!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur recusandae,
                    repudiandae earum officia dolor ipsam ab atque nihil unde sint sit, vitae
                    ipsum cum suscipit esse labore dolores ratione quas!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur recusandae,
                    repudiandae earum officia dolor ipsam ab atque nihil unde sint sit, vitae
                    ipsum cum suscipit esse labore dolores ratione quas!
                      </div>
                    <Dropdown.Divider />
                </div>



                <div className="HomePosts">
                    <button type="button" onClick={handleOpen}>react-transition-group</button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <p className="descriptions">
                                {this.props.descriptions}
                            </p>

                            <p className="tags">Applied</p>
                            <span className='framework'>Framework?</span>

                            <img className="calendarIcon" src='calendar_small.png' />

                            <span className="dateFromNow" >{this.state.postedDate}</span>
                            <p></p>



                            <div className={classes.paper}>

                                <p className="descriptions">
                                    {this.props.descriptions}
                                </p>

                            </div>
                        </Fade>
                    </Modal>
                </div>







            </div>
        )
    }
}

export default HomePosts
