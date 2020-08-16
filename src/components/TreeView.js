import React from "react";
import { Link } from "@reach/router";

class TreeView extends React.Component {
    // Return tree data matching path params
    getRootNode(type) {
        if (type === "root") return data["/"];
        if (type === "county") return data[`/${this.props.county}`];
        if (type === "region") return data[`/${this.props.county}/${this.props.region}`];
        if (type === "neighborhood") return data[`/${this.props.county}/${this.props.region}/${this.props.neighborhood}`];
    };

    getChildNodes(type, node) {
        if (!node.children) return [];
        // For SMB/NP listings I have the data nested for now, so just return children
        if (type === "neighborhood") return node.children;
        // For everything else, return tree data matching children from parent node
        return node.children.map(path => data[path]).sort(sortAsc);
    };

    render() {
        const { type, children } = this.props;

        const rootNode = this.getRootNode(type);
        const childNodes = this.getChildNodes(type, rootNode);
        
        return (
            <div>
               {childNodes.length &&
                    childNodes.map(node => (
                    <Link to={`/directory${node.path}`} key={node.id}>{node.name}</Link>
                   ))
               }
               {/* Render children in nested routes */}
               {children}
            </div>
        );
    }
}

// Included a sort method for now, but maybe can return sorted data in query?
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
        children: [ "/los-angeles", "/orange", "/san-bernadino", "/ventura", "/riverside",  "/kern"]
    },
    "/los-angeles": {
        id: 1,
        name: "Los Angeles",
        path: "/los-angeles",
        type: "county",
        children: [
            "/los-angeles/central-los-angeles",
            "/los-angeles/santa-monica-mountains",
            "/los-angeles/san-fernando-valley",
            "/los-angeles/san-gabriel-valley"
        ]
    },
    "/orange": {
        id: 2,
        name: "Orange",
        path: "/orange",
        type: "county"
    },
    "/san-bernadino": {
        id: 3,
        name: "San Bernadino",
        path: "/san-bernadino",
        type: "county"
    },
    "/ventura": {
        id: 4,
        name: "Ventura",
        path: "/ventura",
        type: "county"
    },
    "/riverside": {
        id: 5,
        name: "Riverside",
        path: "/riverside",
        type: "county"
    },
    "/kern": {
        id: 6,
        name: "Kern",
        path: "/kern",
        type: "county"
    },
    "/los-angeles/central-los-angeles": {
        id: 7,
        name: "Central Los Angeles",
        path: "/los-angeles/central-los-angeles",
        type: "region"
    },
    "/los-angeles/santa-monica-mountains": {
        id: 8,
        name: "Santa Monica Mountains",
        path: "/los-angeles/santa-monica-mountains",
        type: "region"
    },
    "/los-angeles/san-fernando-valley": {
        id: 9,
        name: "San Fernando Valley",
        path: "/los-angeles/san-fernando-valley",
        type: "region"
    },
    "/los-angeles/san-gabriel-valley": {
        id: 10,
        name: "San Gabriel Valley",
        path: "/los-angeles/san-gabriel-valley",
        type: "region",
        children: [
            "/los-angeles/san-gabriel-valley/pasadena",
            "/los-angeles/san-gabriel-valley/south-pasadena",
            "/los-angeles/san-gabriel-valley/san-marino",
            "/los-angeles/san-gabriel-valley/el-monte"
        ]
    },
    "/los-angeles/san-gabriel-valley/el-monte": {
        id: 11,
        name: "El Monte",
        path: "/los-angeles/san-gabriel-valley/el-monte",
        type: "neighborhood",
        children: [
            {
                id: 15,
                name: "Mitch's Mobiles",
                type: "SMB",
                industry: "Industry/Field",
                address: "Address",
                phone: "Phone",
                website: "Website"
            }
        ]
    },
    "/los-angeles/san-gabriel-valley/pasadena": {
        id: 12,
        name: "Pasadena",
        path: "/los-angeles/san-gabriel-valley/pasadena",
        type: "neighborhood"
    },
    "/los-angeles/san-gabriel-valley/south-pasadena": {
        id: 13,
        name: "South Pasadena",
        path: "/los-angeles/san-gabriel-valley/south-pasadena",
        type: "neighborhood"
    },
    "/los-angeles/san-gabriel-valley/san-marino": {
        id: 14,
        name: "San Marino",
        path: "/los-angeles/san-gabriel-valley/san-marino",
        type: "neighborhood"
    }
};

export default TreeView;