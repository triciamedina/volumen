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
            <div className="">
              <Router basepath="/directory">
                <TreeView path="/" type="county">
                  <TreeView path=":county" type="region">
                    <TreeView path=":region" type="neighborhood">
                      <TreeView path=":neighborhood" ></TreeView>
                    </TreeView>
                  </TreeView>
                </TreeView>
              </Router>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}
