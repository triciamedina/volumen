import React from "react";
import { Link } from "@reach/router";

class TreeView extends React.Component {
    render() {
        const { type, children } = this.props;

        // match parent node from URL?
        const rootNode = data.filter(node => node.type === type);

        // get children from parent and match to children objects from data
        const childNodes = data.filter(node => node.type === type);
    
        return (
            <div>
               {childNodes &&
                    childNodes.map(node => (
                    <Link to={`/directory${node.path}`} key={node.id}>{node.name}</Link>
                   ))
               }
               {children}
            </div>
        );
    }
}


const data = [
    {
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
    {
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
    {
        id: 8,
        name: "El Monte",
        path: "/los-angeles/san-gabriel-valley/el-monte",
        type: "neighborhood",
        children: [
            "/los-angeles/san-gabriel-valley/el-monte/smb/mitchs-mobiles",
            "/los-angeles/san-gabriel-valley/el-monte/grade-a-tools",
        ]
    },
    {
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
    {
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
    {
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
    {
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
    {
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
];

export default TreeView;