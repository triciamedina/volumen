import React, { useState, useEffect } from "react";

const Accordion = (props) => {
    const { listingsCount, title, className, state, children } = props;

    const [isOpen, toggleIsOpen] = useState((state.isOpen && state.isOpen === title) ? true : false);

    // Reload state on props change
    useEffect(() => {
        toggleIsOpen((state.isOpen && state.isOpen === title) ? true : false);
    }, [props, state.isOpen, title]);

    return (
        <div className={`Accordion ${className} flex flex-col`}>
            <button 
                className={`flex flex-row items-center justify-between border-b-4 border-gray-900 pr-4`}
                onClick={() => toggleIsOpen(!isOpen)}
            >
                <div className="flex flex-row items-center">
                    <div className={`listing-icon ${className}`}></div> 
                    <h3 className="font-straight font-black text-2xl text-gray-900 py-4">
                        {listingsCount} {title}
                    </h3>
                </div>
                <div className={isOpen ? "arrow-down" : "arrow-right"} ></div>
            </button>
            <div className={`accordion-panel ${isOpen && "open"}`}>
                {children}
            </div>
        </div>
    )
}

export default Accordion;