import React from "react";
import { Router, Match } from "@reach/router";

import Layout from "../../components/Layout";
import TreeView from "../../components/TreeView";

export default class LibraryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="bg-white pb-8">
          <section className="max-w-6xl mx-auto px-6">
            <h1 className="lg:text-5xl text-4xl font-straight font-bold text-gray-900">
              Directory
            </h1>

            <div className="flex flex-row border-4 border-gray-900">

              {/* Define routes */}
              {
                [
                  {
                    title: "Select Metropolitan Area",
                    matchPath: `/directory/*`,
                    matchExact: `/directory`,
                    routes: ["/", "/:area", "/:area/:county", "/:area/:county/:region"],
                    type: "root"
                  },
                  {
                    title: "Select County",
                    matchPath: `/directory/:area/*`,
                    matchExact: `/directory/:area`,
                    routes: ["/:area", "/:area/:county", "/:area/:county/:region"],
                    type: "area"
                  },
                  {
                    title: "Select Region",
                    matchPath: `/directory/:area/:county/*`,
                    matchExact: `/directory/:area/:county`,
                    routes: ["/:area/:county", "/:area/:county/:region/*"],
                    type: "county"
                  },
                  {
                    title: null,
                    matchPath: `/directory/:area/:county/*`,
                    matchExact: `/directory/:area/:county/:region`,
                    routes: ["/:area/:county/:region"],
                    type: "region"
                  }
                ].map((column, index) => (
                  <Match key={index} path={column.matchExact}>
                    {props => (
                      <div className={`flex-1 border-gray-900 ${column.type !== "region" && "md:border-r-4"} ${!props.match && "hidden"} md:block`}>
                        {/* <Match path={column.matchPath}>
                          {props => (
                            column.title && 
                            
                          )}
                        </Match> */}

                        {column.title && 
                          <h2 className={`font-straight font-black text-2xl text-center py-3 ${props.match ? "text-gray-900": "text-gray-400"}`}>
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
          </section>
        </div>
      </Layout>
    );
  }
}
