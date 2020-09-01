import React from "react";
import { Link } from "@reach/router";

import DirectoryTreeNode from "./DirectoryTreeNode";
import DirectoryTreeAccordion from "./DirectoryTreeAccordion";

class DirectoryTree extends React.Component {
    
    // Return tree data matching path params
    getRootNode(type) {
        if (type === "root") return data["/"];
        if (type === "area") return data[`/browse/${this.props.area}`];
        if (type === "county") return data[`/browse/${this.props.area}/${this.props.county}`];
        if (type === "region") return data[`/browse/${this.props.area}/${this.props.county}/${this.props.region}`];
    };

    getChildNodes(node) {
        if (!node.children) return [];
        return node.children.map(path => data[path]).sort(sortAsc);
    };

    getParentPath(type) {
        if (type === "root") return `/directory`;
        if (type === "area") return `/directory`;
        if (type === "county") return `/directory/browse/${this.props.area}`;
        if (type === "region") return `/directory/browse/${this.props.area}/${this.props.county}`;
    };

    render() {
        const { type, location } = this.props;

        const rootNode = this.getRootNode(type);
        const childNodes = this.getChildNodes(rootNode);

        const smbListings = childNodes.filter(node => node.type === "SMB");
        const npListings = childNodes.filter(node => node.type === "NP");
  
        if (type === "region") {
            return (
                <div className="flex flex-col">
                    <Link 
                        to={this.getParentPath(type)}
                        className="md:hidden inline-block my-4 text-gray-800 font-straight font-medium"
                    >
                        Back
                    </Link>
                    <h2 className="font-straight font-black text-xl text-center py-3 text-gray-900 border-b-4 border-gray-900">
                        {rootNode.name}, CA
                        <div className="-mr-2">
                            {smbListings.length} <div className={`listing-icon smb`}></div>
                            {npListings.length} <div className={`listing-icon np`}></div>
                        </div>
                    </h2>
        
                    {smbListings.length ? <DirectoryTreeAccordion state={location.state} listings={smbListings} title="SMB" className="smb" /> : ""}
                    {npListings.length ? <DirectoryTreeAccordion state={location.state} listings={npListings} title="Non-Profit" className="np" />: ""}
                </div>
                )
        }

        return (
            <div className="DirectoryTree flex flex-col">
                <Link 
                    to={this.getParentPath(type)}
                    className="md:hidden inline-block my-4 text-gray-800 font-straight font-medium"
                >
                    Back
                </Link>
                {childNodes.length 
                    ? childNodes.map(node => {
                        return (
                            <DirectoryTreeNode
                                key={node.id}
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
}

export default DirectoryTree;

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

// Assumes tree data is an object, with each node referenced by path
const data = {
    "/": {
        id: 0,
        path: "/",
        type: "root",
        children: [ "/browse/san-francisco-bay-area", "/browse/los-angeles-metro-area", "/browse/san-diego-tijuana", "/browse/greater-sacramento", "/browse/metropolitan-fresno"]
    },
    "/browse/san-francisco-bay-area": {
        id: 1,
        name: "San Francisco Bay Area",
        path: "/browse/san-francisco-bay-area",
        type: "area",
        color: "#76e66d"
    },
    "/browse/san-diego-tijuana": {
        id: 15,
        name: "San Diego-Tijuana",
        path: "/browse/san-diego-tijuana",
        type: "area",
        color: "#e6aa6d"
    },
    "/browse/greater-sacramento": {
        id: 16,
        name: "Greater Sacramento",
        path: "/browse/greater-sacramento",
        type: "area",
        color: "#a09deb"
    },
    "/browse/metropolitan-fresno": {
        id: 17,
        name: "Metropolitan Fresno",
        path: "/browse/metropolitan-fresno",
        type: "area",
        color: "#6db7e6"
    },
    "/browse/los-angeles-metro-area": {
        id: 2,
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
        id: 3,
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
        id: 4,
        name: "Orange",
        path: "/browse/los-angeles-metro-area/orange",
        type: "county",
        color: "#f09657"
    },
    "/browse/los-angeles-metro-area/san-bernadino": {
        id: 5,
        name: "San Bernadino",
        path: "/browse/los-angeles-metro-area/san-bernadino",
        type: "county",
        color: "#a67db5"
    },
    "/browse/los-angeles-metro-area/ventura": {
        id: 6,
        name: "Ventura",
        path: "/browse/los-angeles-metro-area/ventura",
        type: "county",
        color: "#e25d61"
    },
    "/browse/los-angeles-metro-area/riverside": {
        id: 7,
        name: "Riverside",
        path: "/browse/los-angeles-metro-area/riverside",
        type: "county",
        color: "#74a8db"
    },
    "/browse/los-angeles-metro-area/kern": {
        id: 8,
        name: "Kern",
        path: "/browse/los-angeles-metro-area/kern",
        type: "county",
        color: "#8fc162"
    },
    "/browse/los-angeles-metro-area/los-angeles/central-los-angeles": {
        id: 9,
        name: "Central Los Angeles",
        path: "/browse/los-angeles-metro-area/los-angeles/central-los-angeles",
        type: "region",
        color: "#d1ecf1"
    },
    "/browse/los-angeles-metro-area/los-angeles/santa-monica-mountains": {
        id: 10,
        name: "Santa Monica Mountains",
        path: "/browse/los-angeles-metro-area/los-angeles/santa-monica-mountains",
        type: "region",
        color: "#e87859"
    },
    "/browse/los-angeles-metro-area/los-angeles/san-fernando-valley": {
        id: 11,
        name: "San Fernando Valley",
        path: "/browse/los-angeles-metro-area/los-angeles/san-fernando-valley",
        type: "region",
        color: "#e2555a"
    },
    "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley": {
        id: 12,
        name: "San Gabriel Valley",
        path: "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley",
        type: "region",
        color: "#a67db5",
        children: [
            "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley/mitchs-mobiles",
            "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley/grade-a-tools"
        ]
    },
    "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley/mitchs-mobiles": {
        id: 13,
        name: "Mitch's Mobiles",
        path: "/mitchs-mobiles",
        type: "SMB",
        industry: "Industry/Field"
    },
    "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley/grade-a-tools": {
        id: 14,
        name: "GradeA Tools",
        path: "/grade-a-tools",
        type: "SMB",
        industry: "Industry/Field"
    },
};