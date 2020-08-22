import React from "react";

import TreeNode from "../components/TreeNode";
import Accordion from "../components/Accordion";

class TreeView extends React.Component {
    // Return tree data matching path params
    getRootNode(type) {
        if (type === "root") return data["/"];
        if (type === "county") return data[`/${this.props.county}`];
        if (type === "region") return data[`/${this.props.county}/${this.props.region}`];
        if (type === "neighborhood") return data[`/${this.props.county}/${this.props.region}/${this.props.neighborhood}`];
    };

    getChildNodes(node) {
        if (!node.children) return [];
        return node.children.map(path => data[path]).sort(sortAsc);
    };

    render() {
        const { type } = this.props;

        const rootNode = this.getRootNode(type);
        const childNodes = this.getChildNodes(rootNode);

        const smbListings = childNodes.filter(node => node.type === "SMB");
        const npListings = childNodes.filter(node => node.type === "NP");
  
        if (type === "neighborhood") {
            return (
                <div className="flex flex-col">
    
                    <h2 className="font-straight font-black text-2xl text-center py-3 text-gray-900 border-b-4 border-gray-900">
                        {rootNode.name}, CA
                        <div className="-mr-2">
                            {smbListings.length} <div className={`listing-icon smb`}></div>
                            {npListings.length} <div className={`listing-icon np`}></div>
                        </div>
                    </h2>
        
                    <Accordion listings={smbListings} title="SMB" className="smb" />
                    <Accordion listings={npListings} title="Non-Profit" className="np" />
                </div>
                )
        }

        return (
            <div className="TreeView flex flex-col">
                {childNodes.length 
                    ? childNodes.map(node => {

                        const grandChildren = this.getChildNodes(node);

                        return (
                            <TreeNode
                                key={node.id}
                                url={`/directory${node.path}`}
                                type={type}
                                parent={type === "root" ? "/directory" : `/directory${rootNode.path}`}
                                childNodes={grandChildren}
                                {...node}
                            />
                        )
                    }) : ""
                }
            </div>
        );
    }
}

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
        children: [ "/los-angeles", "/orange", "/san-bernadino", "/ventura", "/riverside",  "/kern"]
    },
    "/los-angeles": {
        id: 1,
        name: "Los Angeles",
        path: "/los-angeles",
        type: "county",
        color: "#ede280",
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
        type: "county",
        color: "#f09657"
    },
    "/san-bernadino": {
        id: 3,
        name: "San Bernadino",
        path: "/san-bernadino",
        type: "county",
        color: "#a67db5"
    },
    "/ventura": {
        id: 4,
        name: "Ventura",
        path: "/ventura",
        type: "county",
        color: "#e25d61"
    },
    "/riverside": {
        id: 5,
        name: "Riverside",
        path: "/riverside",
        type: "county",
        color: "#74a8db"
    },
    "/kern": {
        id: 6,
        name: "Kern",
        path: "/kern",
        type: "county",
        color: "#8fc162"
    },
    "/los-angeles/central-los-angeles": {
        id: 7,
        name: "Central Los Angeles",
        path: "/los-angeles/central-los-angeles",
        type: "region",
        color: "#d1ecf1"
    },
    "/los-angeles/santa-monica-mountains": {
        id: 8,
        name: "Santa Monica Mountains",
        path: "/los-angeles/santa-monica-mountains",
        type: "region",
        color: "#e87859"
    },
    "/los-angeles/san-fernando-valley": {
        id: 9,
        name: "San Fernando Valley",
        path: "/los-angeles/san-fernando-valley",
        type: "region",
        color: "#e2555a"
    },
    "/los-angeles/san-gabriel-valley": {
        id: 10,
        name: "San Gabriel Valley",
        path: "/los-angeles/san-gabriel-valley",
        type: "region",
        color: "#a67db5",
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
        color: "#a67db5",
        children: [
            "/los-angeles/san-gabriel-valley/el-monte/mitchs-mobiles",
            "/los-angeles/san-gabriel-valley/el-monte/grade-a-tools"
        ]
    },
    "/los-angeles/san-gabriel-valley/el-monte/mitchs-mobiles": {
        id: 15,
        name: "Mitch's Mobiles",
        type: "SMB",
        industry: "Industry/Field",
        address: "Address",
        phone: "Phone",
        website: "Website"
    },
    "/los-angeles/san-gabriel-valley/el-monte/grade-a-tools": {
        id: 16,
        name: "GradeA Tools",
        type: "SMB",
        industry: "Industry/Field",
        address: "Address",
        phone: "Phone",
        website: "Website"
    },
    "/los-angeles/san-gabriel-valley/pasadena": {
        id: 12,
        name: "Pasadena",
        path: "/los-angeles/san-gabriel-valley/pasadena",
        type: "neighborhood",
        color: "#a67db5",
        children: [
            "/los-angeles/san-gabriel-valley/pasadena/mitchs-mobiles",
            "/los-angeles/san-gabriel-valley/pasadena/grade-a-tools"
        ]
    },
    "/los-angeles/san-gabriel-valley/pasadena/mitchs-mobiles": {
        id: 17,
        name: "Mitch's Mobiles",
        type: "NP",
        industry: "Industry/Field",
        address: "Address",
        phone: "Phone",
        website: "Website"
    },
    "/los-angeles/san-gabriel-valley/pasadena/grade-a-tools": {
        id: 18,
        name: "GradeA Tools",
        type: "NP",
        industry: "Industry/Field",
        address: "Address",
        phone: "Phone",
        website: "Website"
    },
    "/los-angeles/san-gabriel-valley/south-pasadena": {
        id: 13,
        name: "South Pasadena",
        path: "/los-angeles/san-gabriel-valley/south-pasadena",
        type: "neighborhood",
        color: "#a67db5"
    },
    "/los-angeles/san-gabriel-valley/san-marino": {
        id: 14,
        name: "San Marino",
        path: "/los-angeles/san-gabriel-valley/san-marino",
        type: "neighborhood",
        color: "#a67db5",
        children: [
            "/los-angeles/san-gabriel-valley/san-marino/mitchs-mobiles",
            "/los-angeles/san-gabriel-valley/san-marino/grade-a-tools"
        ]
    },
    "/los-angeles/san-gabriel-valley/san-marino/mitchs-mobiles": {
        id: 19,
        name: "Mitch's Mobiles",
        type: "SMB",
        industry: "Industry/Field",
        address: "Address",
        phone: "Phone",
        website: "Website"
    },
    "/los-angeles/san-gabriel-valley/san-marino/grade-a-tools": {
        id: 20,
        name: "GradeA Tools",
        type: "NP",
        industry: "Industry/Field",
        address: "Address",
        phone: "Phone",
        website: "Website"
    },
};

export default TreeView;