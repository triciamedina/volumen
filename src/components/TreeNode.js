import React from "react";
import { Link, Match } from "@reach/router";

const TreeNode = (props) => {
    const { url, name, parent, type, color } = props;

    const styles = {
        "root" : "font-straight font-black text-2xl py-3 px-6",
        "county" : "font-straight font-black text-lg py-2 px-5",
        "region" : "font-straight font-black text-lg py-1 px-4",
        "active" : "border-black"
    };

    return (
        <Match path={`${url}/*`}>
            {props =>
                (props.match || props.location.pathname === parent) ? (
                    <Link style={{ backgroundColor: `${color}` }} className={`${styles[type]} ${styles["active"]}`} to={url}>{name}</Link>
                ) : (
                    <Link style={{ backgroundColor: `${color}`, opacity: .5 }} className={`${styles[type]}`} to={url}>{name}</Link>
            )}
        </Match>
    );
}

export default TreeNode;