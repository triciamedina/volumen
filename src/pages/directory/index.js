import React from "react";
import { Router } from "@reach/router";

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
            <div className="flex flex-row">
              <div className="flex-1">
                <h2 className="font-bold">
                  Select County
                </h2>
                <Router basepath="/directory">
                  <TreeView path="/" type="root" />
                  <TreeView path="/:county" type="root" />
                  <TreeView path="/:county/:region" type="root" />
                  <TreeView path="/:county/:region/:neighborhood" type="root" />
                </Router>
              </div>
              <div className="flex-1">
                <h2 className={"font-bold"}>
                  Select Region
                </h2>
                <Router basepath="/directory">
                  <TreeView path="/:county" type="county" />
                  <TreeView path="/:county/:region" type="county" />
                  <TreeView path="/:county/:region/:neighborhood" type="county" />
                </Router>
              </div>
              <div className="flex-1">
                <h2 className="font-bold">
                  Select Neighborhood
                </h2>
                <Router basepath="/directory">
                  <TreeView path="/:county/:region" type="region" />
                  <TreeView path="/:county/:region/:neighborhood" type="region" />
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
