import React, { useState, useEffect } from "react";

const Accordion = (props) => {
    const { listings, title, className } = props;

    const [isOpen, toggleIsOpen] = useState(false);

    // Reload state on props change
    useEffect(() => {
        toggleIsOpen(false);
    }, [props]);

    return (
        <div className={`Accordion ${className} flex flex-col`}>
            <button 
                className={`flex flex-row items-center justify-between border-b-4 border-gray-900 pr-4`}
                onClick={() => toggleIsOpen(!isOpen)}
                disabled={!listings.length}
            >
                <div className="flex flex-row items-center">
                    <div className={`listing-icon ${className}`}></div> 
                    <h3 className="font-straight font-black text-xl text-gray-900 py-2">
                        {listings.length} {title}
                    </h3>
                </div>
                <div className={isOpen ? "arrow-down" : "arrow-right"} ></div>
            </button>
            <div className={`accordion-panel ${isOpen && "open"}`}>
                {listings.length ? 
                    listings.map(listing => (
                        <div className="py-3 px-5" key={listing.id}>
                            <p className="font-straight font-black text-xl text-gray-900 ">
                                {listing.name}
                            </p>
                            <p className="text-sm">
                                {listing.industry}<br />
                                {listing.address}<br />
                                {listing.phone}<br />
                                {listing.website}<br />
                            </p>
                        </div>
                    )) : ""
                }
            </div>
        </div>
    )
}

export default Accordion;