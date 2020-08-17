import React from "react";
import { Link, Match } from "@reach/router";

const TreeNode = (props) => {
    const { url, name, parent, type, color } = props;

    const styles = {
        "root" : "text-2xl py-3 px-6",
        "county" : "text-lg py-2 px-5",
        "region" : "text-lg py-1 px-4"
    };

    const active = { backgroundColor: `${color}`, marginBottom: "-4px"};
    const inactive = { backgroundColor: `${color}`, opacity: .5, marginBottom: "-4px"};

    return (
        <Match path={`${url}/*`}>
            {props =>
                (
                    <Link 
                        style={(props.match || props.location.pathname === parent) ? active : inactive} 
                        className={`font-straight font-black border-gray-900 border-t-4 border-b-4 ${styles[type]}`} 
                        to={url}>
                            {name}
                    </Link>
                )
            }
        </Match>
    );
}

export default TreeNode;