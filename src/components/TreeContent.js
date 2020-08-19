import React from "react";

const TreeContent = (props) => {
    const { neighborhood, childNodes } = props;

    const smbCount = childNodes.filter(node => node.type === "SMB").length;
    const npCount = childNodes.filter(node => node.type === "NP").length;

    console.log(smbCount, npCount)
    
    return (
        <h2 className="font-straight font-black text-2xl text-center py-3 text-gray-900 border-b-4 border-gray-900">
            {neighborhood}, CA
            <div className="-mr-2">
                {smbCount} <div className={`TreeNode__icon smb`}></div>
                {npCount} <div className={`TreeNode__icon np`}></div>
            </div>
        </h2>
    );
}

export default TreeContent;