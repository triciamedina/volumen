import React from "react";
import { Link } from "@reach/router";

import DirectoryTreeNode from "./DirectoryTreeNode";
import DirectoryListings from "./DirectoryListings";
import arrow from "../../static/img/arrow.svg";
import DATA from '../../static/data/DATA';

export default class DirectoryTree extends React.Component {
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