import React from 'react'

import Layout from '../../components/Layout'
import LibraryRoll from '../../components/LibraryRoll'

export default class LibraryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className='px-40  bg-orange-200'>
        <div className="">
          <h1 className="text-6xl text-gray-900">
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
