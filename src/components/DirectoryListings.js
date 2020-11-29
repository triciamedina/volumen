import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { startCase } from "lodash";

import IndustryContext from "../context/IndustryContext";
import Accordion from "./Accordion";

const DirectoryListings = (props) => {
    const { title, city, data, state, context } = props;
    const { edges: listings } = data.allMarkdownRemark;

    const listingsByCity = listings.filter(listing => listing.node.frontmatter.city.includes(startCase(city)));
    const listingsByIndustry = (context.industry && !!context.industry.length) ? listingsByCity.filter(listing => listing.node.frontmatter.industry.includes(context.industry)) : listingsByCity;

    const smbListings = listingsByIndustry.filter(listing => listing.node.frontmatter.type === "SMB");
    const npListings = listingsByIndustry.filter(listing => listing.node.frontmatter.type === "Non-Profit");

    return (
        <>
            {/* Header */}
            <h2 
                className="font-straight font-black text-xl text-center py-3 text-gray-900 border-b-4 border-gray-900 overflow-hidden"
                id={`${title}`}
            >
                {title}, CA
                <div className="-mr-2">
                    {smbListings.length} <div className={`listing-icon smb`}></div>
                    {npListings.length} <div className={`listing-icon np`}></div>
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
}

export default (props) => {
    return (<StaticQuery
        query={graphql`
            query DirectoryListingsQuery {
                allMarkdownRemark(
                    sort: {order: ASC, fields: frontmatter___title},
                    filter: {
                        frontmatter: {
                            templateKey: {eq: "listing-page"}
                        }
                    }
                ) {
                    edges {
                        node {
                            id
                            fields {
                                slug
                            }
                            frontmatter {
                                description
                                title
                                templateKey
                                city
                                type
                                industry
                            }
                        }
                    }
                }
            }
        `}
        render={(data, count) => (
            <IndustryContext.Consumer>
                { (context) => (
                    <DirectoryListings data={data} count={count} {...props} context={context} /> 
                )}
            </IndustryContext.Consumer>
        )}
    />)
};