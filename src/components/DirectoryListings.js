import React from "react";
import { graphql, StaticQuery } from "gatsby";

import DirectoryAccordion from "./DirectoryAccordion";

const DirectoryListings = (props) => {
    const { title, region, data, state } = props;
    const { edges: listings } = data.allMarkdownRemark;

    const listingsByRegion = listings.filter(listing => listing.node.frontmatter.region.includes(region));

    const smbListings = listingsByRegion.filter(listing => listing.node.frontmatter.type === "SMB");
    const npListings = listingsByRegion.filter(listing => listing.node.frontmatter.type === "NP");

    return (
        <>
            <h2 className="font-straight font-black text-xl text-center py-3 text-gray-900 border-b-4 border-gray-900">
                {title}, CA
                <div className="-mr-2">
                    {smbListings.length} <div className={`listing-icon smb`}></div>
                    {npListings.length} <div className={`listing-icon np`}></div>
                </div>
            </h2>

            {smbListings.length ? <DirectoryAccordion state={state} listings={smbListings} title="SMB" className="smb" /> : ""}
            {npListings.length ? <DirectoryAccordion state={state} listings={npListings} title="Non-Profit" className="np" />: ""}
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
                                region
                                type
                                industry
                            }
                        }
                    }
                }
            }
        `}
        render={(data, count) => <DirectoryListings data={data} count={count} {...props} />}
    />)
};