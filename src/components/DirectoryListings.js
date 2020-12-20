import React from "react";
import Accordion from "./Accordion";

const DirectoryListings = (props) => {
    const { title, state, context, listings } = props;

    const listingsByIndustry = (context.industry && !!context.industry.length) ? listings.filter(listing => listing.node.frontmatter.industry.includes(context.industry)) : listings;
    const listingsByTag = (context.tag && !!context.tag.length) ? listingsByIndustry.filter(listing => listing.node.frontmatter.tag.includes(context.tag)) : listingsByIndustry;

    const smbListings = listingsByTag.filter(listing => listing.node.frontmatter.type === "SMB");
    const npListings = listingsByTag.filter(listing => listing.node.frontmatter.type === "Non-Profit");

    return (
        <>
            {/* Header */}
            <h2 
                className="font-straight font-black text-xl text-center py-3 text-gray-900 border-b-4 border-gray-900 overflow-hidden"
                id={`${title}`}
            >
                {title}, CA
                <div className="-mr-2 flex justify-center items-center">
                    {smbListings.length} <div className={`listing-icon smb w-8 h-8`}></div>
                    {npListings.length} <div className={`listing-icon np w-8 h-8`}></div>
                </div>
            </h2>

            {/* SMB accordion */}
            {smbListings.length ? 
                <Accordion 
                    state={state} 
                    listings={smbListings} 
                    type="SMB" 
                    className="smb"
                />
                : ""
            }
            
            {/* Non-profit accordion */}
            {npListings.length ? 
                <Accordion 
                    state={state} 
                    listings={npListings} 
                    type="Non-Profit" 
                    className="np" 
                />
                : ""
            }
        </>
    )
};

export default DirectoryListings;