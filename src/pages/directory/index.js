import React from "react";
import { Router } from "@reach/router";

import Layout from "../../components/Layout";
import Directory from "../../components/Directory";
import ListingPage from "../../templates/listing-page";

export default class LibraryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="bg-white pb-8">
          <section className="max-w-6xl mx-auto px-6">
            <h1 className="lg:text-5xl text-4xl font-straight font-bold text-gray-900">
              Directory
            </h1>
            <Router basepath="/directory">
              {["/", "/browse/*"].map((path, index) => <Directory path={path} key={index}/>)}
            </Router>
          </section>
        </div>
      </Layout>
    );
  }
}