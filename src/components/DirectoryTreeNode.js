import React from "react";
import { Link, Match } from "@reach/router";
import ArrowIcon from "./ArrowIcon";

const DirectoryTreeNode = (props) => {
    const { url, name, parent, type, color } = props;

    const styles = {
        "region" : "font-straight font-black text-xl py-4 px-4 pr-6",
        "county" : "font-straight font-black text-xl py-3 px-6 pr-8",
        "city" : "font-straight font-black text-base py-2 px-5 pr-6"
    };
    
    const opaque = { backgroundColor: `${color}`};
    const transparent = { backgroundColor: `${color}4D`};

    return (
        <Match path={`${url}/*`}>
            {props => {
                const isActive = (props.match || props.location.pathname === parent);

                return (
                    <li
                        style={isActive ? opaque : transparent} 
                        className={`DirectoryCta ${isActive ? "active" : "inactive"}`} 
                    >
                        <Link to={url} className={`flex ${styles[type]}`}>
                            <h3 className="inline-block">{name}</h3>
                            <ArrowIcon alt="Select" />
                        </Link>
                    </li>
                )
            }}
        </Match>
    );
}

export default DirectoryTreeNode;