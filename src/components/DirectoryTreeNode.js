import React from "react";
import { Link, Match } from "@reach/router";

const DirectoryTreeNode = (props) => {
    const { url, name, parent, type, color } = props;

    const styles = {
        "area" : "font-straight font-black text-xl py-3 px-6",
        "county" : "font-straight font-black text-lg py-2 px-5",
        "region" : "flex flex-row justify-between font-straight font-black text-sm py-1 px-4"
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
                        <h3>{name}</h3>
                    </Link>
                )
            }}
        </Match>
    );
}

export default DirectoryTreeNode;