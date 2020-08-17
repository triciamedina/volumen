import React from "react";
import { Link, Match } from "@reach/router";

const TreeNode = (props) => {
    const { url, name, parent, type, color, smbCount=null, npCount=null } = props;
    console.log(smbCount)

    const styles = {
        "county" : "font-straight font-black text-2xl py-3 px-6",
        "region" : "font-straight font-black text-lg py-2 px-5",
        "neighborhood" : "flex flex-row justify-between font-straight font-black text-lg py-1 px-4"
    };
    
    const opaque = { backgroundColor: `${color}`};
    const transparent = { backgroundColor: `${color}4D`};

    return (
        <Match path={`${url}/*`}>
            {props => {
                const isActive = (props.match || props.location.pathname === parent);

                return (
                    <Link 
                        to={url}
                        style={isActive ? opaque : transparent} 
                        className={`${styles[type]} ${isActive ? "active" : "inactive"}`} 
                    >
                        {name} 
                        <div>{smbCount}</div>
                    </Link>
                )
            }}
        </Match>
    );
}

export default TreeNode;