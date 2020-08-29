import React from "react";
import { Router, Match } from "@reach/router";

import TreeView from "../components/TreeView";

const Browse = () => {
    return (
        <div className="Browse flex flex-row border-4 border-gray-900">

        {/* Define routes */}
            {
                [
                    {
                    title: "Select Metropolitan Area",
                    matchPath: `/directory/*`,
                    matchExact: `/directory`,
                    routes: ["/", "/browse/:area", "/browse/:area/:county", "/browse/:area/:county/:region"],
                    type: "root"
                    },
                    {
                    title: "Select County",
                    matchPath: `/directory/browse/:area/*`,
                    matchExact: `/directory/browse/:area`,
                    routes: ["/browse/:area", "/browse/:area/:county", "/browse/:area/:county/:region"],
                    type: "area"
                    },
                    {
                    title: "Select Region",
                    matchPath: `/directory/browse/:area/:county/*`,
                    matchExact: `/directory/browse/:area/:county`,
                    routes: ["/browse/:area/:county", "/browse/:area/:county/:region/*"],
                    type: "county"
                    },
                    {
                    title: null,
                    matchPath: `/directory/browse/:area/:county/*`,
                    matchExact: `/directory/browse/:area/:county/:region`,
                    routes: ["/browse/:area/:county/:region"],
                    type: "region"
                    }
                ].map((column, index) => (
                    <Match key={index} path={column.matchExact}>
                        {props => (
                            <div className={`column flex-1 border-gray-900 ${column.type !== "region" && "md:border-r-4"} ${!props.match && "hidden"} md:block`}>
                            {column.title && 
                                <h2 className={`font-straight font-black text-xl text-center py-3 ${props.match ? "text-gray-900": "text-gray-400"}`}>
                                    {column.title}
                                </h2>
                            }
                            <Router basepath="/directory">
                                {column.routes.map((route, index) => <TreeView key={index} path={route} type={column.type} />)}
                            </Router>
                            </div>
                        )}
                    </Match>
                ))
            }
        </div>
    )
}

export default Browse;