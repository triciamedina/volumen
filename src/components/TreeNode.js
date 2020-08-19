import React from "react";
import { Link, Match } from "@reach/router";

const TreeNode = (props) => {
    const { url, name, parent, type, color, childNodes} = props;

    const styles = {
        "county" : "font-straight font-black text-2xl py-3 px-6",
        "region" : "font-straight font-black text-lg py-2 px-5",
        "neighborhood" : "flex flex-row justify-between font-straight font-black text-sm py-1 px-4"
    };
    
    const opaque = { backgroundColor: `${color}`};
    const transparent = { backgroundColor: `${color}4D`};

    const smbCount = type === "neighborhood" ? childNodes.filter(node => node.type === "SMB").length : null;
    const npCount = type === "neighborhood" ? childNodes.filter(node => node.type === "NP").length : null;

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
                        {type === "neighborhood" && 
                            <div className="flex flex-row items-center">
                                {smbCount} <div className={`TreeNode__icon smb ${!isActive && "opacity-25"}`}></div>
                                {npCount} <div className={`TreeNode__icon np ${!isActive && "opacity-25"}`}></div>
                            </div>
                        }
                    </Link>
                )
            }}
        </Match>
    );
}

export default TreeNode;