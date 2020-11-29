import React from 'react';

import arrow from "../../static/img/arrow.svg";

const ArrowIcon = (props) => {
    return (<img src={arrow} className={props.className} alt={props.alt} {...props} />)
}

export default ArrowIcon;