import React from "react";

import Layout from "../../components/Layout";

export default class LibraryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="bg-white pb-8">
          <section className="max-w-6xl mx-auto px-6">
            <h1 className="lg:text-5xl text-4xl font-straight font-bold text-gray-900">
              Directory
            </h1>
          </section>
        </div>
      </Layout>
    );
  }
}
