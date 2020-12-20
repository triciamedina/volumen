import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

const Accordion = (props) => {
    const { listings, type, className, state } = props;

    const [isOpen, toggleIsOpen] = useState((state.isOpen && state.isOpen === type) ? true : false);

    // Reload state on props change
    useEffect(() => {
        toggleIsOpen((state.isOpen && state.isOpen === type) ? true : false);
    }, [props, state.isOpen, type]);

    return (
        <li className={`Accordion ${className} flex flex-col`}>
            <button 
                className={`flex flex-row items-center justify-between border-b-4 border-gray-900 pr-4`}
                onClick={() => toggleIsOpen(!isOpen)}
            >
                <div className="flex flex-row items-center">
                    <div className={`listing-icon ${className} w-16 h-16 xl`}></div> 
                    <h3 
                        className="font-straight font-black text-2xl text-gray-900 py-4"
                        id={`${type}`}
                    >
                        {listings.length} {type}
                    </h3>
                </div>
                <div className={isOpen ? "arrow-down" : "arrow-right"} ></div>
            </button>
            <ul 
                className={`accordion-panel ${isOpen && "open"}`}
                aria-labelledby={`${type}`}
            >
                {listings.map(item => {
                    const { id, fields: { slug }, frontmatter } = item.node;

                    return (
                        <li className="py-3 px-5" key={id}>
                            <Link to={slug} className="font-straight font-black text-xl text-gray-900">
                                {frontmatter.title}
                            </Link>
                            <p className="text-sm">
                                {frontmatter.industry}
                            </p>
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

export default Accordion;