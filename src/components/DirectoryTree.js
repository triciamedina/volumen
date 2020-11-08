import React from "react";
import { Link } from "@reach/router";

import DirectoryTreeNode from "./DirectoryTreeNode";
import DirectoryListings from "./DirectoryListings";
import arrow from "../../static/img/arrow.svg";

export default class DirectoryTree extends React.Component {
    getRootNode(type) {
        if (type === "root") return treeData["/"];
        if (type === "area") return treeData[`/browse/${this.props.area}`];
        if (type === "county") return treeData[`/browse/${this.props.area}/${this.props.county}`];
        if (type === "city") return treeData[`/browse/${this.props.area}/${this.props.county}/${this.props.city}`];
    };

    getChildNodes(node) {
        if (!node.children) return [];
        return node.children.map(path => treeData[path]).sort(sortAsc);
    };

    getParentPath(type) {
        if (type === "root") return `/directory`;
        if (type === "area") return `/directory`;
        if (type === "county") return `/directory/browse/${this.props.area}`;
        if (type === "city") return `/directory/browse/${this.props.area}/${this.props.county}`;
    };

    render() {
        const { type, location } = this.props;

        const rootNode = this.getRootNode(type);
        const childNodes = this.getChildNodes(rootNode);
  
        if (type === "city") {
            return (
                <div className="flex flex-col">
                    <Link 
                        to={this.getParentPath(type)}
                        className="md:hidden inline-block p-5 text-gray-800 font-straight font-medium transform rotate-180 absolute left-0 top-0"
                    >
                        <img src={arrow} className="w-2" />
                    </Link>
                    <DirectoryListings 
                        state={location.state} 
                        city={this.props.city} 
                        title={rootNode.name} 
                    />
                </div>
            )
        }

        return (
            <div className="DirectoryTree flex flex-col">
                {(type !== "root") && (
                    <Link 
                        to={this.getParentPath(type)}
                        className="md:hidden inline-block p-5 text-gray-800 font-straight font-medium transform rotate-180 absolute left-0 top-0"
                    >
                        <img src={arrow} className="w-2" />
                    </Link>
                )}
                {childNodes.length 
                    ? childNodes.map((node, index) => {
                        return (
                            <DirectoryTreeNode
                                key={index}
                                url={`/directory${node.path}`}
                                type={type}
                                parent={type === "root" ? "/directory" : `/directory${rootNode.path}`}
                                {...node}
                            />
                        )
                    }) : ""
                }
            </div>
        );
    }
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

// treeData is an object, with each node referenced by path
const treeData = {
    "/": {
        path: "/",
        type: "root",
        children: [ "/browse/san-francisco-bay-area", "/browse/los-angeles-metro-area", "/browse/san-diego-tijuana", "/browse/greater-sacramento", "/browse/metropolitan-fresno"]
    },
    "/browse/san-francisco-bay-area": {
        name: "San Francisco Bay Area",
        path: "/browse/san-francisco-bay-area",
        type: "area",
        color: "#76e66d"
    },
    "/browse/san-diego-tijuana": {
        name: "San Diego-Tijuana",
        path: "/browse/san-diego-tijuana",
        type: "area",
        color: "#e6aa6d"
    },
    "/browse/greater-sacramento": {
        name: "Greater Sacramento",
        path: "/browse/greater-sacramento",
        type: "area",
        color: "#a09deb"
    },
    "/browse/metropolitan-fresno": {
        name: "Metropolitan Fresno",
        path: "/browse/metropolitan-fresno",
        type: "area",
        color: "#6db7e6"
    },
    "/browse/los-angeles-metro-area": {
        name: "Los Angeles Metro Area",
        path: "/browse/los-angeles-metro-area",
        type: "area",
        color: "#e6e66d",
        children: [
            "/browse/los-angeles-metro-area/los-angeles",
            "/browse/los-angeles-metro-area/orange",
            "/browse/los-angeles-metro-area/san-bernadino",
            "/browse/los-angeles-metro-area/ventura",
            "/browse/los-angeles-metro-area/riverside",
            "/browse/los-angeles-metro-area/kern"
        ]
    },
    "/browse/los-angeles-metro-area/los-angeles": {
        name: "Los Angeles",
        path: "/browse/los-angeles-metro-area/los-angeles",
        type: "county",
        color: "#ede280",
        children: [
            "/browse/los-angeles-metro-area/los-angeles/central-los-angeles",
            "/browse/los-angeles-metro-area/los-angeles/santa-monica-mountains",
            "/browse/los-angeles-metro-area/los-angeles/san-fernando-valley",
            "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley"
        ]
    },
    "/browse/los-angeles-metro-area/orange": {
        name: "Orange",
        path: "/browse/los-angeles-metro-area/orange",
        type: "county",
        color: "#f09657"
    },
    "/browse/los-angeles-metro-area/san-bernadino": {
        name: "San Bernadino",
        path: "/browse/los-angeles-metro-area/san-bernadino",
        type: "county",
        color: "#a67db5"
    },
    "/browse/los-angeles-metro-area/ventura": {
        name: "Ventura",
        path: "/browse/los-angeles-metro-area/ventura",
        type: "county",
        color: "#e25d61"
    },
    "/browse/los-angeles-metro-area/riverside": {
        name: "Riverside",
        path: "/browse/los-angeles-metro-area/riverside",
        type: "county",
        color: "#74a8db"
    },
    "/browse/los-angeles-metro-area/kern": {
        name: "Kern",
        path: "/browse/los-angeles-metro-area/kern",
        type: "county",
        color: "#8fc162"
    },
    "/browse/los-angeles-metro-area/los-angeles/central-los-angeles": {
        name: "Central Los Angeles",
        path: "/browse/los-angeles-metro-area/los-angeles/central-los-angeles",
        type: "city",
        color: "#d1ecf1"
    },
    "/browse/los-angeles-metro-area/los-angeles/santa-monica-mountains": {
        name: "Santa Monica Mountains",
        path: "/browse/los-angeles-metro-area/los-angeles/santa-monica-mountains",
        type: "city",
        color: "#e87859"
    },
    "/browse/los-angeles-metro-area/los-angeles/san-fernando-valley": {
        name: "San Fernando Valley",
        path: "/browse/los-angeles-metro-area/los-angeles/san-fernando-valley",
        type: "city",
        color: "#e2555a"
    },
    "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley": {
        name: "San Gabriel Valley",
        path: "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley",
        type: "city",
        color: "#a67db5"
    }
};