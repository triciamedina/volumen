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
            <div className="flex flex-row border-4 border-black">
              <div className="flex-1 border-r-4 border-black">
                <Match path={`/directory/*`}>
                  {props => (
                      <h2 className={`font-straight font-black text-2xl text-center py-3 ${props.match ? "text-gray-900": "text-gray-400"}`}>Select County</h2>
                    )}
                </Match>
                <Router basepath="/directory">
                  {["/", "/:county", "/:county/:region", "/:county/:region/:neighborhood"]
                    .map((route, index) => <TreeView key={index} path={route} type="root" />)
                  }
                </Router>
              </div>
              <div className="flex-1 border-r-4 border-black">
                <Match path={`/directory/:county/*`}>
                  {props => (
                    <h2 className={`font-straight font-black text-2xl text-center py-3 ${props.match ? "text-gray-900": "text-gray-400"}`}>Select Region</h2>
                  )}
                </Match>
                <Router basepath="/directory">
                  {["/:county", "/:county/:region", "/:county/:region/:neighborhood"]
                    .map((route, index) => <TreeView key={index} path={route} type="county" />)
                  }
                </Router>
              </div>
              <div className="flex-1 border-r-4 border-black">
                <Match path={`/directory/:county/:region/*`}>
                  {props => (
                    <h2 className={`font-straight font-black text-2xl text-center py-3 ${props.match ? "text-gray-900": "text-gray-400"}`}>Select Neighborhood</h2>
                  )}
                </Match>
                <Router basepath="/directory">
                  {["/:county/:region", "/:county/:region/:neighborhood/*"]
                    .map((route, index) => <TreeView key={index} path={route} type="region" />)
                  }
                </Router>
              </div>
              <div className="flex-1">
                <Router basepath="/directory">
                  <TreeView path="/:county/:region/:neighborhood" type="neighborhood" />
                </Router>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}
