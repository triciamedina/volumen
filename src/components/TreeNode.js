import React from "react";
import { Link, Match } from "@reach/router";

const TreeNode = (props) => {
    const { url, name, parent, type, color } = props;

    const styles = {
        "root" : "font-straight font-black text-2xl py-3 px-6 border-black",
        "county" : "font-straight font-black text-lg py-2 px-5 border-black",
        "region" : "font-straight font-black text-lg py-1 px-4 border-black"
    };

    const active = { backgroundColor: `${color}`, borderTop: "4px solid black", borderBottom: "4px solid black", marginBottom: "-4px"};
    const inactive = { backgroundColor: `${color}`, borderTop: "4px solid black", opacity: .5 };

    return (
        <Match path={`${url}/*`}>
            {props =>
                (
                    <Link 
                        style={(props.match || props.location.pathname === parent) ? active : inactive} 
                        className={`${styles[type]}`} 
                        to={url}>
                            {name}
                    </Link>
                )
            }
        </Match>
    );
}

export default TreeNode;