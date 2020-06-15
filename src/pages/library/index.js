import React from 'react'

import Layout from '../../components/Layout'
import LibraryRoll from '../../components/LibraryRoll'

export default class LibraryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className='px-40 pb-16 bg-orange-100'>
        <div className="">
          <h1 className="text-6xl josefin heaviest text-gray-900">
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
