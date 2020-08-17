import React from "react";

const TreeContent = (props) => {
    const { neighborhood, childNodes } = props;
    
    return (
        <h2 className="font-straight font-black text-2xl text-center py-3 text-gray-900">
            {neighborhood}, CA
        </h2>
    );
}

export default TreeContent;