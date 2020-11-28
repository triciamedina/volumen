import React from 'react';

import arrow from "../../static/img/arrow.svg";

const ArrowIcon = (props) => {
    return (<img src={arrow} className={props.className} {...props} />)
}

export default ArrowIcon;