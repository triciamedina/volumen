import React from "react";
import { Link } from "@reach/router";
import { graphql, StaticQuery } from "gatsby";
import { startCase } from "lodash";

import DirectoryContext from "../context/DirectoryContext";

import DirectoryTreeNode from "./DirectoryTreeNode";
import DirectoryListings from "./DirectoryListings";
import ArrowIcon from "./ArrowIcon";
import DATA from '../../static/data/DATA';

class DirectoryTree extends React.Component {
    getRootNode(type) {
        if (type === "root") return DATA["/"];
        if (type === "region") return DATA[`/browse/${this.props.region}`];
        if (type === "county") return DATA[`/browse/${this.props.region}/${this.props.county}`];
        if (type === "city") return DATA[`/browse/${this.props.region}/${this.props.county}/${this.props.city}`];
    };

    getChildNodes(node) {
        if (!node.children) return [];
        return node.children.map(path => DATA[path]).sort(sortAsc);
    };

    getParentPath(type) {
        if (type === "root") return `/directory`;
        if (type === "region") return `/directory`;
        if (type === "county") return `/directory/browse/${this.props.region}`;
        if (type === "city") return `/directory/browse/${this.props.region}/${this.props.county}`;
    };

    render() {
        const { type, location, data, context } = this.props;
        const { edges: listings } = data.allMarkdownRemark;

        const rootNode = this.getRootNode(type);
        const childNodes = this.getChildNodes(rootNode);

        let city;
        let listingsByCity;

        if (type === "city") {
            city = this.props.city; 
            listingsByCity = listings.filter(listing => listing.node.frontmatter.city.includes(startCase(city)));
        }
  
        return (
            <>
                {(type !== "root") && (
                    <Link 
                        to={this.getParentPath(type)}
                        className="md:hidden inline-block p-5 text-gray-800 font-straight font-medium transform rotate-180 absolute left-0 top-0"
                    >
                        <ArrowIcon className="w-2" alt="Back"/>
                    </Link>
                )}
                <ul className="DirectoryTree flex flex-col" aria-labelledby={`${rootNode.name}`}>
                    {type === "city"
                        ? (
                            <DirectoryListings 
                                state={location.state} 
                                city={this.props.city} 
                                title={rootNode.name}
                                listings={listingsByCity}
                                context={context}
                            />
                        ) : childNodes.length 
                            ? childNodes.map((node, index) => {

                                city = node.name;
                                listingsByCity = listings.filter(listing => listing.node.frontmatter.city.includes(startCase(city)));

                                return (
                                    <DirectoryTreeNode
                                        key={index}
                                        url={`/directory${node.path}`}
                                        type={type}
                                        parent={type === "root" ? "/directory" : `/directory${rootNode.path}`}
                                        listings={listingsByCity}
                                        context={context}
                                        {...node}
                                    />
                                )
                            }) : ""
                    }
                </ul>
            </>
        );
    }
};

export default (props) => {
    return (<StaticQuery
        query={graphql`
            query DirectoryTreeQuery {
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
                                tag
                            }
                        }
                    }
                }
            }
        `}
        render={(data, count) => (
            <DirectoryContext.Consumer>
                { (context) => (
                    <DirectoryTree data={data} count={count} {...props} context={context} /> 
                )}
            </DirectoryContext.Consumer>
        )}
    />)
};

// Included a sort method for now, but maybe won't need
const sortAsc = (a, b) => {
    const nameA = a.name.toLowerCase(); 
    const nameB = b.name.toLowerCase(); 
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};