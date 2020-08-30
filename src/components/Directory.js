import React from "react";
import { Router, Match } from "@reach/router";

import DirectoryTree from "./DirectoryTree";

const Directory = () => {
    return (
        <div className="Directory flex flex-row border-4 border-gray-900 bg-white">
            {
                [
                    {
                    title: "Select Metropolitan Area",
                    matchExact: `/directory`,
                    routes: ["/", "/browse/:area", "/browse/:area/:county", "/browse/:area/:county/:region"],
                    type: "root"
                    },
                    {
                    title: "Select County",
                    matchExact: `/directory/browse/:area`,
                    routes: ["/browse/:area", "/browse/:area/:county", "/browse/:area/:county/:region"],
                    type: "area"
                    },
                    {
                    title: "Select Region",
                    matchExact: `/directory/browse/:area/:county`,
                    routes: ["/browse/:area/:county", "/browse/:area/:county/:region/*"],
                    type: "county"
                    },
                    {
                    title: null,
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
                                    {column.routes.map((route, index) => <DirectoryTree key={index} path={route} type={column.type} />)}
                                </Router>
                            </div>
                        )}
                    </Match>
                ))
            }
        </div>
    )
}

export default Directory;