import React from 'react';
import { connect } from 'react-redux';

var Card = (props) => {
    
    var cardState = props[props.id];

    if (!cardState) {
        return null;
    }
    else {
        const SpecificCard = props.elem;
        return <SpecificCard id={props.id} open={cardState.show} config={cardState.config}/>
    }
}

Card = connect(
    state => state.card
)(Card)

export { Card };



