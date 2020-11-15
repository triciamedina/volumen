import React from "react";
import { Link, Match } from "@reach/router";
import arrow from "../../static/img/arrow.svg";

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
                    <Link 
                        to={url}
                        style={isActive ? opaque : transparent} 
                        className={`DirectoryCta ${styles[type]} ${isActive ? "active" : "inactive"}`} 
                    >
                        <h3 className="inline-block">{name}</h3>
                        <img src={arrow} />
                    </Link>
                )
            }}
        </Match>
    );
}

export default DirectoryTreeNode;