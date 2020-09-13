import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { Link } from "@reach/router";

import Accordion from "./Accordion";

class DirectoryListings extends React.Component {
    renderAccordionContent(list) {
        return list.map(item => {
            const { id, fields: { slug }, frontmatter } = item.node;

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
        });
    }

    render() {
        const { title, region, data, state } = this.props;
        const { edges: listings } = data.allMarkdownRemark;
    
        const listingsByRegion = listings.filter(listing => listing.node.frontmatter.region.includes(region));
    
        const smbListings = listingsByRegion.filter(listing => listing.node.frontmatter.type === "SMB");
        const npListings = listingsByRegion.filter(listing => listing.node.frontmatter.type === "Non-Profit");

        return (
            <>
                {/* Header */}
                <h2 className="font-straight font-black text-xl text-center py-3 text-gray-900 border-b-4 border-gray-900">
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
                        listingsCount={smbListings.length} 
                        type="SMB" 
                        className="smb" 
                    >
                        {this.renderAccordionContent(smbListings)}
                    </Accordion> 
                    : ""
                }
                
                {/* Non-profit accordion */}
                {npListings.length ? 
                    <Accordion 
                        state={state} 
                        listingsCount={npListings.length} 
                        type="Non-Profit" 
                        className="np" 
                    >
                        {this.renderAccordionContent(npListings)}
                    </Accordion>
                    : ""
                }
            </>
        )
    }
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