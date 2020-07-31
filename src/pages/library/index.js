import React from "react";

import Layout from "../../components/Layout";
import LibraryRoll from "../../components/LibraryRoll";

export default class LibraryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="bg-orange-100 pb-8">
          <section className="max-w-6xl mx-auto px-6">
            <h1 className="lg:text-5xl text-4xl montserrat font-bold text-gray-900">
              Latest Articles
            </h1>
            <div className="">
              <LibraryRoll />
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}
