import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { Router, Match } from "@reach/router";

import DirectoryContext, { DirectoryContextProvider } from "../context/DirectoryContext";
import DirectoryTree from "./DirectoryTree";

const sortAsc = (a, b) => {
    const nameA = a.toLowerCase(); 
    const nameB = b.toLowerCase(); 
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

const Directory = (props) => {
    const { data } = props;
    const { industries, tags } = data;
    const industryList = industries.group.map(item => item.fieldValue).sort(sortAsc);
    const tagList = tags.group.map(item => item.fieldValue).filter(tag => tag !== "None" ).sort(sortAsc);

    return (
        <DirectoryContext.Consumer>
            { (context) => (
                <> 
                    <div className="flex flex-col md:flex-row justify-end my-6 md:mt-0">
                        <select 
                            className="w-full md:w-1/4 text-center border-4 border-gray-900 py-1 px-4 rounded" 
                            name="industry" 
                            id="industry-select"
                            onChange={(e) => context.onIndustryChange(e.currentTarget.value)}
                            value={context.industry || ""}
                        >
                            <option value="">Select Industry</option>
                            {industryList.map((industry, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={industry}
                                    >
                                            {industry}
                                    </option>
                                )
                            })}
                        </select>
                        <select 
                            className="w-full md:w-1/4 text-center border-4 border-gray-900 py-1 px-4 rounded" 
                            name="tag" 
                            id="tag-select"
                            onChange={(e) => context.onTagChange(e.currentTarget.value)}
                            value={context.tag || ""}
                        >
                            <option value="">Select Tag</option>
                            {tagList.map((tag, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={tag}
                                    >
                                        {tag}
                                    </option>
                                )
                            })}
                        </select>
                        <a href="https://www.google.com" className="text-xl font-straight bg-green-600 hover:bg-green-900 text-white font-bold py-1 px-4 rounded w-full md:w-1/4 text-center">
                            Add a Listing
                        </a>
                    </div>
                    <div className="Directory flex flex-row border-4 border-gray-900 bg-white">
                        {
                            [
                                {
                                    title: "Select Region",
                                    matchExact: `/directory`,
                                    routes: ["/", "/browse/:region", "/browse/:region/:county", "/browse/:region/:county/:city"],
                                    type: "root"
                                },
                                {
                                    title: "Select County",
                                    matchExact: `/directory/browse/:region`,
                                    routes: ["/browse/:region", "/browse/:region/:county", "/browse/:region/:county/:city"],
                                    type: "region"
                                },
                                {
                                    title: "Select City",
                                    matchExact: `/directory/browse/:region/:county`,
                                    routes: ["/browse/:region/:county", "/browse/:region/:county/:city/*"],
                                    type: "county"
                                },
                                {
                                    title: null,
                                    matchExact: `/directory/browse/:region/:county/:city`,
                                    routes: ["/browse/:region/:county/:city"],
                                    type: "city"
                                }
                            ].map((column, index) => (
                                <Match key={index} path={column.matchExact}>
                                    {props => (
                                        <div className={`column flex-1 border-gray-900 ${column.type !== "city" && "md:border-r-4"} ${!props.match && "hidden"} md:block relative`}>
                                            {column.title && 
                                                <h2 className={`Directory__column-title font-straight font-black text-xl text-center py-3 ${props.match ? "text-gray-900": "text-gray-400"}`}>
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
                </>
            )}
        </DirectoryContext.Consumer>
    )
};

export default (props) => {
    return (<StaticQuery
        query={graphql`
            query DirectoryQuery {
                tags: allMarkdownRemark {
                    group(field: frontmatter___tag) {
                        fieldValue
                    }
                }
                industries: allMarkdownRemark {
                    group(field: frontmatter___industry) {
                        fieldValue
                    }
                }
            }
        `}
        render={(data, count) => (
            <DirectoryContextProvider>
                <Directory data={data} count={count} {...props} />
            </DirectoryContextProvider>
        )}
    />)
};