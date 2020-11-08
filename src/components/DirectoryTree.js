import React from "react";
import { Link } from "@reach/router";

import DirectoryTreeNode from "./DirectoryTreeNode";
import DirectoryListings from "./DirectoryListings";
import arrow from "../../static/img/arrow.svg";
import treeData from '../../static/DirectoryTreeData.json';

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
  
        return (
            <>
                {(type !== "root") && (
                    <Link 
                        to={this.getParentPath(type)}
                        className="md:hidden inline-block p-5 text-gray-800 font-straight font-medium transform rotate-180 absolute left-0 top-0"
                    >
                        <img src={arrow} className="w-2" />
                    </Link>
                )}
                <div className="DirectoryTree flex flex-col">
                    {type === "city"
                        ? <DirectoryListings 
                            state={location.state} 
                            city={this.props.city} 
                            title={rootNode.name} 
                        />
                        : childNodes.length 
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
            </>
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