import React from 'react'

import Layout from '../../components/Layout'
import LibraryRoll from '../../components/LibraryRoll'

export default class LibraryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className='lg:px-40 px-12 pb-16 bg-orange-100'>
        <div className="">
          <h1 className="lg:text-6xl text-4xl josefin heaviest text-gray-900">
            Latest Articles
          </h1>
        </div>
        <section className="">
          <div className="">
            <div className="">
              <LibraryRoll />
            </div>
          </div>
        </section>
        </div>
       
      </Layout>
    )
  }
}
