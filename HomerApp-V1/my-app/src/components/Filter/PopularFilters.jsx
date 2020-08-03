import React, { Component } from 'react'

import $, { contains } from 'jquery'

const styles = {
    itemTitle: {
        float: 'left',
        marginLeft: '50px'
    },

    img: {
        maxHeight: "20px",
        // float: 'right',
        
    },
    checkboxs: {
        // maxHeight: "20px",
        // float : 'right',
        // marginRight : '50px',
    },
    PopularFilters: {
        margin: '2vh 1vw 2vh 1vw'
    },
    iconCheckContainer : {
        float : 'right',
        marginRight: '50px',
    }


}

export default class PopularFilters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,

        }
        this.selectCondition = this.selectCondition.bind(this)
        console.log(this.props.ref)
    }

    async reset() {
        await this.setState({ checked: false })
        console.log(this.state)
    }



    async selectCondition() {
        await this.setState({ checked: !this.state.checked })
        console.log(`state set to ${this.state.checked}`)
        return this.state.checked
    }

    async updateFilter() {
        console.log("updated: in line 28")

        console.log(this.state.checked)


        let data = JSON.stringify({ [this.props.condition]: this.state.checked })

        $.ajax({
            type: "post",
            url: "http://localhost:3000/updateFilter",
            data: data,
            contentType: "application/json",
            success: function (response) {

            }
        });
    }

    render() {
        return (
            <div style={styles.PopularFilters} className='filter_conditions'>
                <span style={styles.itemTitle}>{this.props.text}</span>
                <div style={styles.iconCheckContainer}>
                    <img src={this.props.pic} style={styles.img} />
                    <input type='checkbox' style={styles.checkboxs} onClick={() => { this.selectCondition().then(checked => { console.log(checked); this.updateFilter(checked) }) }} checked={this.state.checked} />
                </div>
            </div>
        )
    }
}




