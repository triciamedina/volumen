import React, { useState, useEffect } from "react";

const TreeContent = (props) => {
    const { neighborhood, childNodes } = props;
    
    const [shouldShowSmb, toggleShouldShowSmb] = useState(false);
    const [shouldShowNp, toggleShouldShowNp] = useState(false);

    // Reload state on props change
    useEffect(() => {
        toggleShouldShowSmb(false);
        toggleShouldShowNp(false);
    }, [props]);

    const smbList = childNodes.filter(node => node.type === "SMB");
    const npList = childNodes.filter(node => node.type === "NP");
    
    return (
        <div className="flex flex-col">

            <h2 className="font-straight font-black text-2xl text-center py-3 text-gray-900 border-b-4 border-gray-900">
                {neighborhood}, CA
                <div className="-mr-2">
                    {smbList.length} <div className={`listing-icon smb`}></div>
                    {npList.length} <div className={`listing-icon np`}></div>
                </div>
            </h2>

            {/* TODO: Create accordion component */}
            <button 
                className="flex flex-row items-center justify-between border-b-4 border-gray-900 pr-4 bg-yellow-300"
                onClick={() => toggleShouldShowSmb(!shouldShowSmb)}
                disabled={!smbList.length}
            >
                <div className="flex flex-row items-center">
                    <div className={`listing-icon smb`}></div>
                    <h3 className="font-straight font-black text-xl text-gray-900 py-2">
                        {smbList.length} SMB
                    </h3>
                </div>
                <div className={shouldShowSmb ? "arrow-down" : "arrow-right"} ></div>
            </button>
            <div className={`bg-yellow-300 accordion-panel ${shouldShowSmb && "open"}`}>
                {smbList.length ? 
                    smbList.map(smb => (
                        <div className="py-3 px-5">
                            <p key={smb.id} className="font-straight font-black text-xl text-gray-900 ">
                                {smb.name}
                            </p>
                            <p className="text-sm">
                                {smb.industry}<br />
                                {smb.address}<br />
                                {smb.phone}<br />
                                {smb.website}<br />
                            </p>
                        </div>
                    )) : ""
                }
            </div>

            <button 
                className="flex flex-row items-center justify-between border-b-4 border-gray-900 pr-4 bg-red-300"
                onClick={() => toggleShouldShowNp(!shouldShowNp)}
                disabled={!npList.length}
            >
                <div className="flex flex-row items-center">
                    <div className={`listing-icon np`}></div>
                    <h3 className="font-straight font-black text-xl text-gray-900 py-2">
                        {npList.length} Non-Profit
                    </h3>
                </div>
                <div className={shouldShowNp ? "arrow-down" : "arrow-right"}></div>
            </button>
            <div className={`bg-red-300 accordion-panel ${shouldShowNp && "open"}`}>
                {npList.length ? npList.map(np => (
                    <p key={np.id} className="font-straight font-black text-xl text-gray-900 py-2 px-4">
                        {np.name}
                    </p>
                )) : ""}
            </div>

        </div>
    );
}

export default TreeContent;