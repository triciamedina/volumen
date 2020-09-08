import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

const DirectoryAccordion = (props) => {
    const { listings, title, className, state } = props;

    const [isOpen, toggleIsOpen] = useState((state.isOpen && state.isOpen === title) ? true : false);

    // Reload state on props change
    useEffect(() => {
        toggleIsOpen((state.isOpen && state.isOpen === title) ? true : false);
    }, [props, state.isOpen, title]);

    return (
        <div className={`DirectoryTreeAccordion ${className} flex flex-col`}>
            <button 
                className={`flex flex-row items-center justify-between border-b-4 border-gray-900 pr-4`}
                onClick={() => toggleIsOpen(!isOpen)}
            >
                <div className="flex flex-row items-center">
                    <div className={`listing-icon ${className}`}></div> 
                    <h3 className="font-straight font-black text-2xl text-gray-900 py-4">
                        {listings.length} {title}
                    </h3>
                </div>
                <div className={isOpen ? "arrow-down" : "arrow-right"} ></div>
            </button>
            <div className={`accordion-panel ${isOpen && "open"}`}>
                {listings.length ? 
                    listings.map(listing => {
                        const { id, fields: { slug }, frontmatter } = listing.node;

                        return (
                            <div className="py-3 px-5" key={id}>
                                <Link to={slug} className="font-straight font-black text-xl text-gray-900">
                                    {frontmatter.title}
                                </Link>
                                <p className="text-sm">
                                    {frontmatter.industry}
                                </p>
                            </div>
                        )
                    }) : ""
                }
            </div>
        </div>
    )
}

export default DirectoryAccordion;