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

    // const smbCount = type === "region" ? childNodes.filter(node => node.type === "SMB").length : null;
    // const npCount = type === "region" ? childNodes.filter(node => node.type === "NP").length : null;

    // const icons = (isActive) => {
    //     return (
    //         <div className="grid grid-cols-2">
    //             <div className="flex flex-row items-center justify-end col-start-1 col-end-2 w-12">
    //                 {smbCount > 0 && 
    //                     (<>
    //                         {smbCount} 
    //                         <div className={`listing-icon smb ${!isActive && "opacity-25"}`}></div>
    //                     </>)
    //                 }
    //             </div>
                
    //             <div className="flex flex-row items-center justify-end col-start-2 col-end-3 w-12">
    //                 {npCount > 0 &&
    //                     (<>
    //                         {npCount} 
    //                         <div className={`listing-icon np ${!isActive && "opacity-25"}`}></div>
    //                     </>)
    //                 }
    //             </div>
    //         </div>
    //     )
    // }

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
                        {/* {type === "region" && icons(isActive)} */}
                    </Link>
                )
            }}
        </Match>
    );
}

export default DirectoryTreeNode;