import React from "react";
import { Link } from "@reach/router";

class TreeView extends React.Component {
    // Return tree data matching URL params
    getRootNode(path) {
        return data[path];
    };

    // Return tree data matching children from parent node
    getChildNodes(node) {
        return node.children.map(path => data[path]).sort(sortAsc);
    };

    render() {
        const { type, children } = this.props;

        const rootPath = type === "root" ? "/" : `/${this.props[type]}`;

        const rootNode = this.getRootNode(rootPath);
        const childNodes = this.getChildNodes(rootNode);
    
        return (
            <div>
               {childNodes &&
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
    "/los-angeles/san-gabriel-valley": {
        id: 7,
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
    "/los-angeles/central-los-angeles": {
        id: 9,
        name: "Central Los Angeles",
        path: "/los-angeles/central-los-angeles",
        type: "region",
        children: [
            "/los-angeles/central-los-angeles/pasadena",
            "/los-angeles/central-los-angeles/south-pasadena",
            "/los-angeles/central-los-angeles/san-marino",
            "/los-angeles/central-los-angeles/el-monte"
        ]
    },
    "/los-angeles/santa-monica-mountains": {
        id: 10,
        name: "Santa Monica Mountains",
        path: "/los-angeles/santa-monica-mountains",
        type: "region",
        children: [
            "/los-angeles/santa-monica-mountains/pasadena",
            "/los-angeles/santa-monica-mountains/south-pasadena",
            "/los-angeles/santa-monica-mountains/san-marino",
            "/los-angeles/santa-monica-mountains/el-monte"
        ]
    },
    "/los-angeles/san-fernando-valley": {
        id: 11,
        name: "San Fernando Valley",
        path: "/los-angeles/san-fernando-valley",
        type: "region",
        children: [
            "/los-angeles/san-fernando-valley/pasadena",
            "/los-angeles/san-fernando-valley/south-pasadena",
            "/los-angeles/san-fernando-valley/san-marino",
            "/los-angeles/san-fernando-valley/el-monte"
        ]
    },
    "/los-angeles/san-gabriel-valley/el-monte": {
        id: 8,
        name: "El Monte",
        path: "/los-angeles/san-gabriel-valley/el-monte",
        type: "neighborhood",
        children: [
            "/los-angeles/san-gabriel-valley/el-monte/smb/mitchs-mobiles",
            "/los-angeles/san-gabriel-valley/el-monte/grade-a-tools",
        ]
    },
    "/orange": {
        id: 2,
        name: "Orange",
        path: "/orange",
        type: "county",
        children: [
          "/orange/region1",
          "/orange/region2",
          "/orange/region3"
        ]
    },
    "/san-bernadino": {
        id: 3,
        name: "San Bernadino",
        path: "/san-bernadino",
        type: "county",
        children: [
          "/san-bernadino/region1",
          "/san-bernadino/region2",
          "/san-bernadino/region3"
        ]
    },
    "/ventura": {
        id: 4,
        name: "Ventura",
        path: "/ventura",
        type: "county",
        children: [
          "/ventura/region1",
          "/ventura/region2",
          "/ventura/region3"
        ]
    },
    "/riverside": {
        id: 5,
        name: "Riverside",
        path: "/riverside",
        type: "county",
        children: [
          "/riverside/region1",
          "/riverside/region2",
          "/riverside/region3"
        ]
    },
    "/kern": {
        id: 6,
        name: "Kern",
        path: "/kern",
        type: "county",
        children: [
          "/kern/region1",
          "/kern/region2",
          "/kern/region3"
        ]
    }
};

export default TreeView;