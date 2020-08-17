import React from "react";
import { Link, Match } from "@reach/router";

const TreeNode = (props) => {
    const { url, name, parent, type, color } = props;

    const styles = {
        "root" : "font-straight font-black text-2xl py-3 px-6",
        "county" : "font-straight font-black text-lg py-2 px-5",
        "region" : "font-straight font-black text-lg py-1 px-4"
    };
    
    const opaque = { backgroundColor: `${color}`};
    const transparent = { backgroundColor: `${color}4D`};

    return (
        <Match path={`${url}/*`}>
            {props =>
                (
                    <Link 
                        to={url}
                        style={(props.match || props.location.pathname === parent) ? opaque : transparent} 
                        className={`${styles[type]} ${(props.match || props.location.pathname === parent) ? "active" : "inactive"}`} 
                    >
                        {name}
                    </Link>
                )
            }
        </Match>
    );
}

export default TreeNode;