import React from "react";
import { Link } from "@reach/router";

const TreeNode = (props) => {
    const { url, name, type } = props;

    return (
        <Link to={url}>{name}</Link>
    );
}

export default TreeNode;