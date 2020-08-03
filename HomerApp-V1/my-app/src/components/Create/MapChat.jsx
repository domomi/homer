import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MapChat extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }

    render() {
        return (
            <div></div>
        );
    }
}

MapChat.propTypes = {
    
};

function mapStateToProps(state, ownProps) {
    return {
        
    };
}

export default connect(mapStateToProps)(MapChat);
