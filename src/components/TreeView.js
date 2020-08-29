import React from "react";

import TreeNode from "../components/TreeNode";
import Accordion from "../components/Accordion";

class TreeView extends React.Component {
    // Return tree data matching path params
    getRootNode(type) {
        if (type === "root") return data["/"];
        if (type === "area") return data[`/${this.props.area}`];
        if (type === "county") return data[`/${this.props.area}/${this.props.county}`];
        if (type === "region") return data[`/${this.props.area}/${this.props.county}/${this.props.region}`];
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
  
        if (type === "region") {
            return (
                <div className="flex flex-col">
    
                    <h2 className="font-straight font-black text-2xl text-center py-3 text-gray-900 border-b-4 border-gray-900">
                        {rootNode.name}, CA
                        <div className="-mr-2">
                            {smbListings.length} <div className={`listing-icon smb`}></div>
                            {npListings.length} <div className={`listing-icon np`}></div>
                        </div>
                    </h2>
        
                    {smbListings.length ? <Accordion listings={smbListings} title="SMB" className="smb" /> : ""}
                    {npListings.length ? <Accordion listings={npListings} title="Non-Profit" className="np" />: ""}
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
        children: [ "/san-francisco-bay-area", "/los-angeles-metro-area"]
    },
    "/san-francisco-bay-area": {
        id: 1,
        name: "San Francisco Bay Area",
        path: "/san-francisco-bay-area",
        type: "area",
        color: "#ede280"
    },
    "/los-angeles-metro-area": {
        id: 2,
        name: "Los Angeles Metro Area",
        path: "/los-angeles-metro-area",
        type: "area",
        color: "#ede280",
        children: [
            "/los-angeles-metro-area/los-angeles",
            "/los-angeles-metro-area/orange",
            "/los-angeles-metro-area/san-bernadino",
            "/los-angeles-metro-area/ventura",
            "/los-angeles-metro-area/riverside",
            "/los-angeles-metro-area/kern"
        ]
    },
    "/los-angeles-metro-area/los-angeles": {
        id: 3,
        name: "Los Angeles",
        path: "/los-angeles-metro-area/los-angeles",
        type: "county",
        color: "#ede280",
        children: [
            "/los-angeles-metro-area/los-angeles/central-los-angeles",
            "/los-angeles-metro-area/los-angeles/santa-monica-mountains",
            "/los-angeles-metro-area/los-angeles/san-fernando-valley",
            "/los-angeles-metro-area/los-angeles/san-gabriel-valley"
        ]
    },
    "/los-angeles-metro-area/orange": {
        id: 4,
        name: "Orange",
        path: "/los-angeles-metro-area/orange",
        type: "county",
        color: "#f09657"
    },
    "/los-angeles-metro-area/san-bernadino": {
        id: 5,
        name: "San Bernadino",
        path: "/los-angeles-metro-area/san-bernadino",
        type: "county",
        color: "#a67db5"
    },
    "/los-angeles-metro-area/ventura": {
        id: 6,
        name: "Ventura",
        path: "/los-angeles-metro-area/ventura",
        type: "county",
        color: "#e25d61"
    },
    "/los-angeles-metro-area/riverside": {
        id: 7,
        name: "Riverside",
        path: "/los-angeles-metro-area/riverside",
        type: "county",
        color: "#74a8db"
    },
    "/los-angeles-metro-area/kern": {
        id: 8,
        name: "Kern",
        path: "/kern",
        type: "county",
        color: "#8fc162"
    },
    "/los-angeles-metro-area/los-angeles/central-los-angeles": {
        id: 9,
        name: "Central Los Angeles",
        path: "/los-angeles-metro-area/los-angeles/central-los-angeles",
        type: "region",
        color: "#d1ecf1"
    },
    "/los-angeles-metro-area/los-angeles/santa-monica-mountains": {
        id: 10,
        name: "Santa Monica Mountains",
        path: "/los-angeles-metro-area/los-angeles/santa-monica-mountains",
        type: "region",
        color: "#e87859"
    },
    "/los-angeles-metro-area/los-angeles/san-fernando-valley": {
        id: 11,
        name: "San Fernando Valley",
        path: "/los-angeles-metro-area/los-angeles/san-fernando-valley",
        type: "region",
        color: "#e2555a"
    },
    "/los-angeles-metro-area/los-angeles/san-gabriel-valley": {
        id: 12,
        name: "San Gabriel Valley",
        path: "/los-angeles-metro-area/los-angeles/san-gabriel-valley",
        type: "region",
        color: "#a67db5",
        children: [
            "/los-angeles-metro-area/los-angeles/san-gabriel-valley/mitchs-mobiles",
            "/los-angeles-metro-area/los-angeles/san-gabriel-valley/grade-a-tools"
        ]
    },
    "/los-angeles-metro-area/los-angeles/san-gabriel-valley/mitchs-mobiles": {
        id: 13,
        name: "Mitch's Mobiles",
        type: "SMB",
        industry: "Industry/Field",
        address: "Address",
        phone: "Phone",
        website: "Website"
    },
    "/los-angeles-metro-area/los-angeles/san-gabriel-valley/grade-a-tools": {
        id: 14,
        name: "GradeA Tools",
        type: "SMB",
        industry: "Industry/Field",
        address: "Address",
        phone: "Phone",
        website: "Website"
    },
};

export default TreeView;